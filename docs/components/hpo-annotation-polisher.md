# HPO Annotation Polisher (app-hpo-annotation-polisher)

The `HpoAnnotationPolisherComponent` is a highly responsive, specialized table-row widget designed for curating, polishing, and updating Human Phenotype Ontology (HPO) clinical annotations. It enables clinicians and biocurators to modify clinical variance metrics—such as changing phenotypic visibility status, introducing onset intervals, applying clinical modifiers, or navigating local structural ontology hierarchies—directly within data table layouts.

It leverages Angular two-way model signal bindings to provide instantaneous local UI updates while exposing functional hooks for upstream state management synchronizations.

---

## Data Model Specifications

The widget interacts with core ontological and annotation schemas. It expects data models to conform to the following architectural contracts:

```typescript
export interface PolishedHpoAnnotation {
  termId: string;
  label: string;
  isObserved: boolean;
  onsetString?: string;
  modifiers?: string[];
}

export interface HpoTermMinimal {
  termId: string;
  label: string;
}

export interface HierarchyMapItem {
  parents: HpoTermMinimal[];
  children: HpoTermMinimal[];
}
```

## API Reference

### Component Selector

Because the component is configured as an attribute selector to prevent breaking strict native HTML table structures, it must be declared on a `<tr>` node:

### Inputs & Models (Signal Architecture)

| Property Name | Binding Type | Data Type | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `annotation` | `model.required` | `PolishedHpoAnnotation` | **Required** | Two-way bindable core data object representing the current state of the HPO phenotypic record. Modifying data fields updates this signal value locally. |
| `hierarchy` | `input` | `HierarchyMapItem \| null` | `null` | A structural hierarchy map containing immediate parent and child terms used to populate the local structural navigation dropdown menu. |
| `availableOnsets` | `input` | `string[]` | `[]` | Array of authorized HPO clinical onset strings (e.g., *Infantile onset*) populated into the selection control list. |
| `availableModifiers` | `input` | `string[]` | `[]` | Array of authorized HPO clinical modifier tokens (e.g., *Severe*, *Mild*) available for tagging attributes. |


### Outputs

### Outputs (`output`)

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `annotationChange` | `output<PolishedHpoAnnotation>` | Automatically emitted by the framework whenever the internal `annotation` model state changes. Essential for native `[(annotation)]` two-way bindings. |
| `updated` | `output<PolishedHpoAnnotation>` | Explicitly emits the updated `PolishedHpoAnnotation` state payload when modifications (toggles, onset swaps, term changes, or modifier changes) are finalized by the user. |
| `deleteRequested` | `output<void>` | Emits an unparameterized signal event whenever the curator explicitly clicks the row's delete button action. |
| `termClick` | `output<string>` | Emits the target HPO `termId` string whenever the primary term identifier link is selected. |

## Implementation Examples

1. Two-Way State Binding Integration

To embed the polisher row component inside a standard tabular layout using the native [(annotation)] model tracking pattern:

```html
<div class="table-container">
  <table class="phenotype-table">
    <thead>
      <tr>
        <th>HPO ID</th>
        <th>Phenotype Term Label</th>
        <th>Status</th>
        <th>Onset Age</th>
        <th>Clinical Modifiers</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      @for (item of annotations(); track item.termId; let idx = $index) {
        <tr 
          hpo-polisher-row
          [annotation]="item"
          [availableOnsets]="ageTerms()"
          [availableModifiers]="modifierTerms()"
          (updated)="handleRowUpdate($event, idx)"
          (deleteRequested)="handleRowDelete(idx)"
          (createOnsetRequested)="openNewOnsetModal()">
        </tr>
      } @empty {
        <tr>
          <td colspan="6" class="empty-state">
            No phenotype annotations added yet.
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

and

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpoPolisherRowComponent } from './hpo-polisher-row.component'; // Your row component

// Define a strict structure for your annotation data
export interface PhenotypeAnnotation {
  termId: string;
  label: string;
  isObserved: boolean;
  onsetString?: string;
  modifiers?: string[];
}

@Component({
  selector: 'app-phenotype-manager',
  standalone: true,
  imports: [CommonModule, HpoPolisherRowComponent],
  templateUrl: './phenotype-manager.component.html',
  styleUrls: ['./phenotype-manager.component.scss']
})
export class PhenotypeManagerComponent {
  // Master state tracking the active list of phenotypes in the app
  annotations = signal<PhenotypeAnnotation[]>([
    { 
      termId: 'HP:0000175', 
      label: 'Cleft palate', 
      isObserved: true, 
      onsetString: 'Congenital onset', 
      modifiers: ['Severe'] 
    },
    { 
      termId: 'HP:0001249', 
      label: 'Intellectual disability', 
      isObserved: true, 
      onsetString: 'Infantile onset', 
      modifiers: [] 
    }
  ]);

  // Master lookup data passed down to selectors
  ageTerms = signal<string[]>(['Antenatal onset', 'Congenital onset', 'Infantile onset', 'Juvenile onset']);
  modifierTerms = signal<string[]>(['Mild', 'Moderate', 'Severe', 'Unilateral', 'Bilateral']);

  /**
   * Handles saving a cloned, updated annotation back into the master state array
   */
  handleRowUpdate(updatedRow: PhenotypeAnnotation, index: number): void {
    this.annotations.update(currentList => {
      const newList = [...currentList];
      newList[index] = updatedRow;
      return newList;
    });
    console.log('Successfully saved row update to master state:', updatedRow);
  }

  /**
   * Handles row deletion
   */
  handleRowDelete(index: number): void {
    this.annotations.update(currentList => currentList.filter((_, i) => i !== index));
  }

  /**
   * Orchestrates launching a global dialog when a row requests a brand new onset term
   */
  openNewOnsetModal(): void {
    console.log('App Layer: Launching dialog/form to register a new HPO age term...');
    // e.g., this.dialog.open(CreateAgeTermModalComponent);
  }
}
```

## UX & Curatorial Features Built-In

* **Attribute-Targeted Layout Design:** Using selector: '[app-hpo-annotation-polisher]' allows the component to assume the structure of a standard HTML `<tr>` tag. This eliminates layout breaks caused by invalid tag nestings (like orphan custom components inside `<tbody>`).
* **Optimistic Local Rendering:** Mutating nested attributes—such as adding a clinical modifier or flipping the observed visibility state—triggers an immediate local model mutation signal update, guaranteeing sub-millisecond interface updates.
* **Inline Hierarchy Navigation Menu:** If a HierarchyMapItem dataset is provided, an interactive menu toggles inline, enabling quick upstream or downstream clinical precision shifts (e.g., swapping out an annotation to a parent term if data assertions are too broad) without leaving the row context.
* **Chip-Based Attribute Pruning:** Selected modifiers are displayed as inline badge chips equipped with immediate contextual deletion bounds for seamless attribute pruning.


## Retheming

If an application wants a different theme, simply override the variables from the stylesheet of this component.

```css
app-hpo-annotation-polisher {
  --green-bg: #bbf7d0; /* Custom emerald green theme override */
}
```
