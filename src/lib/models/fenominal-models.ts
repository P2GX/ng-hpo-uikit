export type FenominalSegment = 
  | { kind: 'hit'; text: string; hit: FenominalHit }
  | { kind: 'text'; text: string; span: { start: number; end: number } };

export interface FenominalHit {
  termId: string;
  label: string;
  span: { start: number; end: number };
  isObserved: boolean;
}

export interface FenominalSentence {
  start: number;
  originalText: string;
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
  severity?: string;
  onset?: string;
  excluded: boolean;
  modifiers: string[];
  
}

export function ui_from_fenominal(hit: FenominalHit, id: string): UiFenominalHit {
  const ui_hit: UiFenominalHit = {
    id: id,
    termId: hit.termId,
    label: hit.label,
    span: hit.span,
    severity: undefined,
    onset: undefined,
    excluded: false,
    modifiers: []
  };
  return ui_hit;
}

export type UiFenominalSegment = 
  | { kind: 'text'; text: string; span: { start: number; end: number } }
  | { kind: 'hit'; text: string; hit: UiFenominalHit };

export interface UiFenominalSentence {
  start: number;
  originalText: string;
  segments: UiFenominalSegment[];
}