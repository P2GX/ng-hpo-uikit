import { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { HpoMiningComponent } from './hpo-mining.component';
import { mockFenominalSuccessResponse } from './hpo-mining.mocks';

const meta: Meta<HpoMiningComponent> = {
  title: 'HPO/HpoMiningComponent',
  component: HpoMiningComponent,
  args: {
    success: fn(),
    error: fn(),
    cancel: fn(),
    miningRequested: fn()
  }
};
export default meta;

type Story = StoryObj<HpoMiningComponent>;

export const Default: Story = {
  args: { pastedText: '' }
};

export const InteractiveMiningSimulation: Story = {
  render: (args) => ({
    props: {
      ...args,
      pastedText: 'The patient exhibits arachnodactyly.',
      // Explicitly hook up the handler to receive the event payload object
      onMiningRequested: (event: any) => {
        console.log('Storybook backend worker running text mining simulation...');
        setTimeout(() => {
          // Fire your mock data callback function
          event.callback(mockFenominalSuccessResponse);
          console.log('Storybook simulation completed successfully!');
        }, 1500); // Increased slightly so you can visually see the button state change!
      }
    },
    template: `
      <hpo-mining-workspace
        [pastedText]="pastedText"
        (miningRequested)="onMiningRequested($event)"
        (success)="success($event)"
        (cancel)="cancel()">
      </hpo-mining-workspace>
    `
  })
};