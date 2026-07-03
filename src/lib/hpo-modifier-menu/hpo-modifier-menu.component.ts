import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ModifierOption {
  id: string;
  label: string;
}

@Component({
  selector: 'hpo-modifier-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hpo-modifier-menu.component.html',
  styleUrls: ['./hpo-modifier-menu.component.scss']
})
export class HpoModifierMenuComponent {
  // Inputs & Models using modern Signal APIs
  availableModifiers = input.required<ModifierOption[]>();
  selectedModifierIds = model<string[]>([]);

  // Outputs
  modifierToggled = output<{ id: string; selected: boolean }>();
  menuClosed = output<void>();

  /**
   * Checks if a given modifier ID is currently selected
   */
  isModifierSelected(id: string): boolean {
    return this.selectedModifierIds().includes(id);
  }

  /**
   * Handles the selection change from a checkbox/toggle item
   */
  onToggleModifier(id: string, isChecked: boolean): void {
    const currentIds = this.selectedModifierIds();
    let updatedIds: string[];

    if (isChecked) {
      updatedIds = [...currentIds, id];
    } else {
      updatedIds = currentIds.filter(item => item !== id);
    }

    // Update the model signal (triggers two-way binding)
    this.selectedModifierIds.set(updatedIds);

    // Emit granular change event
    this.modifierToggled.emit({ id, selected: isChecked });
  }

  /**
   * Action to close the menu panel (e.g., clicking a 'Done' button or blur)
   */
  closeMenu(): void {
    this.menuClosed.emit();
  }
}