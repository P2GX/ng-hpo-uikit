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

export interface UiFenominalHit {
  // Unique local ID so you can track this specific hit across drag/drop/delete operations
  id: string; 
  termId: string;
  label: string;
  span: { start: number; end: number };
  
  // Interactive UI properties
  isDragging?: boolean;
  isSelected?: boolean;
  
  // Modifiers
  modifiers: {
    severity?: string;
    onset?: string;
    excluded: boolean;
    modifiers: string[];
  };
}

export type UiFenominalSegment = 
  | { kind: 'text'; text: string; span: { start: number; end: number } }
  | { kind: 'hit'; text: string; hit: UiFenominalHit };

export interface UiFenominalSentence {
  start: number;
  original_text: string;
  segments: UiFenominalSegment[];
}