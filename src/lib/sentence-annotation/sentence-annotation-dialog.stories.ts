import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of, delay } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SentenceAnnotationDialogComponent } from './sentence-annotation-dialog.component';
import type { SentenceAnnotationDialogData } from './sentence-annotation-dialog.component';
import type { UiFenominalSegment } from '../models/fenominal-models';
import type { OntologyMatch } from '../models/ontology-dto'; 

// --- Fixtures -----------------------------------------------------------

const sampleTextSegment: Extract<UiFenominalSegment, { kind: 'text' }> = {
  kind: 'text',
  text: 'the patient presented with unusual facial features and short stature',
  span: { start: 0, end: 68 },
};

const sampleMatches: OntologyMatch[] = [
  { id: 'HP:0001999', label: 'Abnormal facial shape', matchedText: 'unusual facial features' },
  { id: 'HP:0000252', label: 'Microcephaly', matchedText: 'small head' },
  { id: 'HP:0004322', label: 'Short stature', matchedText: 'short stature' },
];

// Fake provider: filters the fixture list by naive substring match on the query,
// with a small delay to mimic real async lookup latency in the autocomplete UI.
function mockAutocompleteProvider(query: string) {
  const q = query.trim().toLowerCase();
  const results = q
    ? sampleMatches.filter(
        m => m.label.toLowerCase().includes(q) || m.matchedText.toLowerCase().includes(q)
      )
    : sampleMatches;
  return of(results).pipe(delay(200));
}

// Minimal MatDialogRef stub — logs close() calls instead of actually closing anything,
// since there's no real dialog overlay in Storybook.
class MockDialogRef {
  close(result: unknown): void {
    // eslint-disable-next-line no-console
    console.log('[SentenceAnnotationDialogData] dialogRef.close called with:', result);
  }
}

// --- Meta ----------------------------------------------------------------

const meta: Meta<SentenceAnnotationDialogComponent> = {
  title: 'Curation/SentenceAnnotationDialogComponent',
  component: SentenceAnnotationDialogComponent,
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            segment: sampleTextSegment,
            autocompleteProvider: mockAutocompleteProvider,
          } satisfies SentenceAnnotationDialogData,
        },
      ],
    }),
  ],
  parameters: {
    // Renders standalone rather than inside a real CDK overlay, so add
    // a bit of surrounding chrome/width so the dialog content isn't
    // rendered edge-to-edge against the Storybook canvas.
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<SentenceAnnotationDialogComponent>;

// --- Stories ---------------------------------------------------------------

/** Default: a plain text segment, nothing selected yet. */
export const Default: Story = {};

/** A shorter segment, useful for checking layout with a single short phrase. */
export const ShortSegment: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            segment: {
              kind: 'text',
              text: 'mild hypertelorism noted',
              span: { start: 0, end: 24 },
            } satisfies Extract<UiFenominalSegment, { kind: 'text' }>,
            autocompleteProvider: mockAutocompleteProvider,
          } satisfies SentenceAnnotationDialogData,
        },
      ],
    }),
  ],
};

/** A longer segment, to check word-wrapping behavior in the word-picker. */
export const LongSegment: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            segment: {
              kind: 'text',
              text:
                'on examination the patient demonstrated marked hypertelorism, a broad nasal bridge, ' +
                'low-set ears, and mild micrognathia consistent with the previously reported facial gestalt',
              span: { start: 0, end: 190 },
            } satisfies Extract<UiFenominalSegment, { kind: 'text' }>,
            autocompleteProvider: mockAutocompleteProvider,
          } satisfies SentenceAnnotationDialogData,
        },
      ],
    }),
  ],
};

/** Provider that never resolves — useful for visually checking a loading state, if one exists. */
export const SlowProvider: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            segment: sampleTextSegment,
            autocompleteProvider: (query: string) => of(sampleMatches).pipe(delay(5000)),
          } satisfies SentenceAnnotationDialogData,
        },
      ],
    }),
  ],
};

/** Provider that always returns zero matches, to check the empty-results UI. */
export const NoMatches: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            segment: sampleTextSegment,
            autocompleteProvider: () => of([]),
          } satisfies SentenceAnnotationDialogData,
        },
      ],
    }),
  ],
};