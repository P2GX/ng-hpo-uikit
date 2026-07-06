// hpo-modifier-dialog.component.ts
import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HpoModifierComponent } from './hpo-modifier.component';
import { HpoTermMinimal } from '../models/hpo-annotation-models';


export interface ModifierDialogData {
  availableModifiers: HpoTermMinimal[];
  selectedModifiers: HpoTermMinimal[];
}

export interface ModifierDialogResult {
  selectedModifiers: HpoTermMinimal[];
}

@Component({
  selector: 'hpo-modifier-dialog',
  standalone: true,
  imports: [MatDialogModule, HpoModifierComponent],
  template: `
    <div class="modifier-dialog-shell">
      <hpo-modifier
        [availableModifiers]="data.availableModifiers"
         [(selectedModifiers)]="currentSelection"
        (menuClosed)="onDone()"
      />
    </div>
  `
})
export class HpoModifierDialogComponent {
  private dialogRef = inject(MatDialogRef<HpoModifierDialogComponent, ModifierDialogResult>);
  protected data = inject<ModifierDialogData>(MAT_DIALOG_DATA);


  protected currentSelection = signal<HpoTermMinimal[]>(this.data.selectedModifiers);


  protected onDone(): void {
    this.dialogRef.close({ selectedModifiers: this.currentSelection() });
  }
}