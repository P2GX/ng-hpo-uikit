import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  OrcidDialogComponent,
  OrcidDialogData
} from './orcid-dialog.component';
import { within } from '@storybook/test';

const meta: Meta<OrcidDialogComponent> = {
  title: 'Dialogs/ORCID Dialog',
  component: OrcidDialogComponent,
  decorators: [
    moduleMetadata({
        imports: [OrcidDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (...args: unknown[]) => console.log('Dialog closed', args)
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            currentOrcid: ''
          } 
        }
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<OrcidDialogComponent>;

export const MissingOrcid: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            currentOrcid: 'na'
          }
        }
      ]
    })
  ],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText(
      '0000-0000-0000-0000'
    ) as HTMLInputElement;

    // This makes Angular Material consider the control "touched"
    input.focus();
    input.blur();
  }
};