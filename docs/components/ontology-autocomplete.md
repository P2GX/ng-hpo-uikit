# Ontology Autocomplete (hpo-ontology-autocomplete)
The OntologyAutocompleteComponent is a highly reusable, accessible, and generic lookup widget designed to fetch and display search term selections from any medical or biological ontology schema (e.g., Human Phenotype Ontology, Gene Ontology).

It decouples the UI layer from your application services by using a dynamic search provider input stream.

## Data Model Specifications

The widget expects all option suggestions to implement the [OntologyMatch](./models/ontology-match.md) contract.

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
| `searchProvider` | `(query: string) => Observable<OntologyMatch[]>` | **Required** | A closure callback function executing your custom backend network request filter payload. |

### Outputs (`output`)

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `selected` | `EventEmitter<OntologyMatch>` | Emits the complete `OntologyMatch` data object whenever a user explicitly clicks on a term from the autocomplete dropdown list. |

### Implementation Examples

1. Simple Integration (Human Phenotype Ontology)

To integrate the component into your workspace layout view:

```html
<div class="search-section-card">
  <hpo-ontology-autocomplete
    placeholder="Search clinical phenotypes (e.g., Seizures)..."
    [searchProvider]="hpoSearcher"
    (selected)="onHpoTermSelected($event)" />
</div>
```

```typescript
import { Component, inject } from '@angular/core';
import { ConfigService, OntologyMatch } from 'ng-hpo-uikit';

@Component({
  selector: 'app-setup-view',
  templateUrl: './setup-view.component.html'
})
export class SetupViewComponent {
  private configService = inject(ConfigService);

  // Bind service execution to component context scope via lambda arrow functions
  hpoSearcher = (query: string) => this.configService.getAutocompleteHpo(query);

  onHpoTermSelected(term: OntologyMatch) {
    console.log('User selected ontology term payload:', term);
  }
}
```


### 2. Advanced Mapping Example (Gene Ontology)
If your underlying service endpoint handles custom backend schemas that do not match the exact OntologyMatch shape natively, map the reactive stream array pipe inside your custom handler:

```typescript
goSearcher = (query: string) => {
  return this.configService.fetchGeneOntologyTerms(query).pipe(
    map(backendHits => backendHits.map(hit => ({
      id: hit.accessionNumber,       // Map standard field 'accessionNumber' -> 'id'
      label: hit.name,               // Map standard field 'name' -> 'label'
      matchedText: hit.matchedText   // Match tracking token
    })))
  );
};
```

### UX Features Built-In

* **Debounced Inputs:** Out-of-the-box user input tracking is automatically debounced by $300\text{ms}$ before executing search streams to minimize unnecessary backend request overload.
* **Auto-Clear Action:** When text contains active value properties, an auxiliary clear icon (X) dynamically surfaces to allow easy form resets.
* **Smart Row Density:** Material Option heights automatically recalculate dynamically if a hit displays a secondary row showing a canonical label alternative.