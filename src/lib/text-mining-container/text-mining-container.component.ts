import { Component, input, output, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenominalSentence, UiHitWrapper, FenominalHit, FenominalSegment } from '../models/fenominal-models';

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
  displayMode = input<'default' | 'compact', string>('default', {
    transform: (v: string) => (v?.toLowerCase() as 'default' | 'compact') || 'default'
  });

  /* Show sentences above this index in collapsed mode to save space */
  protected collapsedUntilIndex = signal<number | null>(null);
  hitUpdated = output<{ action: string; sentence: FenominalSentence }>();

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

  protected getWrapper(hit: any): UiHitWrapper {
    return {
      rawHit: hit,
      modifiers: { excluded: !hit.is_observed, modifiers: [] }
    };
  }

protected getTooltipText(hit: FenominalHit): string {
  const wrapper = this.getWrapper(hit);
  const lines: string[] = [
    `Term: ${hit.label}`,
    `ID: ${hit.term_id}`,
    `Span: [${hit.span.start}, ${hit.span.end}]`,
    `Status: ${hit.is_observed ? 'Observed' : 'Excluded'}`
  ];

  // Append clinical modifiers if your wrapper has them populated
  if (wrapper?.modifiers) {
    const mods = wrapper.modifiers;
    if (mods.severity) lines.push(`Severity: ${mods.severity}`);
    if (mods.onset) lines.push(`Onset: ${mods.onset}`);
    if (mods.modifiers && mods.modifiers.length > 0) {
      lines.push(`Modifiers: ${mods.modifiers.join(', ')}`);
    }
  }

  return lines.join('\n');
}

  private getHitUniqueKey(hit: FenominalHit): string {
    return `${hit.term_id}-${hit.span.start}-${hit.span.end}`;
  }

}