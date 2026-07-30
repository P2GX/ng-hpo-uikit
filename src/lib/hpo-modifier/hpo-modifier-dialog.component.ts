import { Component, ElementRef, ViewChild, afterNextRender, input, output, signal } from '@angular/core';
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
  imports: [HpoModifierComponent],
  template: `
    <dialog #modifierDialogEl class="orcid-modal modifier-dialog-modal">
      <div class="modifier-dialog-shell">
        <hpo-modifier
          [availableModifiers]="data().availableModifiers"
          [(selectedModifiers)]="currentSelection"
          (menuClosed)="onDone()"
        />
      </div>
    </dialog>
  `,
  styleUrl: './hpo-modifier-dialog.component.scss',
})
export class HpoModifierDialogComponent {
  data = input.required<ModifierDialogData>();
  done = output<ModifierDialogResult>();

  protected currentSelection = signal<HpoTermMinimal[]>([]);

  @ViewChild('modifierDialogEl') dialogEl!: ElementRef<HTMLDialogElement>;

  constructor() {
    afterNextRender(() => {
      this.currentSelection.set(this.data().selectedModifiers);
      this.dialogEl?.nativeElement.showModal();
    });
  }

  protected onDone(): void {
    this.dialogEl?.nativeElement.close();
    this.done.emit({ selectedModifiers: this.currentSelection() });
  }
}