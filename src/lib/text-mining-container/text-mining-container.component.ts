import { Component, input, output, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenominalSentence, FenominalHit, FenominalSegment } from '../models/fenominal-models';

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
  hitUpdated = output<{ action: string; sentence: FenominalSentence }>();

  displayMode = input<'default' | 'compact', string>('default', {
    transform: (v: string) => (v?.toLowerCase() as 'default' | 'compact') || 'default'
  });

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
    segment: FenominalSegment & { kind: 'hit' }, 
    edge: 'start' | 'end', 
    direction: number
  ): void {
    if (this.readOnly()) return;

    // 1. Calculate new character span boundaries
    if (edge === 'start') {
      segment.hit.span.start += direction;
    } else {
      segment.hit.span.end += direction;
    }

    // 2. In production, your parsing engine will recalculate the string cuts 
    // based on original_text. For immediate UI response, we flag the event:
    this.hitUpdated.emit({ action: 'SPAN_BOUNDARIES_CHANGED', sentence });
  }

  /**
   * Shifts the badge over to different words entirely
   */
  protected shiftBadge(
    sentence: FenominalSentence, 
    segment: FenominalSegment & { kind: 'hit' }, 
    wordDirection: number
  ): void {
    if (this.readOnly()) return;

    // Shift boundaries together to keep the token length identical but change placement
    const currentLength = segment.hit.span.end - segment.hit.span.start;
    
    // Rough estimation: shift window roughly 6 characters per word click
    const shiftOffset = wordDirection * 6; 
    
    segment.hit.span.start += shiftOffset;
    segment.hit.span.end = segment.hit.span.start + currentLength;

    this.hitUpdated.emit({ action: 'SPAN_POSITION_SHIFTED', sentence });
  }


  protected getTooltipText(hit: FenominalHit): string {
    return `ID: ${hit.term_id}\nSpan: [${hit.span.start}, ${hit.span.end}]`;
  }


}