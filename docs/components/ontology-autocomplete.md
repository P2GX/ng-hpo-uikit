# Ontology Autocomplete (hpo-ontology-autocomplete)

The `OntologyAutocompleteComponent` is a lightweight lookup widget built with plain HTML/CSS. 

## Summary

The intended use case is to support an application in which a user enters a desired ontology term, and the application responds by providing suggested 
matches after the user has entered at least 3 characters. When the user picks a suggestion (or confirms it, in two-step mode), the autocomplete component 
emits an `OntologyMatch` data structure (with information about the Ontology Term ID, label, and the original matched text) through the `selected` output.


It supports both instant selection and an optional two-step confirmation flow.

Searches are debounced by 300 ms, and keyboard use (arrow keys, Enter, Escape) is supported.

## Requirements from the host app

1. Supply an `autocompleteProvider` ((query: string) => Observable<OntologyMatch[]>). It’s the only required input apart from requireConfirmation.
2. If the search fails, the provider should show the error and return an empty list (Otherwise, if the error escapes the provider, the widget stops searching until the page reloads.) Returning `of([])` (an observable that emits one empty list and completes) tells the component "no suggestions at this time". 

```typescript
hpoSearcher = (query: string) =>
  from(invokeBackend(query)).pipe(
    catchError(err => {
      this.notificationService.showError(String(err)); // tell the user
      return of([]);                                   // "no suggestions"
    })
  );
```

The example uses the [NotificationService](./notification-service.md) of this library.




## Fenominal

We suggest that client code use our [fenominal](https://github.com/P2GX/fenominal) library that provides this autocomplete functionality. See the [Rust API](https://p2gx.github.io/fenominal/guide/rust-api.html) documentation for details.




## Usage snippet
todo 


## Inputs 
The host application provides the following inputs.

| Input Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `autocompleteProvider` | `(query: string) => Observable<OntologyMatch[]>` | **Required** | A function that receives the text typed so far and returns an `Observable<OntologyMatch[]>` of suggestions. See Requirements for error handling. |
| `placeholder` | `string` | `'Search ontology term...'` | The placeholder string displayed inside the text input box. |
| `inputString` | `string` | `''` | Initial or programmatic text value to seed into the input control field. Changing this triggers an immediate focus and select text animation. |
| `requireConfirmation` | `boolean`|  **Required** | If true, adds a dedicated "Confirm" button step instead of emitting the value instantly upon dropdown selection. |
| `confirmPosition` | 'right'\|'bottom' | 'right' | position of the confirm button |
|`popupMenuDirection`| 'up' \| 'down'	|'up' | Determines if the popup menu goes up or down from the autocomplete field. |

## Outputs 

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `selected` | emits `OntologyMatch` | Emitted when the user picks a suggestion (by clicking it or pressing Enter) or, in two-step mode, presses Confirm. The payload is the chosen `OntologyMatch`.`. |


## Link to Storybook

OLD FROM HERE ON, CAN BE DELETED

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


## Styling

No global stylesheet is required; the component carries its own styles.

To match your app's look, set this CSS variable on the component or a parent element:

| Variable | Default | Used for |
| :--- | :--- | :--- |
| `--border-color` | `#ccc` | Borders of the input and the dropdown |
