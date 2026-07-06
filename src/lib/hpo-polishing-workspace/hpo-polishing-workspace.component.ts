import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { 
  FenominalSentence, 
  FenominalHit, 
  UiFenominalSentence,
  UiFenominalHit, 
  ui_from_fenominal } from '../models/fenominal-models';
import { OntologyMatch } from '../models/ontology-dto';
import { NotificationService } from '../services/notification.service';
import { OntologyAutocompleteComponent } from '../ontology-autocomplete/ontology-autocomplete.component';
import { HpoPolishRowComponent } from '../hpo-annotation-polish-row/hpo-annotation-polish-row.component';
import { HierarchyMapItem, HitSpanPatch, HpoTermMinimal, OntologyAutocompleteProvider, PolishedHpoAnnotation } from '../models/hpo-annotation-models';
import { Observable } from 'rxjs';
import { TextMiningContainerComponent } from "../text-mining-container/text-mining-container.component";



@Component({
  selector: 'hpo-polishing-workspace',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    OntologyAutocompleteComponent,
    HpoPolishRowComponent,
    TextMiningContainerComponent
],
  templateUrl: './hpo-polishing-workspace.component.html',
  styleUrls: ['./hpo-polishing-workspace.component.scss']
})
export class HpoPolishingWorkspaceComponent {
  private notificationService = inject(NotificationService);
  
  sentences = input<FenominalSentence[]>([]);
  availableModifiers = input<HpoTermMinimal[]>([]);
  hierarchyProvider = input.required<(termId: string) => Promise<HierarchyMapItem>>();
  autocompleteProvider = input.required<OntologyAutocompleteProvider>();
  

  complete = output<PolishedHpoAnnotation[]>();
  cancel = output<void>();
  badgeMoved = output<{
    originalTermId: string;
    newTextWindow: string;
    newSpan: { start: number; end: number };
  }>();


  protected hierarchyCache = signal<Record<string, HierarchyMapItem>>({});
  protected localSentences = signal<UiFenominalSentence[]>([]);

  // Autocomplete variables
  protected hpoInputString = '';
  protected selectedHpoMatch = signal<OntologyMatch | null>(null);
 
  


 // Computed state to extract unique table annotations dynamically from sentence arrays
 // TODO check if there are conflicting UiHits, e.g., observed/excluded
  protected uniqueTableAnnotations = computed(() => {
    const uniqueMap = new Map<string, PolishedHpoAnnotation>();
    for (const sentence of this.localSentences()) {
      for (const segment of sentence.segments) {
        if (segment.kind === 'hit') {
          const uiHit = segment.hit;
          if (!uniqueMap.has(uiHit.termId)) {
            uniqueMap.set(uiHit.termId, {
              termId: uiHit.termId,
              label: uiHit.label,
              excluded: uiHit.excluded,
              onsetString: uiHit.onset,
              modifiers: uiHit.modifiers || []
            });
          }
        }
      }
    }
    return Array.from(uniqueMap.values());
  });
  private hasInitialized = false;
  constructor() {
    effect(() => {
       // convert from FenominalSentence to UiFenominalSentence
      const rawSentences = this.sentences();
      if (rawSentences && rawSentences.length > 0 && !this.hasInitialized) {
      const uiSentences: UiFenominalSentence[] = rawSentences.map((s, sIdx) => ({
        start: s.start,
        originalText: s.originalText,
        segments: s.segments.map((seg, segIdx) => {
          if (seg.kind === 'hit') {
            const trackingId = `hit-${sIdx}-${segIdx}-${seg.hit.termId}`;
            return {
              kind: 'hit',
              text: seg.text,
              hit: ui_from_fenominal(seg.hit, trackingId)
            };
          }
          return seg;
        })
      }));
      console.log("In effect for raw Setence, ui=", uiSentences);
      this.localSentences.set(uiSentences);
      this.hasInitialized = true;// Prevents subsequent internal mutations from being overwritten
    }
    });
  }



  protected handleBadgeMoved(
    originalTermId: string, 
    textSnippet: string, 
    newSpan: { start: number; end: number }): void {
    // 1. strip the old HPO classification out of local state
    this.localSentences.update(sentences =>
      sentences.map(s => ({
        ...s,
        segments: s.segments.map(seg => {
          if (seg.kind === 'hit' && seg.hit.termId === originalTermId) {
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


  /** This is called when the user moves a badge, which deletes the origal */
  protected handleBadgeUpdated(updatedRow: PolishedHpoAnnotation, originalTermId: string): void {
    this.localSentences.update(sentences =>
      sentences.map(s => ({
        ...s,
        segments: s.segments.map(seg => {
          if (seg.kind === 'hit' && seg.hit.termId === originalTermId) {
            const updatedHit: UiFenominalHit = {
              ...seg.hit,
              termId: updatedRow.termId,
              label: updatedRow.label,
              excluded: updatedRow.excluded,
              onset: updatedRow.onsetString,
              modifiers: updatedRow.modifiers || []
            };
            return {
              ...seg,
              text: updatedRow.label,
              hit: updatedHit
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
        segments: s.segments.filter(seg => seg.kind !== 'hit' || seg.hit.termId !== termId)
      }))
    );
  }

  protected handleHierarchyRequest(annotation: PolishedHpoAnnotation): void {
    const termId = annotation.termId;
    if (!this.hierarchyCache()[termId]) {
      const provider = this.hierarchyProvider();
      if (provider) {
        provider(termId).then(data => {
          this.hierarchyCache.update(cache => ({
            ...cache,
            [termId]: data
          }));
        });
      }
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
    const newUiHit: UiFenominalHit = {
      id: `manual-${Date.now()}-${match.id}`,
      termId: match.id,
      label: match.label,
      excluded: false,
      span: { start: 0, end: match.label.length },
      modifiers:  []
    };
  

    // Append a synthetic sentence block to display the new manual inject token
    this.localSentences.update(list => [
      ...list,
      {
        start: Date.now(),
        originalText: match.label,
        segments: [{ kind: 'hit', text: match.label, hit: newUiHit }]
      }
    ]);

    // Reset autocomplete inputs
    this.selectedHpoMatch.set(null);
    this.hpoInputString = '';
  }

  protected handleTextMiningUpdate(patch: HitSpanPatch): void {
    this.localSentences.update(sentences =>
      sentences.map(s => {
        if (s.start !== patch.sentenceStart) return s;
        return {
          ...s,
          segments: s.segments.map((seg, i) => {
            if (i !== patch.segmentIndex || seg.kind !== 'hit') return seg;
            return { ...seg, hit: { ...seg.hit, span: patch.span } };
          })
        };
      })
    );
  }

  protected saveAndFinish(): void {
    this.complete.emit(this.uniqueTableAnnotations());
  }
}