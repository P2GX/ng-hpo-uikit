import { Component, input, output } from "@angular/core";
import { HpoTermMinimal } from "../models/hpo-annotation-models"

@Component({
  selector: 'app-modifier-selector',
  standalone: true,
  template: `
    <div class="modifier-menu">
       @for (mod of availableModifiers(); track mod.termId) {
         <button (click)="select(mod)">{{ mod.label }}</button>
       }
       <button (click)="close.emit()">Done</button>
    </div>
  `
})
export class ModifierSelectorComponent {
  availableModifiers = input.required<HpoTermMinimal[]>();
  selectedModifiers = input.required<HpoTermMinimal[]>();
  selectionChanged = output<HpoTermMinimal[]>();
  close = output<void>();
  
  select(mod: HpoTermMinimal) { /* update logic */ }
}