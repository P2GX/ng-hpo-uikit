import { Component, input, output } from "@angular/core";
import { HpoTermDuplet } from "../models/hpo-annotation-models"

@Component({
  selector: 'app-modifier-selector',
  standalone: true,
  template: `
    <div class="modifier-menu">
       @for (mod of availableModifiers(); track mod.hpoId) {
         <button (click)="select(mod)">{{ mod.hpoLabel }}</button>
       }
       <button (click)="close.emit()">Done</button>
    </div>
  `
})
export class ModifierSelectorComponent {
  availableModifiers = input.required<HpoTermDuplet[]>();
  selectedModifiers = input.required<HpoTermDuplet[]>();
  selectionChanged = output<HpoTermDuplet[]>();
  close = output<void>();
  
  select(mod: HpoTermDuplet) { /* update logic */ }
}