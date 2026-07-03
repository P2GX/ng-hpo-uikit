import { Component, OnInit, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { FenominalSentence, FenominalHit } from '../models/fenominal-models';
import { OntologyMatch } from '../models/ontology-dto';
import { NotificationService } from '../services/notification.service';
import { OntologyAutocompleteComponent } from '../ontology-autocomplete/ontology-autocomplete.component';
import { HpoPolisherRowComponent } from '../hpo-annotation-polisher-row/hpo-annotation-polisher.component';
import { HierarchyMapItem, PolishedHpoAnnotation } from '../hpo-annotation-polisher-row/hpo-annotation-polisher.interface';
import { Observable } from 'rxjs';

export interface ParentChildDto {
  parents: FenominalHit[];
  children: FenominalHit[];
}

@Component({
  selector: 'hpo-polishing-workspace',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIcon, 
    OntologyAutocompleteComponent,
    HpoPolisherRowComponent],
  templateUrl: './hpo-polishing-workspace.component.html',
  styleUrls: ['./hpo-polishing-workspace.component.scss']
})
export class HpoPolishingWorkspaceComponent implements OnInit {
  private notificationService = inject(NotificationService);
  
  sentences = input<FenominalSentence[]>([]);
  availableOnsets = input<string[]>([]);
  availableModifiers = input<string[]>([]);

  hierarchyUpdate = input<HierarchyMapItem | null>(null);
  protected hierarchyCache = signal<Record<string, HierarchyMapItem>>({});
  
  requestHierarchy = output<PolishedHpoAnnotation>();
  createOnsetRequested = output<PolishedHpoAnnotation>();
  complete = output<FenominalSentence[]>();
  cancel = output<void>();

  protected localSentences = signal<FenominalSentence[]>([]);

  // Autocomplete variables
  protected hpoInputString = '';
  protected selectedHpoMatch = signal<OntologyMatch | null>(null);
  searchProvider = input.required<(query: string) => Observable<OntologyMatch[]>>();

 // Computed state to extract unique table annotations dynamically from sentence arrays
  protected uniqueTableAnnotations = computed(() => {
      const uniqueMap = new Map<string, PolishedHpoAnnotation>();
      
      for (const sentence of this.localSentences()) {
        for (const segment of sentence.segments) {
          if (segment.kind === 'hit') {
            const hit = segment.hit;
            // Intersection type lets TS know this runtime object might carry UI modifiers
            const uiHit = hit as FenominalHit & { clinical_modifiers?: { onset?: string; modifiers?: string[] } };
            
            if (!uniqueMap.has(uiHit.term_id)) {
              uniqueMap.set(uiHit.term_id, {
                termId: uiHit.term_id,
                label: uiHit.label,
                isObserved: uiHit.is_observed ?? true,
                onsetString: uiHit.clinical_modifiers?.onset,
                modifiers: uiHit.clinical_modifiers?.modifiers || []
              });
            }
          }
        }
      }
      return Array.from(uniqueMap.values());
    });

    /** Emits when a badge is moved, passing the target element context and 
     * the text window string to analyze */
  badgeMoved = output<{
    originalTermId: string;
    newTextWindow: string;
    newSpan: { start: number; end: number };
  }>();

  protected handleBadgeMoved(
    originalTermId: string, 
    textSnippet: string, 
    newSpan: { start: number; end: number }): void {
    // 1. strip the old HPO classification out of local state
    this.localSentences.update(sentences =>
      sentences.map(s => ({
        ...s,
        segments: s.segments.map(seg => {
          if (seg.kind === 'hit' && seg.hit.term_id === originalTermId) {
            // Convert it to a temporary placeholder asset or plain text while waiting
            return {
              kind: 'text',
              text: textSnippet,
              span: newSpan
            };
          }
          return seg;
        })
      }))
    );

    // 2. Notify shell to dispatch the backend extraction call
    this.badgeMoved.emit({
      originalTermId,
      newTextWindow: textSnippet,
      newSpan
    });
  }

  constructor() {
    // Intercept active async hierarchy updates dynamically using an active Reactive Effect context
    effect(() => {
      const update = this.hierarchyUpdate();
      if (update) {
        this.hierarchyCache.update(cache => ({ 
          ...cache, 
          [update.currentTermId]: update 
        }));
      }
    });
  }

  ngOnInit(): void {
    // Protect parent state context references via complete structural detachment
    this.localSentences.set(JSON.parse(JSON.stringify(this.sentences())));
  }

  /** This is called when the user moves a badge, which deletes the origal */
  protected handleBadgeUpdated(updatedRow: PolishedHpoAnnotation, originalTermId: string): void {
    this.localSentences.update(sentences =>
      sentences.map(s => ({
        ...s,
        segments: s.segments.map(seg => {
          if (seg.kind === 'hit' && seg.hit.term_id === originalTermId) {
            return {
              ...seg,
              text: updatedRow.label,
              hit: {
                term_id: updatedRow.termId,
                label: updatedRow.label,
                is_observed: true, 
                span: { ...seg.hit.span }, 
                clinical_modifiers: {
                  onset: undefined, 
                  modifiers: []     
                }
              } as any 
            };
          }
          return seg;
        })
      }))
    );
  }

  protected deleteAnnotationEverywhere(termId: string): void {
    this.localSentences.update(sentences =>
      sentences.map(s => ({
        ...s,
        segments: s.segments.filter(seg => seg.kind !== 'hit' || seg.hit.term_id !== termId)
      }))
    );
  }

  protected handleHierarchyRequest(annotation: PolishedHpoAnnotation): void {
    if (!this.hierarchyCache()[annotation.termId]) {
      this.requestHierarchy.emit(annotation);
    }
  }

  protected handleAutocompleteSelection(match: OntologyMatch): void {
    this.selectedHpoMatch.set(match);
  }

  /**
   * Transforms the currently selected autocomplete search result into a structured clinical hit 
   * and appends it to the workspace state loop.
   * 
   * This method maps an {@link OntologyMatch} into an augmented {@link FenominalHit} payload. 
   * Rather than updating the layout table directly, it introduces a synthetic sentence envelope into 
   * the underlying `localSentences` tracking signal. Because the data table updates reactively via 
   * the `uniqueTableAnnotations` computed signal, the newly injected concept instantly computes into 
   * a fresh table row ready for modifier curation.
   * 
   * Workflow side-effects:
   * - Appends a mock sentence tracking chunk into the `localSentences` signal.
   * - Instantiates default uncurated properties (`is_observed: true`, empty modifiers) for the entry.
   * - Resets the internal `selectedHpoMatch` state signal to `null`.
   * - Empties the `hpoInputString` bounding model to prepare the autocomplete search input field for subsequent queries.
   * 
   * @protected
   * @returns {void}
   */
  protected injectManualHpoToken(): void {
    const match = this.selectedHpoMatch();
    if (!match) return;

    // Build the hit structure matching how handleBadgeUpdated handles UI additions
    const newHit = {
      term_id: match.id,
      label: match.label,
      is_observed: true,
      span: { start: 0, end: match.label.length },
      clinical_modifiers: {
        onset: undefined,
        modifiers: []
      }
    } as any; // Cast safely past your backend contract wrapper

    // Append a synthetic sentence block to display the new manual inject token
    this.localSentences.update(list => [
      ...list,
      {
        start: Date.now(),
        original_text: match.label,
        segments: [{ kind: 'hit', text: match.label, hit: newHit }]
      }
    ]);

    // Reset autocomplete inputs
    this.selectedHpoMatch.set(null);
    this.hpoInputString = '';
  }

  protected saveAndFinish(): void {
    this.complete.emit(this.localSentences());
  }
}