import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { 
  FenominalSentence, 
  FenominalHit, 
  UiFenominalSentence,
  UiFenominalHit, 
  ui_from_fenominal, 
  FenominalSegment} from '../models/fenominal-models';
import { OntologyMatch } from '../models/ontology-dto';
import { NotificationService } from '../services/notification.service';
import { OntologyAutocompleteComponent } from '../ontology-autocomplete/ontology-autocomplete.component';
import { HpoPolishRowComponent } from '../hpo-annotation-polish-row/hpo-annotation-polish-row.component';
import { DeleteHitRequest, HierarchyMapItem, HitSpanPatch, HpoTermMinimal, OntologyAutocompleteProvider, PolishedHpoAnnotation } from '../models/hpo-annotation-models';
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
  // relay change signal to data owner outside of the library
  readonly segmentsReplaced = output<{ sentence: FenominalSentence; segmentIndex: number; newSegments: FenominalSegment[] }>();

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
      console.log('[HpoPolishingWorkspaceComponent] sentences() changed:', this.sentences());
    });
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
      this.localSentences.set(uiSentences);
      this.hasInitialized = true;// Prevents subsequent internal mutations from being overwritten
    }
    });
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
  

    // Append a synthetic sentence block to display the new manual add token
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

  protected deleteHit(request: DeleteHitRequest): void {
  this.localSentences.update(sentences =>
    sentences.map(sentence => {
      if (sentence.start !== request.sentenceStart) {
        return sentence;
      }

      return {
        ...sentence,
        segments: sentence.segments.map(segment => {
          if (
            segment.kind === 'hit' &&
            segment.hit.span.start === request.hit.span.start &&
            segment.hit.span.end === request.hit.span.end
          ) {
            return {
              kind: 'text' as const,
              text: segment.text,
              span: { ...segment.hit.span }
            };
          }

          return segment;
        })
      };
    })
  );
}

/* This is called as a result of manual editing of a text segment that did not get a correct HPO */
onSegmentsReplaced(event: {
  sentence: FenominalSentence;
  segmentIndex: number;
  newSegments: FenominalSegment[];
}): void {
  // Update local display state directly — the one-shot init effect above
  // won't pick this up since `hasInitialized` is already true by this point.
  this.localSentences.update(sentences =>
    sentences.map(s => {
      if (s.start !== event.sentence.start) return s;

      const uiNewSegments = event.newSegments.map((seg, i) => {
        if (seg.kind === 'text') return seg;
        const trackingId = `hit-${s.start}-${event.segmentIndex}-${i}-${seg.hit.termId}`;
        return { kind: 'hit' as const, text: seg.text, hit: ui_from_fenominal(seg.hit, trackingId) };
      });

      return {
        ...s,
        segments: [
          ...s.segments.slice(0, event.segmentIndex),
          ...uiNewSegments,
          ...s.segments.slice(event.segmentIndex + 1),
        ],
      };
    })
  );
  this.segmentsReplaced.emit(event);
}
  protected saveAndFinish(): void {
    this.complete.emit(this.uniqueTableAnnotations());
  }
}