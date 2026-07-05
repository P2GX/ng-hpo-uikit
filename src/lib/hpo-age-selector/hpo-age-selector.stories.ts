import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HpoAgeSelectorDialogComponent } from './hpo-age-selector-dialog.component';

const meta: Meta<HpoAgeSelectorDialogComponent> = {
  title: 'HPO/AgeSelector',
  component: HpoAgeSelectorDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        provideAnimations() // Smooth dropdown and material overlay animations
      ]
    }),
    // Simulates the physical boundaries of a Material Dialog box frame
    (story) => ({
      ...story(),
      template: `
        <div style="max-width: 440px; margin: 2rem auto; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); background: #fff; overflow: hidden;">
          ${story().template}
        </div>
      `
    })
  ],
  argTypes: {
    existingAgeStrings: {
      control: 'object',
      description: 'Quick-select history tags displaying ages already chosen in this session',
    },
    allAvailableTerms: {
      control: 'object',
      description: 'The master list of valid HPO/ISO age strings used for filtering autocomplete matches',
    },
    hasError: {
      control: 'boolean',
      description: 'Triggers the compact, dynamic inline validation error text below the input field',
    },
    selectTerm: { action: 'selectTerm (Existing Chosen)' },
    createCustomTerm: { action: 'createCustomTerm (New Created)' },
    cancel: { action: 'cancel clicked' }
  }
};

export default meta;
type Story = StoryObj<HpoAgeSelectorDialogComponent>;

// Scenario 1: Standard view showing active history items and full autocomplete strings
export const Default: Story = {
  args: {
    existingAgeStrings: ['P1Y', 'P3M', 'G20w', 'P45Y'],
    allAvailableTerms: [
      'P1Y', 'P2Y', 'P3Y', 'P5Y', 'P10Y', 'P15Y', 'P20Y', 'P35Y', 'P45Y',
      'P1M', 'P2M', 'P3M', 'P6M',
      'G20w', 'G24w', 'G36w', 'G40w'
    ],
    hasError: false
  }
};

// Scenario 2: Fresh view with no historical chips, hiding the upper slot partition entirely
export const NoHistoryTags: Story = {
  args: {
    existingAgeStrings: [],
    allAvailableTerms: ['P1Y', 'P5Y', 'P10Y', 'G40w'],
    hasError: false
  }
};

// Scenario 3: Validation display verifying layout behavior with error messages active
export const ValidationErrorState: Story = {
  args: {
    ...Default.args,
    hasError: true
  }
};