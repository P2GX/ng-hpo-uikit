import { Component, OnDestroy, OnInit, inject, input, output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { FenominalSegment, FenominalSentence } from '../models/fenominal-models';
import { HierarchyMapItem, HpoTermMinimal, PolishedHpoAnnotation } from '../models/hpo-annotation-models';
import { OntologyMatch } from '../models/ontology-dto';
import { HpoMiningComponent } from '../hpo-mining/hpo-mining.component';
import { HpoPolishingWorkspaceComponent } from '../hpo-polishing-workspace/hpo-polishing-workspace.component';
import { NotificationService } from '../services/notification.service';

export interface HpoTwostepData {
  mineTextProvider: (text: string) => Promise<FenominalSentence[]>;
  hierarchyProvider: (termId: string) => Promise<HierarchyMapItem>;
  availableModifiers: () => Promise<HpoTermMinimal[]>;
  autocompleteProvider: (query: string) => Observable<OntologyMatch[]>;
}

@Component({
  selector: 'lib-hpo-twostep-mining',
  standalone: true,
  imports: [
    HpoMiningComponent,
    HpoPolishingWorkspaceComponent,
  ],
  templateUrl: './hpo-twostep-mining.component.html',
  styleUrl: './hpo-twostep-mining.component.scss'
})
export class HpoTwostepMiningComponent implements OnInit {

  config = input.required<HpoTwostepData>();
    private readonly notificationService = inject(NotificationService);

  // Internal component state using signals
  protected currentStep = signal<1 | 2>(1);
  protected curatedSentences = signal<FenominalSentence[]>([]);
  protected readonly availableModifiers = signal<HpoTermMinimal[]>([]);


  // Modern Outputs (Observable-like emitters without RxJS overhead)
  curationComplete = output<PolishedHpoAnnotation[]>();
  cancelled = output<void>();
  errorOccurred = output<string>();
  successOccurred = output<string>();



  ngOnInit(): void {
    // Resolve modifiers on initialization using the input configuration
    this.config().availableModifiers()
      .then(modifiers => this.availableModifiers.set(modifiers))
      .catch(err => this.errorOccurred.emit(`Failed to load modifiers: ${err}`));
  }


  /**
   * Step 1 Callback: Ingests raw text annotations from the parser engine
   */
  protected handleMiningRequest(event: { text: string; callback: (result: FenominalSentence[] | string) => void }): void {
    this.config().mineTextProvider(event.text)
      .then((sentences) => event.callback(sentences))
      .catch((error: any) => event.callback(error?.message || 'Text mining execution failed.'));
  }
  
  protected onTextMiningSuccess(parsedSentences: FenominalSentence[]): void {
    this.successOccurred.emit(`Parsed sentences: n=${parsedSentences.length}`);
    this.curatedSentences.set(parsedSentences);
    this.currentStep.set(2);
  }

  protected onTextMiningError(message: string): void {
    this.errorOccurred.emit(`Ontology text mining parsing pipeline failed: ${message}.`);
  }

  /**
   * Step 2 Callback: Ingests final curated tokens to return to the backend database
   */
  protected onCurationComplete(finalSentences: PolishedHpoAnnotation[]): void {
    this.curationComplete.emit(finalSentences);  
  }

  protected onSegmentsReplaced(event: {
    sentence: FenominalSentence;
    segmentIndex: number;
    newSegments: FenominalSegment[];
  }): void {
    this.curatedSentences.update(all =>
      all.map(s =>
         s.start !== event.sentence.start
          ? s
          : {
              ...s,
              segments: [
                ...s.segments.slice(0, event.segmentIndex),
                ...event.newSegments,
                ...s.segments.slice(event.segmentIndex + 1),
              ],
            }
      )
    );
  }

  protected close(): void {
    this.cancelled.emit();
  }
}