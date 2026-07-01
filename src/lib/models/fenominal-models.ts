export type FenominalSegment = 
  | { kind: 'hit'; text: string; hit: FenominalHit }
  | { kind: 'text'; text: string; span: { start: number; end: number } };

export interface FenominalHit {
  term_id: string;
  label: string;
  span: { start: number; end: number };
  is_observed: boolean;
}

export interface FenominalSentence {
  start: number;
  original_text: string;
  segments: FenominalSegment[];
}

/** * UI Wrapper to extend the backend Hit model with local UI states or clinical modifiers
 */
export interface UiHitWrapper {
  rawHit: FenominalHit;
  /** UI state tracking */
  isDragging?: boolean;
  isSelected?: boolean;
  /** Clinical modifiers that can be toggled by the user or refined later */
  modifiers?: {
    severity?: string;
    modifiers: string[];
    onset?: string;
    excluded?: boolean;
  };
}