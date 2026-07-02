# HPO Text Mining Container

## Overview

The `lib-text-mining-container` component functions as a pure, presentation-layer text annotation interface. It accepts an array of FenominalSentence structures and captures user span adjustments via the hitUpdated output.

When a user alters a badge boundary or shifts its location, the parent container must intercept the event, modify the character index boundaries against the immutable state, slice the raw text string, and pass a new array back down into the component input.

### The Parent State Handler Workflow

When a span edit occurs, the parent layer must perform a three-step orchestration:

* **Locate:** Find the targeted FenominalSentence and FenominalHit using unique identifier spans.
* **Re-calculate Boundaries:** Apply the direction modifier step (in characters) to the targeted span.start or span.end.
* **Re-segment Text:** Re-slice the sentence's original_text into a clean, alternating sequence of text and hit tokens so that no character gaps or overlaps occur.

## Implementation Example: Parent Container / Service Controller

Here is the concrete TypeScript algorithm to drop into your parent management layout to handle the re-segmentation logic cleanly:

`typescript
import { Injectable, signal } from '@angular/core';
import { FenominalSentence, FenominalSegment, FenominalHit } from './models';

@Injectable({ providedIn: 'root' })
export class TextMiningStateService {
  // Master state storage holding the text mining source of truth
  public sentences = signal<FenominalSentence[]>([]);

  /**
   * Main entry point mapped to the component's (hitUpdated) output
   */
  public handleHitUpdate(event: { action: string; sentence: FenominalSentence }): void {
    if (event.action === 'SPAN_BOUNDARIES_CHANGED' || event.action === 'SPAN_POSITION_SHIFTED') {
      this.updateAndResegment(event.sentence);
    }
  }

  private updateAndResegment(updatedSentence: FenominalSentence): void {
    const rawText = updatedSentence.original_text;
    
    // 1. Extract the primary hit token that was altered
    const targetHitSegment = updatedSentence.segments.find(s => s.kind === 'hit') as Extract<FenominalSegment, { kind: 'hit' }>;
    if (!targetHitSegment) return;

    const { start, end } = targetHitSegment.hit.span;

    // 2. Compute the brand new structural segments list
    const adjustedSegments: FenominalSegment[] = [];

    // Prefix block: text before the annotated term
    if (start > 0) {
      adjustedSegments.push({
        kind: 'text',
        text: rawText.substring(0, start),
        span: { start: 0, end: start }
      });
    }

    // Hit block: update the slice text string value to match new bounds
    const updatedTermText = rawText.substring(start, end);
    targetHitSegment.text = updatedTermText;
    targetHitSegment.hit.label = updatedTermText; // Sync ontology target dictionary string
    targetHitSegment.span = { start, end };
    
    adjustedSegments.push(targetHitSegment);

    // Suffix block: text after the annotated term
    if (end < rawText.length) {
      adjustedSegments.push({
        kind: 'text',
        text: rawText.substring(end),
        span: { start: end, end: rawText.length }
      });
    }

    // 3. Emit a completely immutable array reference to trigger Angular's OnPush change detection
    this.sentences.update(allSentences =>
      allSentences.map(s => s.start === updatedSentence.start ? { ...s, segments: adjustedSegments } : s)
    );
  }
}
```

## Integration into Parent Component Template

Once this service state machine is configured, your parent orchestrator stays clean and simply pipelines the data downwards, avoiding any dirty local component state inside your UI library:

```typescript
<lib-text-mining-container
  [sentences]="stateService.sentences()"
  (hitUpdated)="stateService.handleHitUpdate($event)">
</lib-text-mining-container>
```

