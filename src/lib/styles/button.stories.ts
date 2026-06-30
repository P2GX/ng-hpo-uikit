
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Design System/Buttons',
} as Meta;

export const Gallery: StoryObj = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center; padding: 24px;">
        <button class="btn-outline-primary">Run HPO Text Mining</button>
        <button class="btn-outline-cancel">Cancel</button>
        <button class="btn-outline-primary" disabled>Disabled State</button>
      </div>
    `,
  }),
};