import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HpoAnnotationPolisherComponent } from './hpo-annotation-polisher.component';

const meta: Meta<HpoAnnotationPolisherComponent> = {
  title: 'Components/HPO Annotation Polisher',
  component: HpoAnnotationPolisherComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, MatIconModule],
    }),
    (story) => {
      const storyInstance = story();
      return {
        ...storyInstance, // <-- CRITICAL: This passes the mock arguments context to the wrapper template
        template: `
          <div style="padding: 2rem;">
            <table>
              <tbody>
                <tr app-hpo-annotation-polisher 
                    [annotation]="annotation"
                    [hierarchy]="hierarchy"
                    [availableOnsets]="availableOnsets"
                    [availableModifiers]="availableModifiers"
                    (annotationChange)="annotationChange($event)"
                    (updated)="updated($event)"
                    (deleteRequested)="deleteRequested($event)"
                    (termClick)="termClick($event)">
                </tr>
              </tbody>
            </table>
          </div>
        `,
      };
    },
  ],
  // Automatically capture your output() events in the Storybook Actions log panel
  argTypes: {
    annotationChange: { action: 'annotationChange' },
    updated: { action: 'updated' },
    deleteRequested: { action: 'deleteRequested' },
    termClick: { action: 'termClick' },
  },
};

export default meta;
type Story = StoryObj<HpoAnnotationPolisherComponent>;

// --- Mock Data States ---

const mockHierarchy = {
  parents: [
    { termId: 'HP:0001250', label: 'Seizures' }
  ],
  children: [
    { termId: 'HP:0002069', label: 'Generalized tonic-clonic seizures' },
    { termId: 'HP:0002123', label: 'Myoclonic seizures' }
  ]
};

const mockOnsets = ['Antenatal onset', 'Neonatal onset', 'Infantile onset', 'Childhood onset'];
const mockModifiers = ['Severe', 'Mild', 'Episodic', 'Progressive'];

// --- Stories ---

export const DefaultObserved: Story = {
  args: {
    annotation: {
      termId: 'HP:0001250',
      label: 'Seizure',
      isObserved: true,
      onsetString: 'Infantile onset',
      modifiers: ['Severe']
    },
    hierarchy: mockHierarchy,
    availableOnsets: mockOnsets,
    availableModifiers: mockModifiers
  }
};

export const ExcludedWithNoMetadata: Story = {
  args: {
    annotation: {
      termId: 'HP:0000707',
      label: 'Abnormality of the nervous system',
      isObserved: false,
      modifiers: []
    },
    hierarchy: { parents: [], children: [] },
    availableOnsets: mockOnsets,
    availableModifiers: mockModifiers
  }
};