import { Meta, StoryObj } from '@storybook/angular';
import { HpoOnsetSelectorComponent } from './hpo-onset-selector.component';

const meta: Meta<HpoOnsetSelectorComponent> = {
  title: 'HPO/OnsetSelector',
  component: HpoOnsetSelectorComponent,
  tags: ['autodocs'],
  argTypes: {
    selectedOnset: {
      control: 'text',
      description: 'The currently chosen onset age string (Two-way model bound)',
    },
    availableOnsets: {
      control: 'object',
      description: 'List of standard HPO age terms available for selection',
    },
  },
};

export default meta;
type Story = StoryObj<HpoOnsetSelectorComponent>;

// Default state rendering standard mock HPO terms
export const Default: Story = {
  args: {
    selectedOnset: 'Antenatal onset (HP:0011460)',
    availableOnsets: [
      'Congenital onset (HP:0003577)',
      'Antenatal onset (HP:0011460)',
      'Neonatal onset (HP:0003623)',
      'Infantile onset (HP:0003593)',
      'Juvenile onset (HP:0003581)',
      'Adult onset (HP:0003584)',
    ],
  },
};

// State illustrating an empty selector field
export const EmptySelection: Story = {
  args: {
    selectedOnset: undefined,
    availableOnsets: [
      'Congenital onset (HP:0003577)',
      'Neonatal onset (HP:0003623)',
    ],
  },
};