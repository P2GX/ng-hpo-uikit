import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenominalSentence, FenominalHit, UiFenominalSentence } from '../models/fenominal-models';
import { DeleteHitRequest, OntologyAutocompleteProvider } from '../models/hpo-annotation-models';
import { MatDialog } from '@angular/material/dialog';
import { SentenceAnnotationDialogComponent, SentenceAnnotationDialogData, SentenceAnnotationDialogResult } from '../sentence-annotation/sentence-annotation-dialog.component';
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'hpo-text-mining-container',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './text-mining-container.component.html',
  styleUrls: ['./text-mining-container.component.scss']
})
export class TextMiningContainerComponent {
  sentences = input<FenominalSentence[]>([]);
  deleteHitRequested = output<DeleteHitRequest>();
   private readonly dialog = inject(MatDialog);
    readonly autocompleteProvider = input.required<OntologyAutocompleteProvider>();


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

  protected deleteHit(
      sentence: FenominalSentence,
      hit: FenominalHit
  ): void {
      this.deleteHitRequested.emit({
          sentenceStart: sentence.start,
          hit
      });
  }

  openManualAnnotationDialog(sentence: FenominalSentence, segmentIndex: number): void {
    const segment = sentence.segments[segmentIndex];
    if (segment.kind !== 'text') return; // defensive; template already prevents this

    const ref = this.dialog.open(SentenceAnnotationDialogComponent, {
      data: { segment, autocompleteProvider: this.autocompleteProvider() },
      width: '480px',
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return; // user cancelled
      sentence.segments.splice(segmentIndex, 1, ...result);
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