import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { expect, fn, waitFor } from 'storybook/test';
import { HpoAgeSelectorComponent } from './hpo-age-selector.component';
import { ToastContainerComponent } from '../toast-container/toast-container.component';

const meta: Meta<HpoAgeSelectorComponent> = {
  title: 'Components/Age Selector',
  component: HpoAgeSelectorComponent,
  tags: ['autodocs'],
  decorators: [
    // Error messages are shown by the toast container, so include it.
    moduleMetadata({ imports: [ToastContainerComponent] }),
    componentWrapperDecorator(story => `<div style="padding: 1rem;">${story}<app-toast-container /></div>`),
  ],
  args: {
    selectedOnset: null,
    size: 'normal',
    disabled: false,
    onsetChanged: fn(),
  },
};

export default meta;
type Story = StoryObj<HpoAgeSelectorComponent>;

/** Nothing selected yet: click "+Add Age of Onset" to open the dialog. */
export const Empty: Story = {};

/** An age is already set and is shown on the button. */
export const WithSelection: Story = {
  args: { selectedOnset: 'Infantile onset' },
};

/** Small size, as used in table rows. */
export const Small: Story = {
  args: { size: 'small', selectedOnset: 'P3Y' },
};

/** Disabled: the button cannot open the dialog. */
export const Disabled: Story = {
  args: { disabled: true, selectedOnset: 'P3Y' },
};

/** click the button, type 'P1Y' in the textbox, press "Use", and assert onsetChanged. */
export const EnterCustomAge: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Add Age of Onset/ }));
    await userEvent.type(canvas.getByRole('textbox'), 'p1y');
    await userEvent.click(canvas.getByRole('button', { name: 'Use' }));
    await expect(args.onsetChanged).toHaveBeenCalledTimes(1);
    await expect(args.onsetChanged).toHaveBeenCalledWith('P1Y');
  },
};