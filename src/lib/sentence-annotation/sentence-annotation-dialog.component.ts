import { Component, computed, effect, HostListener, inject, input, output, signal } from '@angular/core';
import {
  FenominalHit,
  FenominalSegment,
} from '../models/fenominal-models';
import { OntologyAutocompleteComponent } from '../ontology-autocomplete/ontology-autocomplete.component';
import { OntologyMatch } from '../models/ontology-dto';
import { Observable } from 'rxjs/internal/Observable';

// dialog input
type FenominalTextSegment = Extract<FenominalSegment, { kind: 'text' }>;
export interface SentenceAnnotationDialogData {
  segment: FenominalTextSegment;
  autocompleteProvider: (query: string) => Observable<OntologyMatch[]>;
}

// dialog output
export type SentenceAnnotationDialogResult = FenominalSegment[] | null; // null = cancelled

interface WordToken {
  text: string;
  startOffset: number; // offset relative to segment.text, NOT absolute doc offset
  endOffset: number;
  isWhitespace: boolean;
  isPunctuation: boolean;
}

function tokenize(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  const re = /[\p{L}\p{N}]+|[^\s\p{L}\p{N}]+|\s+/gu;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const raw = match[0];
    const isWhitespace = /^\s+$/u.test(raw);
    const isPunctuation = !isWhitespace && /^[^\p{L}\p{N}]+$/u.test(raw);
    tokens.push({
      text: raw,
      startOffset: match.index,
      endOffset: match.index + raw.length,
      isWhitespace,
      isPunctuation,
    });
  }
  return tokens;
}

@Component({
  selector: 'app-sentence-annotation-dialog',
  standalone: true,
  templateUrl: './sentence-annotation-dialog.component.html',
  styleUrl: './sentence-annotation-dialog.component.scss',
  imports: [OntologyAutocompleteComponent],
})
export class SentenceAnnotationDialogComponent {
 
  segment = input.required<FenominalTextSegment>();
  autocompleteProvider = input.required<(query: string) => Observable<OntologyMatch[]>>();
  close = output<FenominalSegment[] | null>();
  
  readonly tokens = signal<WordToken[]>([]);
  readonly selectedIndices = signal<Set<number>>(new Set());
  readonly chosenTerm = signal<OntologyMatch | null>(null);
  readonly isDragging = signal(false);
  private readonly dragStartIndex = signal<number | null>(null);

   constructor() {
    effect(() => {
      this.tokens.set(tokenize(this.segment().text));
    });
  }


  readonly selectedText = computed(() => {
    const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
    if (idxs.length === 0) return '';
    const toks = this.tokens();
    return toks
      .slice(idxs[0], idxs[idxs.length - 1] + 1)
      .map((t) => t.text)
      .join('');
  });
 

  handleAutocompleteSelection(match: OntologyMatch): void {
    this.chosenTerm.set(match);
    this.confirm();
  }

  private textSegment(text: string, start: number, end: number): FenominalSegment {
    return { kind: 'text', text, span: { start, end } };
  }

  hitSegment(text: string, match: OntologyMatch, start: number, end: number): FenominalSegment {
    const hit: FenominalHit = {
      termId: match.id,
      label: match.label,
      span: { start, end },
      excluded: false,
    };
    return { kind: 'hit', text, hit };
  }

 confirm(): void {


    // Use the signal inputs
    const seg = this.segment();
    const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
    const toks = this.tokens();
    const segStart = seg.span.start;
    const match = this.chosenTerm()!;

    const result: FenominalSegment[] = [];
    const firstTok = toks[idxs[0]];
    const lastTok = toks[idxs[idxs.length - 1]];

    if (firstTok.startOffset > 0) {
      result.push(this.textSegment(seg.text.slice(0, firstTok.startOffset), segStart, segStart + firstTok.startOffset));
    }
    result.push(this.hitSegment(seg.text.slice(firstTok.startOffset, lastTok.endOffset), match, segStart + firstTok.startOffset, segStart + lastTok.endOffset));
    if (lastTok.endOffset < seg.text.length) {
      result.push(this.textSegment(seg.text.slice(lastTok.endOffset), segStart + lastTok.endOffset, seg.span.end));
    }

    this.close.emit(result);
  }

  cancel(): void {
    this.close.emit(null);
  }

  onWordMouseDown(index: number, event: MouseEvent): void {
    const tok = this.tokens()[index];
    if (tok.isWhitespace || tok.isPunctuation) return;
    event.preventDefault(); // avoid native text selection while dragging
    this.isDragging.set(true);
    this.dragStartIndex.set(index);
    this.selectedIndices.set(new Set([index]));
    this.chosenTerm.set(null);
  }

  onWordMouseEnter(index: number): void {
    if (!this.isDragging()) return;
    const start = this.dragStartIndex();
    if (start === null) return;

    const [lo, hi] = start <= index ? [start, index] : [index, start];
    const toks = this.tokens();
    // Collect all non-whitespace tokens in the dragged range.
    let indices: number[] = [];
    for (let i = lo; i <= hi; i++) {
        if (!toks[i].isWhitespace) indices.push(i);
    }
    // Trim leading/trailing punctuation so a mark never begins or ends
    // on a punctuation token, even if the drag physically covers one.
    let s = 0;
    let e = indices.length - 1;
    while (s <= e && toks[indices[s]].isPunctuation) s++;
    while (e >= s && toks[indices[e]].isPunctuation) e--;
    indices = indices.slice(s, e + 1);

    this.selectedIndices.set(new Set(indices));
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging.set(false);
    this.dragStartIndex.set(null);
  }

  clearSelection(): void {
    this.selectedIndices.set(new Set());
    this.chosenTerm.set(null);
  }

}
