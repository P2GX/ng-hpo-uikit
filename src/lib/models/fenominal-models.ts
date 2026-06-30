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