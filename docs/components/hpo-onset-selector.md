# HpoOnsetSelectorComponent

The HpoOnsetSelectorComponent provides a standardized dropdown interface for selecting a Human Phenotype Ontology (HPO) onset age term. It also includes an action button to request the creation of a new age term if the desired option is missing from the available list.

## Features

* **Modern Angular Architecture:** Utilizes the latest Signal-based APIs (input.required, model, and output).
* **Two-Way Binding:** Supports direct model synchronization for the selected value.
* **Extensible Action:** Emits an event when users need to define a new age term externally.

## API Reference

### Inputs & Models

| Property | Type | Binding Type | Description |
| :--- | :--- | :--- | :--- |
| `availableOnsets` | `string[]` | `input.required` | **Required.** An array of HPO onset age strings to populate the dropdown options. |
| `selectedOnset` | `string \| undefined` | `model` | **Two-way bindable.** The currently selected onset age value. |

## Outputs

| Event | Payload | Description |
| :--- | :--- | :--- |
| `onsetChanged` | `string` | Emits the new value immediately when a user selects an option. |
| `requestNewOnset` | `void` | Emits when the user clicks the "+ New" button, signaling the parent component to open a creation modal or form. |

## Usage Example

1. Parent Component TypeScript

```typescript
import { Component, signal } from '@angular/core';
import { HpoOnsetSelectorComponent } from 'your-library-path';

@Component({
  selector: 'app-phenotype-editor',
  standalone: true,
  imports: [HpoOnsetSelectorComponent],
  template: `
    <lib-hpo-onset-selector
      [(selectedOnset)]="currentOnset"
      [availableOnsets]="ageOptions()"
      (onsetChanged)="handleOnsetChange($event)"
      (requestNewOnset)="openNewOnsetModal()">
    </lib-hpo-onset-selector>
  `
})
export class PhenotypeEditorComponent {
  // Available options passed down to the selector
  ageOptions = signal<string[]>([
    'Antenatal onset', 
    'Congenital onset', 
    'Infantile onset', 
    'Juvenile onset'
  ]);

  // Tracks selection with two-way binding
  currentOnset = signal<string | undefined>(undefined);

  handleOnsetChange(newValue: string) {
    console.log('Onset updated to:', newValue);
  }

  openNewOnsetModal() {
    console.log('User requested to create a new HPO age term.');
    // Trigger your modal/dialog logic here
  }
}
```

## HTML Structure & Styling Hooks

The template uses a flat, logical CSS class structure designed for flexible layout styling.


* **onset-select-container:** The outer wrapper.
* **onset-input-row:** A flex or grid container holding the dropdown and the action button side-by-side.
* **onset-select:** Applied directly to the HTML `<select>` element. Includes a hidden placeholder option (Select onset age...).
* **btn-add-onset:** Applied to the action button for easy theme targeting.