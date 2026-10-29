import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, fn } from 'storybook/test';
import { OrcidDialogComponent } from './orcid-dialog.component';



const meta: Meta<OrcidDialogComponent> = {
  title: 'Dialogs/ORCID Dialog',
  component: OrcidDialogComponent,
  tags: [ 'autodocs' ],
  args: {
    currentOrcid: '',
    // `fn()` records the emitted value (an ORCID string, or null on cancel).
    closed: fn(),
    },
};


export default meta;

type Story = StoryObj<OrcidDialogComponent>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: { currentOrcid: '0000-0000-0000-1234'},
};

/** A badly formatted entry shows an error after the field loses focus. */
export const InvalidFormat: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByPlaceholderText('0000-0000-0000-0000'), '1234');
    await userEvent.tab(); // moving focus away marks the field as touched
    await expect(await canvas.findByText('Invalid ORCID format')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Save' })).toBeDisabled();
  },
};

/** Typing a valid ORCID and pressing Save emits it. */
export const SaveValid: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByPlaceholderText('0000-0000-0000-0000'), '0000-0002-1825-0097');
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    await expect(args.closed).toHaveBeenCalledWith('0000-0002-1825-0097');
  },
};