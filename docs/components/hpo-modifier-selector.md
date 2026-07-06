## HpoModifierComponent

The `HpoModifierComponent` provides a unified interface for selecting and assigning clinical modifiers (such as severity, laterality, or specific course descriptors) to an HPO term. It combines a quick-select severity shortcut row with a searchable autocomplete, and binds directly to full `HpoTermMinimal` objects (not bare ID strings).

## Connecting to backend

This module requires as input a list of all HPO Modifier terms. This can be obtained using
the `ga4ghphetools` library as follows
```rust
 pub fn get_modifiers(&self) -> Result<Vec<HpoTermDuplet>, String> {
    let hpo = self.hpo.as_ref().ok_or_else(|| "HPO not initialized".to_string())?;
    ga4ghphetools::hpo::get_modifiers(hpo.clone())
}
```

The `HpoTermDuplet` is defined as follows:
```rust
/// A structure to represent an HPO term (id and label) in a simple way
#[derive(Clone, Debug, Default, Hash, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HpoTermDuplet {
    pub hpo_label: String,
    pub hpo_id: String,
}
```

The API of the library requires a slightly different interface
```typescript
export interface HpoTermMinimal {
  termId: string;
  label: string;
}
```

Therefore, the service layer should use code something like this:
```rust
/// format matching the TypeScript `HpoTermMinimal` interface in ng-hpo-uikit.
#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HpoTermMinimalDto {
    pub term_id: String,
    pub label: String,
}

impl From<HpoTermDuplet> for HpoTermMinimalDto {
    fn from(d: HpoTermDuplet) -> Self {
        HpoTermMinimalDto {
            term_id: d.hpo_id,
            label: d.hpo_label,
        }
    }
}

#[tauri::command]
async fn get_hpo_modifiers(
    state: tauri::State<'_, Arc<AppState>>
) -> Result<Vec<HpoTermMinimalDto>, String> {
    let singleton = state.phenoblendtk.lock()
        .map_err(|_| "Failed to lock state".to_string())?;
    let duplets = singleton.get_modifiers()?;

    Ok(duplets.into_iter().map(HpoTermMinimalDto::from).collect())
}
```



## API Reference

### Inputs & Models

| Property | Type | Binding Type | Description |
| :--- | :--- | :--- | :--- |
| `availableModifiers` | `HpoTermMinimal[]` | `input.required` | **Required.** Array of available modifier objects (containing IDs and labels) fetched from your cached ontology service. |
| `selectedModifiers` | `HpoTermMinimal[]` | `model` | **Two-way bindable.** An array of the currently selected clinical modifier IDs. |


### Outputs

| Event | Payload | Description |
| :--- | :--- | :--- |
| `modifierToggled` | `{ modifier: HpoTermMinimal, selected: boolean }` |  Emits whenever a modifier is added or removed, via quick-select, autocomplete selection, or chip removal.  |
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
      <hpo-modifier
        [(selectedModifierIds)]="activeModifiers"
        [availableModifiers]="modifierList()"
        (modifierToggled)="onModifierToggle($event)">
      </hpo-modifier>
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

> **Note on hosting in a dialog:** if you present this component inside a
> `MatDialog`, wire `menuClosed` to close the dialog with the current selection
> (see `HpoModifierDialogComponent` for the reference pattern) — this component
> does not manage its own dialog lifecycle or dismiss-on-outside-click behavior.