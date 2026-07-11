import { Component, computed, HostListener, inject, signal } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
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
  imports: [MatDialogActions, OntologyAutocompleteComponent, MatDialogContent],
})
export class SentenceAnnotationDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<SentenceAnnotationDialogComponent, SentenceAnnotationDialogResult>>(
      MatDialogRef,
    );
  readonly data = inject<SentenceAnnotationDialogData>(MAT_DIALOG_DATA);
  readonly tokens = signal<WordToken[]>([]);
  readonly selectedIndices = signal<Set<number>>(new Set());
  readonly chosenTerm = signal<OntologyMatch | null>(null);

  readonly autocompleteProvider = this.data.autocompleteProvider;

  readonly isDragging = signal(false);
  private readonly dragStartIndex = signal<number | null>(null);

  readonly selectedText = computed(() => {
    const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
    if (idxs.length === 0) return '';
    const toks = this.tokens();
    return toks
      .slice(idxs[0], idxs[idxs.length - 1] + 1)
      .map((t) => t.text)
      .join('');
  });

  readonly canConfirm = computed(
    () => this.selectedIndices().size > 0 && this.chosenTerm() !== null,
  );

  constructor() {
    this.tokens.set(tokenize(this.data.segment.text));
  }

  handleAutocompleteSelection(match: OntologyMatch): void {
    this.chosenTerm.set(match);
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
    if (!this.canConfirm()) return;

    const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
    const toks = this.tokens();
    const segStart = this.data.segment.span.start; // safe: segment is guaranteed 'text'

    const firstTok = toks[idxs[0]];
    const lastTok = toks[idxs[idxs.length - 1]];
    const match = this.chosenTerm()!;

    const result: FenominalSegment[] = [];

    if (firstTok.startOffset > 0) {
      result.push(
        this.textSegment(
          this.data.segment.text.slice(0, firstTok.startOffset),
          segStart,
          segStart + firstTok.startOffset,
        ),
      );
    }

    result.push(
      this.hitSegment(
        this.data.segment.text.slice(firstTok.startOffset, lastTok.endOffset),
        match,
        segStart + firstTok.startOffset,
        segStart + lastTok.endOffset,
      ),
    );

    if (lastTok.endOffset < this.data.segment.text.length) {
      result.push(
        this.textSegment(
          this.data.segment.text.slice(lastTok.endOffset),
          segStart + lastTok.endOffset,
          this.data.segment.span.end,
        ),
      );
    }

    this.dialogRef.close(result);
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
  cancel(): void {
    this.dialogRef.close(null);
  }
}
