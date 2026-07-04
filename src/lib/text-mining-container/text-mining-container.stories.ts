import type { Meta, StoryObj } from '@storybook/angular';
import { TextMiningContainerComponent } from './text-mining-container.component';
import { FenominalSentence } from '../models/fenominal-models';

// Mock clinical text matching data structure 
const mockSentences: FenominalSentence[] = [
  {
    start: 0,
    originalText: 'The patient presents with severe macrocephaly and recurrent seizures.',
    segments: [
      { 
        kind: 'text', 
        text: 'The patient presents with severe ', 
        span: { start: 0, end: 33 } 
      },
      { 
        kind: 'hit', 
        text: 'macrocephaly', 
        hit: { termId: 'HP:0000256', label: 'Macrocephaly', span: { start: 33, end: 45 }, excluded: false } 
      },
      { 
        kind: 'text', 
        text: ' and recurrent ', 
        span: { start: 45, end: 60 } 
      },
      { 
        kind: 'hit', 
        text: 'seizures', 
        hit: { termId: 'HP:0001250', label: 'Seizures', span: { start: 60, end: 68 }, excluded: false } 
      },
      { 
        kind: 'text', 
        text: '.', 
        span: { start: 68, end: 69 } 
      }
    ]
  },
  {
    start: 70,
    originalText: 'Cardiological evaluation rules out hypertrophic cardiomyopathy.',
    segments: [
      { 
        kind: 'text', 
        text: 'Cardiological evaluation rules out ', 
        span: { start: 70, end: 105 } 
      },
      { 
        kind: 'hit', 
        text: 'hypertrophic cardiomyopathy', 
        hit: { termId: 'HP:0001639', label: 'Hypertrophic cardiomyopathy', span: { start: 105, end: 132 }, excluded: true } 
      },
      { 
        kind: 'text', 
        text: '.', 
        span: { start: 132, end: 133 } 
      }
    ]
  }
];

const meta: Meta<TextMiningContainerComponent> = {
  title: 'HPO Library/TextMiningContainer',
  component: TextMiningContainerComponent,
  tags: ['autodocs'],
  argTypes: {
    displayMode: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Changes layout rendering behavior of text blocks'
    },
    readOnly: {
      control: 'boolean',
      description: 'Toggles interaction utilities and drag indicators'
    }
  }
};

export default meta;
type Story = StoryObj<TextMiningContainerComponent>;

/**
 * Standard Reading Layout mimicking textual context matching
 */
export const DefaultLayout: Story = {
  args: {
    sentences: mockSentences,
    displayMode: 'default',
    readOnly: false
  }
};

/**
 * Compact View grouping extracted badges side-by-side
 */
export const CompactTokensView: Story = {
  args: {
    ...DefaultLayout.args,
    displayMode: 'compact'
  }
};

/**
 * ReadOnly protection view
 */
export const ReadOnlyState: Story = {
  args: {
    ...DefaultLayout.args,
    readOnly: true
  }
};