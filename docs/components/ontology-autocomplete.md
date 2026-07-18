# Ontology Autocomplete (hpo-ontology-autocomplete)

The `OntologyAutocompleteComponent` is a lightweight, high-performance lookup widget built with plain HTML/CSS. 


It supports both instant selection and an optional two-step confirmation flow.


## Backend Integration

The widget expects all option suggestions to implement the [OntologyMatch](./models/ontology-match.md) contract.

This component relies on a backend (e.g., a Rust-based autocompleter via Tauri invokes) transformed into an Observable stream:
```typescript
protected performHpoAutocomplete(query: string): Observable<OntologyMatch[]> {
  return from(this.configService.performHpoAutocomplete(query)).pipe(
    catchError(err => {
      this.notificationService.showError(String(err));
      return of([]); // Fail gracefully with empty results
    })
  );
}
```


This can then be passed to the component with this definition
```typescript
autocompleteProvider: (query: string) => Observable<OntologyMatch[]>;
```


In our applications, this is implemented using [fenominal](https://github.com/P2GX/fenominal).
 
```rust
 pub fn perform_hpo_autocomplete(&self, query: String) -> Result<Vec<OntologyMatch>, String> {
        let autocompleter = self.autocompleter.as_ref().ok_or_else(|| "Autocomplete not initialized".to_string())?;
        let n_term_limit = 20;
        Ok(autocompleter.search_hpo(&query, n_term_limit))
    }
```



then in our component, we need to transform this into observables:


## Implementation Examples

1. Simple Integration (Instant Selection)
```html
 <hpo-ontology-autocomplete
  placeholder="Search clinical phenotypes (e.g., Seizures)..."
  [autocompleteProvider]="hpoSearcher"
  (selected)="onHpoTermSelected($event)" />
}
```
with 
```typescript
import { Component, inject } from '@angular/core';
import { ConfigService, OntologyMatch } from 'ng-hpo-uikit';

@Component({
  selector: 'app-setup-view',
  standalone: true,
  imports: [OntologyAutocompleteComponent],
  templateUrl: './setup-view.component.html'
})
export class SetupViewComponent {
  private configService = inject(ConfigService);

  // Preserve lexical 'this' context using an arrow function
  hpoSearcher = (query: string) => this.performHpoAutocomplete(query);

  onHpoTermSelected(term: OntologyMatch) {
    console.log('Selected term:', term);
  }
}
```

## 2. Two-Step Confirmation Workflow

Use this mode when you want to guard selections with an explicit confirmation action before committing changes to the parent workspace state.

```html
<hpo-ontology-autocomplete
  [autocompleteProvider]="hpoSearcher"
  [requireConfirmation]="true"
  (selected)="addTermToWorkspace($event)">
</hpo-ontology-autocomplete>
```




## API Reference

Component Selector

```typescript
<hpo-ontology-autocomplete />
```

### Inputs (Signal Inputs)

| Input Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | `string` | `'Search ontology term...'` | The placeholder string displayed inside the text input box. |
| `inputString` | `string` | `''` | Initial or programmatic text value to seed into the input control field. Changing this triggers an immediate focus and select text animation. |
| `autocompleteProvider` | `(query: string) => Observable<OntologyMatch[]>` | **Required** | A closure callback function executing your custom backend network request filter payload. |
| `requireConfirmation` | `boolean`|  `false` | If true, adds a dedicated "Confirm" button step instead of emitting the value instantly upon dropdown selection. |

### Outputs (`output`)

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `selected` | `EventEmitter<OntologyMatch>` | Emits the complete `OntologyMatch` data object whenever a user explicitly clicks on a term from the autocomplete dropdown list. |

