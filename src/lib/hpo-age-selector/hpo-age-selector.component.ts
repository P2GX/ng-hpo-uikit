import { Component, input, output, ViewChild } from '@angular/core';
import { HpoAgeSelectorDialogComponent } from "./hpo-age-selector-dialog.component";


@Component({
  selector: 'hpo-age-selector',
  standalone: true,
  imports: [HpoAgeSelectorDialogComponent],
  templateUrl: './hpo-age-selector.component.html',
  styleUrls: ['./hpo-age-selector.component.scss']
})
export class HpoAgeSelectorComponent {
  @ViewChild(HpoAgeSelectorDialogComponent) dialogComponent!: HpoAgeSelectorDialogComponent;

  selectedOnset = input<string | null>(null);
  size = input<'normal' | 'small'>('normal');
  disabled = input(false);
  onsetChanged = output<string>();

  openSelectorDialog(): void {
    if (this.disabled()) return;
    this.dialogComponent.open();
  }

  onDialogSelected(result: string): void {
    if (result) {
      this.onsetChanged.emit(result);
    }
  }
}