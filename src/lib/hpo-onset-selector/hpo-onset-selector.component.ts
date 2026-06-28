import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-hpo-onset-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hpo-onset-selector.component.html',
  styleUrls: ['./hpo-onset-selector.component.scss']
})
export class HpoOnsetSelectorComponent {
  selectedOnset = model<string | undefined>();
  availableOnsets = input.required<string[]>();
  
  requestNewOnset = output<void>();
  onsetChanged = output<string>();

  onOnsetSelect(value: string): void {
    this.selectedOnset.set(value);
    this.onsetChanged.emit(value);
  }
}