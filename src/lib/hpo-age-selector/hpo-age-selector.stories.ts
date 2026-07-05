import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HpoAgeSelectorDialogComponent } from './hpo-age-selector-dialog.component';
import { AgeService } from '../services/age_service';
import { NotificationService } from '../services/notification.service';

// Mock implementations for the injected services


const mockNotificationService = {
  showError: (message: string) => alert(`Notification Error: ${message}`)
};

const mockDialogRef = {
  close: (value?: any) => alert(`Dialog closed with value: ${value}`)
};

const meta: Meta<HpoAgeSelectorDialogComponent> = {
  title: 'Components/HpoAgeSelectorDialog',
  component: HpoAgeSelectorDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule], // Required for Material animations
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AgeService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: MAT_DIALOG_DATA, useValue: { currentSelection: null } }
      ]
    })
  ],
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<HpoAgeSelectorDialogComponent>;

// Scenario 1: Default view with no pre-existing selection
export const Default: Story = {};

// Scenario 2: View initialized with an existing selection
export const WithPreFilledSelection: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { currentSelection: 'G32w' } },
         { provide: AgeService },
      ]
    })
  ]
};

// Scenario 3: Empty state when no quick-cloud tags are available
export const NoExistingTerms: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { 
          provide: AgeService, 
        }
      ]
    })
  ]
};