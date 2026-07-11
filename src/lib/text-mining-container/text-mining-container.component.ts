import { Component, input, output, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenominalSentence, FenominalHit, FenominalSegment } from '../models/fenominal-models';
import { HitSpanPatch } from '../models/hpo-annotation-models';

@Component({
  selector: 'hpo-text-mining-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-mining-container.component.html',
  styleUrls: ['./text-mining-container.component.scss']
})
export class TextMiningContainerComponent {
  sentences = input<FenominalSentence[]>([]);
  hitUpdated = output<HitSpanPatch>();

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



  protected getTooltipText(hit: FenominalHit): string {
    return `ID: ${hit.termId}\nSpan: [${hit.span.start}, ${hit.span.end}]`;
  }

}