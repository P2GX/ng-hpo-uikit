import type { Meta, StoryObj } from '@storybook/angular';
import { TextMiningContainerComponent } from './text-mining-container.component';
import { FenominalSentence } from '../models/fenominal-models';

// Mock clinical text matching data structure 
const mockSentences: FenominalSentence[] = [
  {
    start: 0,
    originalText: 'Noonan syndrome (NS) is an autosomal dominant disorder characterized by short stature, facial dysmorphism, and a wide spectrum of congenital heart defects.',
    segments: [
      { kind: 'text', text: 'Noonan syndrome (NS) is an autosomal dominant disorder characterized by ', span: { start: 0, end: 72 } },
      { kind: 'hit', text: 'short stature', hit: { termId: 'HP:0004322', label: 'Short stature', span: { start: 72, end: 85 }, excluded: false } },
      { kind: 'text', text: ', ', span: { start: 85, end: 87 } },
      { kind: 'hit', text: 'facial dysmorphism', hit: { termId: 'HP:0001999', label: 'Abnormal facial shape', span: { start: 87, end: 105 }, excluded: false } },
      { kind: 'text', text: ', and a wide spectrum of ', span: { start: 105, end: 130 } },
      { kind: 'hit', text: 'congenital heart defects', hit: { termId: 'HP:0030680', label: 'Abnormal cardiovascular system morphology', span: { start: 130, end: 154 }, excluded: false } },
      { kind: 'text', text: '.', span: { start: 154, end: 155 } }
    ]
  },
  {
    start: 156,
    originalText: 'The distinctive facial features consist of a broad forehead, hypertelorism, downslanting palpebral fissures, a high-arched palate, and low-set, posteriorly rotated ears.',
    segments: [
      { kind: 'text', text: 'The distinctive facial features consist of a ', span: { start: 156, end: 201 } },
      { kind: 'hit', text: 'broad forehead', hit: { termId: 'HP:0000337', label: 'Broad forehead', span: { start: 201, end: 215 }, excluded: false } },
      { kind: 'text', text: ', ', span: { start: 215, end: 217 } },
      { kind: 'hit', text: 'hypertelorism', hit: { termId: 'HP:0000316', label: 'Hypertelorism', span: { start: 217, end: 230 }, excluded: false } },
      { kind: 'text', text: ', ', span: { start: 230, end: 232 } },
      { kind: 'hit', text: 'downslanting palpebral fissures', hit: { termId: 'HP:0000494', label: 'Downslanted palpebral fissures', span: { start: 232, end: 263 }, excluded: false } },
      { kind: 'text', text: ', a ', span: { start: 263, end: 267 } },
      { kind: 'hit', text: 'high-arched palate', hit: { termId: 'HP:0002705', label: 'High palate', span: { start: 267, end: 285 }, excluded: false } },
      { kind: 'text', text: ', and ', span: { start: 285, end: 291 } },
      { kind: 'hit', text: 'low-set, posteriorly rotated ears', hit: { termId: 'HP:0000358', label: 'Posteriorly rotated ears', span: { start: 291, end: 324 }, excluded: false } },
      { kind: 'text', text: '.', span: { start: 324, end: 325 } }
    ]
  },
  {
    // No annotations mined from this sentence at all — good edge case for compact/collapsed rendering
    start: 326,
    originalText: 'Cardiac involvement is present in up to 90% of patients.',
    segments: [
      { kind: 'text', text: 'Cardiac involvement is present in up to 90% of patients.', span: { start: 326, end: 382 } }
    ]
  },
  {
    // Starts immediately with a hit — no leading text segment
    start: 383,
    originalText: 'Pulmonic stenosis and hypertrophic cardiomyopathy are the most common forms of cardiac disease, but a variety of other lesions are also observed.',
    segments: [
      { kind: 'hit', text: 'Pulmonic stenosis', hit: { termId: 'HP:0001642', label: 'Pulmonic stenosis', span: { start: 383, end: 400 }, excluded: false } },
      { kind: 'text', text: ' and ', span: { start: 400, end: 405 } },
      { kind: 'hit', text: 'hypertrophic cardiomyopathy', hit: { termId: 'HP:0001639', label: 'Hypertrophic cardiomyopathy', span: { start: 405, end: 432 }, excluded: false } },
      { kind: 'text', text: ' are the most common forms of cardiac disease, but a variety of other lesions are also observed.', span: { start: 432, end: 528 } }
    ]
  },
  {
    start: 529,
    originalText: 'Additional relatively frequent features include multiple skeletal defects (chest and spine deformities), webbed neck, impaired intellectual development, cryptorchidism, and bleeding diathesis.',
    segments: [
      { kind: 'text', text: 'Additional relatively frequent features include multiple ', span: { start: 529, end: 586 } },
      { kind: 'hit', text: 'skeletal defects', hit: { termId: 'HP:0000924', label: 'Abnormality of the skeletal system', span: { start: 586, end: 602 }, excluded: false } },
      { kind: 'text', text: ' (chest and spine deformities), ', span: { start: 602, end: 634 } },
      { kind: 'hit', text: 'webbed neck', hit: { termId: 'HP:0000465', label: 'Webbed neck', span: { start: 634, end: 645 }, excluded: false } },
      { kind: 'text', text: ', ', span: { start: 645, end: 647 } },
      { kind: 'hit', text: 'impaired intellectual development', hit: { termId: 'HP:0001249', label: 'Intellectual disability', span: { start: 647, end: 680 }, excluded: true } },
      { kind: 'text', text: ', ', span: { start: 680, end: 682 } },
      { kind: 'hit', text: 'cryptorchidism', hit: { termId: 'HP:0000028', label: 'Cryptorchidism', span: { start: 682, end: 696 }, excluded: false } },
      { kind: 'text', text: ', and ', span: { start: 696, end: 702 } },
      { kind: 'hit', text: 'bleeding diathesis', hit: { termId: 'HP:0001892', label: 'Abnormal bleeding', span: { start: 702, end: 720 }, excluded: false } },
      { kind: 'text', text: '.', span: { start: 720, end: 721 } }
    ]
  }
];

const meta: Meta<TextMiningContainerComponent> = {
  title: 'HPO Library/TextMiningContainer',
  component: TextMiningContainerComponent,
  tags: ['autodocs'],
  argTypes: { }
};

export default meta;
type Story = StoryObj<TextMiningContainerComponent>;

/**
 * Standard Reading Layout mimicking textual context matching
 */
export const DefaultLayout: Story = {
  args: {
    sentences: mockSentences
  }
};

/**
 * Compact View grouping extracted badges side-by-side
 */
export const CompactTokensView: Story = {
  args: {
    ...DefaultLayout.args,
  }
};

/**
 * ReadOnly protection view
 */
export const ReadOnlyState: Story = {
  args: {
    ...DefaultLayout.args
    }
};