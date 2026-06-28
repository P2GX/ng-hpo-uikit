## HpoModifierMenuComponent

The HpoModifierMenuComponent provides a unified interface for selecting and assigning clinical modifiers (such as severity, laterality, or specific course descriptors) to an HPO term. It balances quick-select options with an optimized selection flow, ensuring data integrity by binding directly to unique clinical modifier IDs.

## Features
* **Modern Signal Architecture:** Built entirely on Angular's input, output, and model signals for reactive performance.
* **Decoupled & Fast:** Designed to pair with a singleton-cached modifier service for instant client-side filtering and lightning-fast local state updates.
* **Layout Safe:** Out-of-the-box styling configurations prevent common layout breakages when rendering inside tight spaces like a TableCellEditorComponent.

## API Reference

### Inputs & Models

| Property | Type | Binding Type | Description |
| :--- | :--- | :--- | :--- |
| `availableModifiers` | `Modifier[]` | `input.required` | **Required.** Array of available modifier objects (containing IDs and labels) fetched from your cached ontology service. |
| `selectedModifierIds` | `string[]` | `model` | **Two-way bindable.** An array of the currently selected clinical modifier IDs. |


### Outputs

| Event | Payload | Description |
| :--- | :--- | :--- |
| `modifierToggled` | `{ id: string, selected: boolean }` | Emits immediately whenever a specific modifier is checked, unchecked, or clicked. |
| `menuClosed` | `void` | Emits when the user clicks outside or clicks a confirmation action, indicating the state can be finalized. |

### Usage Example

1. Parent Component TypeScript


```typescript
import { Component, signal } from '@angular/core';
import { HpoModifierMenuComponent } from 'your-library-path';

interface Modifier {
  id: string;
  label: string;
}

@Component({
  selector: 'app-phenotype-table-editor',
  standalone: true,
  imports: [HpoModifierMenuComponent],
  template: `
    <div class="table-cell-editor">
      <lib-hpo-modifier-menu
        [(selectedModifierIds)]="activeModifiers"
        [availableModifiers]="modifierList()"
        (modifierToggled)="onModifierToggle($event)">
      </lib-hpo-modifier-menu>
    </div>
  `
})
export class TableCellEditorComponent {
  // Populated once via your HPO/Ontology caching service
  modifierList = signal<Modifier[]>([
    { id: 'HP:0012828', label: 'Severe' },
    { id: 'HP:0012826', label: 'Moderate' },
    { id: 'HP:0012832', label: 'Bilateral' },
    { id: 'HP:0012834', label: 'Right-sided' }
  ]);

  // Two-way bound state holding onto IDs for strict clinical data integrity
  activeModifiers = signal<string[]>([]);

  onModifierToggle(event: { id: string, selected: boolean }) {
    console.log(`Modifier ${event.id} selection state changed to: ${event.selected}`);
  }
}
```
