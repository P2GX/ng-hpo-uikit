import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenominalSentence, FenominalHit, FenominalSegment } from '../models/fenominal-models';
import { DeleteHitRequest, OntologyAutocompleteProvider } from '../models/hpo-annotation-models';
import { SentenceAnnotationDialogComponent } from '../sentence-annotation/sentence-annotation-dialog.component';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'hpo-text-mining-container',
  standalone: true,
  imports: [CommonModule, SentenceAnnotationDialogComponent],
  templateUrl: './text-mining-container.component.html',
  styleUrls: ['./text-mining-container.component.scss'],
})
export class TextMiningContainerComponent {
  @ViewChild('annotationDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  private notificationService = inject(NotificationService);
  selectedSentence = signal<FenominalSentence | null>(null);
  selectedSegment = signal<FenominalSegment|null>(null);
  selectedIndex = signal<number | null>(null);
  sentences = input<FenominalSentence[]>([]);
  deleteHitRequested = output<DeleteHitRequest>();
  readonly autocompleteProvider = input.required<OntologyAutocompleteProvider>();

  readonly segmentsReplaced = output<{
    sentence: FenominalSentence;
    segmentIndex: number;
    newSegments: FenominalSegment[];
  }>();

  /* Show sentences above this index in collapsed mode to save space */
  protected collapsedUntilIndex = signal<number | null>(null);

  protected collapseUpTo(sentenceStart: number): void {
    this.collapsedUntilIndex.set(sentenceStart);
  }

  /** Resets layout back to the full text mapping */
  protected resetCollapse(): void {
    this.collapsedUntilIndex.set(null);
  }

  protected isSentenceCollapsed(sentenceStart: number): boolean {
    const cutoff = this.collapsedUntilIndex();
    if (cutoff === null) return false;
    return sentenceStart <= cutoff;
  }

  protected deleteHit(sentence: FenominalSentence, hit: FenominalHit): void {
    this.deleteHitRequested.emit({
      sentenceStart: sentence.start,
      hit,
    });
  }

  openManualAnnotationDialog(sentence: FenominalSentence, segmentIndex: number): void {
    const segment = sentence.segments[segmentIndex];
    if (segment.kind !== 'text') return;
    this.selectedSentence.set(sentence);
    this.selectedIndex.set(segmentIndex);
    this.selectedSegment.set(segment);
    this.dialogRef.nativeElement.showModal();
  }

  handleDialogResult(result: FenominalSegment[] | null): void {
    this.dialogRef.nativeElement.close();
    const sentence = this.selectedSentence();
    const idx = this.selectedIndex();
    this.selectedSentence.set(null);
    this.selectedIndex.set(null);
    if (!result) {
      return;
    }
    if (!sentence || idx === null) {
      this.notificationService.showError("Could not retrieve sentence context for annotation.");
      return;
    }

    this.segmentsReplaced.emit({
      sentence,
      segmentIndex: idx,
      newSegments: result,
    });
  }

  private readonly punctuationOnlyPattern = /^[\p{P}\p{S}\s]+$/u;

  isPunctuationOnly(text: string): boolean {
    return this.punctuationOnlyPattern.test(text);
  }

  protected getTooltipText(hit: FenominalHit): string {
    return `ID: ${hit.termId}\nSpan: [${hit.span.start}, ${hit.span.end}]`;
  }
}
