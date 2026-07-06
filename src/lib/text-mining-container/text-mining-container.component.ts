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
  readOnly = input(false, { transform: booleanAttribute });
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


  /**
   * Modifies boundaries by grabbing or shedding characters from neighboring segments
   */
  protected adjustBoundary(
    sentence: FenominalSentence, 
    segmentIndex: number,
    edge: 'start' | 'end', 
    direction: number
  ): void {
    if (this.readOnly()) return;
    const segment = sentence.segments[segmentIndex];
    if (segment.kind !== 'hit') return;

    const span = { ...segment.hit.span };
    edge === 'start' ? (span.start += direction) : (span.end += direction);
    const updatedPatch: HitSpanPatch = {
      action: 'SPAN_BOUNDARIES_CHANGED',
      sentenceStart: sentence.start,
      segmentIndex,
      span
    };
    this.hitUpdated.emit(updatedPatch);
  }

  private replaceSegment(
    sentence: FenominalSentence,
    target: FenominalSegment,
    replacement: FenominalSegment
  ): FenominalSentence {
    return { ...sentence, segments: sentence.segments.map(s => (s === target ? replacement : s)) };
  }

  /**
   * Shifts the badge over to different words entirely
   */
  protected shiftBadge(
    sentence: FenominalSentence, 
    segmentIndex: number, 
    wordDirection: number
  ): void {
    if (this.readOnly()) return;
    const segment = sentence.segments[segmentIndex];
    if (!segment || segment.kind !== 'hit') return;
    // Shift boundaries together to keep the token length identical but change placement
    const currentLength = segment.hit.span.end - segment.hit.span.start;
    // Rough estimation: shift window roughly 6 characters per word click
    const shiftOffset = wordDirection * 6; 
    const start = segment.hit.span.start + shiftOffset;
     const updatedPatch: HitSpanPatch = {
        action: 'SPAN_POSITION_SHIFTED',
        sentenceStart: sentence.start,
        segmentIndex,
        span: { start, end: start + currentLength}
     };
    this.hitUpdated.emit(updatedPatch);
  }


  protected getTooltipText(hit: FenominalHit): string {
    return `ID: ${hit.termId}\nSpan: [${hit.span.start}, ${hit.span.end}]`;
  }

}