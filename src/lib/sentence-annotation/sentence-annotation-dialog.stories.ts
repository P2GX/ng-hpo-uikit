import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of, delay } from 'rxjs';

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

