import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { fn } from '@storybook/test';

import { HpoPolishingWorkspaceComponent } from './hpo-polishing-workspace.component';
import { FenominalSentence } from '../models/fenominal-models';
import { OntologyMatch } from '../models/ontology-dto';
import { HpoTermMinimal } from '../models/hpo-annotation-models';

// 1. Maintain mock input data as clean raw backend structures (FenominalSentence[])
const mockSentences: FenominalSentence[] = [
  {
    start: 0,
    originalText: 'The patient presents with severe macrocephaly and developmental delay.',
    segments: [
      { kind: 'text', text: 'The patient presents with severe ', span: { start: 0, end: 33 } },
      {
        kind: 'hit',
        text: 'macrocephaly',
        hit: {
          termId: 'HP:0000256',
          label: 'Macrocephaly',
          excluded: false,
          span: { start: 33, end: 45 }
        }
      },
      { kind: 'text', text: ' and ', span: { start: 45, end: 50 } },
      {
        kind: 'hit',
        text: 'developmental delay',
        hit: {
          termId: 'HP:0001263',
          label: 'Global developmental delay',
          excluded: false,
          span: { start: 50, end: 69 }
        }
      },
      { kind: 'text', text: '.', span: { start: 69, end: 70 } }
    ]
  },
  {
    start: 100,
    originalText: 'There is no history of seizures.',
    segments: [
      { kind: 'text', text: 'There is no history of ', span: { start: 0, end: 23 } },
      {
        kind: 'hit',
        text: 'seizures',
        hit: {
          termId: 'HP:0001250',
          label: 'Seizure',
          excluded: true,
          span: { start: 23, end: 31 }
        }
      },
      { kind: 'text', text: '.', span: { start: 31, end: 32 } }
    ]
  }
];

const mockOnsets = ['Congenital onset', 'Antenatal onset', 'Neonatal onset', 'Infantile onset'];
const mockModifiers: HpoTermMinimal[] = [
  { termId: 'HP:0012825', label: 'Mild' },
  { termId: 'HP:0012826', label: 'Moderate' },
  { termId: 'HP:0012828', label: 'Severe' },
  { termId: 'HP:0031375', label: 'Insidious onset' },
  { termId: 'HP:0003679', label: 'Static' },
  { termId: 'HP:0003676', label: 'Progressive' },
];

const mockSearchProvider = (query: string) => {
  const mockDatabase: OntologyMatch[] = [
    { id: 'HP:0001250', label: 'Seizure', matchedText: 'Epilepsy' },
    { id: 'HP:0000256', label: 'Macrocephaly', matchedText: 'Macrocephaly' },
    { id: 'HP:0001263', label: 'Global developmental delay', matchedText: 'Developmental delay' },
    { id: 'HP:0002019', label: 'Hyperreflexia', matchedText: 'Increased reflexes' }
  ];

  const filtered = mockDatabase.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.id.toLowerCase().includes(query.toLowerCase()) ||
    item.matchedText.toLowerCase().includes(query.toLowerCase())
  );

  return of(filtered).pipe(delay(200));
};

const meta: Meta<HpoPolishingWorkspaceComponent> = {
  title: 'Components/HPO Polishing Workspace',
  component: HpoPolishingWorkspaceComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, MatIconModule],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autocompleteProvider: {
      table: { disable: true }
    }
  }
};

export default meta;
type Story = StoryObj<HpoPolishingWorkspaceComponent>;

// Inside hpo-polishing-workspace.stories.ts

export const DefaultWorkspace: Story = {
  // Use a custom render function to guarantee bindings exist on initial paint
  render: (args) => ({
    props: args,
    template: `
      @if (searchProvider) {
        <hpo-polishing-workspace
          [sentences]="sentences"
          [availableOnsets]="availableOnsets"
          [availableModifiers]="availableModifiers"
          [searchProvider]="searchProvider"
          (requestHierarchy)="requestHierarchy($event)"
          (createOnsetProvider)="createOnsetRequested($event)"
          (complete)="complete($event)"
          (cancel)="cancel()"
          (badgeMoved)="badgeMoved($event)">
        </hpo-polishing-workspace>
      }
    `
  }),
  args: {
    sentences: mockSentences,
    availableModifiers: mockModifiers,
    autocompleteProvider: mockSearchProvider,
    hierarchyProvider: fn(),
    complete: fn(),
    cancel: fn(),
    badgeMoved: fn()
  }
};

export const EmptyWorkspace: Story = {
  args: {
    ...DefaultWorkspace.args,
    sentences: [],
  }
};
