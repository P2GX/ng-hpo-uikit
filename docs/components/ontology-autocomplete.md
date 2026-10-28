# Ontology Autocomplete (hpo-ontology-autocomplete)

The `OntologyAutocompleteComponent` is a lightweight lookup widget built with plain HTML/CSS. 

## Summary

The intended use case is to support an application in which a user enters a desired ontology term, and the application responds by providing suggested 
matches after the user has entered at least 3 characters. When the user picks a suggestion (or confirms it, in two-step mode), the autocomplete component 
emits an `OntologyMatch` data structure (with information about the Ontology Term ID, label, and the original matched text) through the `selected` output.


It supports both instant selection and an optional two-step confirmation flow.

Searches are debounced by 300 ms, and keyboard use (arrow keys, Enter, Escape) is supported.

## Requirements from the host app

1. Supply an `autocompleteProvider` (`(query: string) => Observable<OntologyMatch[]>`). It’s the only required input apart from requireConfirmation.
2. If the search fails, the provider should show the error and return an empty list (Otherwise, if the error escapes the provider, the widget breaks until the page reloads.) Returning `of([])` (an observable that emits one empty list and completes) tells the component "no suggestions at this time". 

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


## Usage

```html
<hpo-ontology-autocomplete
  [autocompleteProvider]="autocompleteProvider"
  [requireConfirmation]="true"
  popupMenuDirection="down"
  (selected)="onTermSelected($event)" />
```

```typescript
import { OntologyAutocompleteComponent, OntologyAutocompleteProvider, OntologyMatch } from 'ng-hpo-uikit';
import { catchError, of } from 'rxjs';

autocompleteProvider: OntologyAutocompleteProvider = (query) =>
  this.backend.autocomplete(query).pipe(catchError(() => of([])));

onTermSelected(match: OntologyMatch) { /* … */ }
```

Remember to add OntologyAutocompleteComponent to the component’s imports.



## Inputs 
The host application provides the following inputs.

| Input Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `autocompleteProvider` | `(query: string) => Observable<OntologyMatch[]>` | **Required** | A function that receives the text typed so far and returns an `Observable<OntologyMatch[]>` of suggestions. See Requirements for error handling. |
| `placeholder` | `string` | `'Search ontology term...'` | The placeholder string displayed inside the text input box. |
| `inputString` | `string` | `''` | Initial or programmatic text value to seed into the input control field. Changing this focuses the input and selects its text. Setting it to an empty string clears the widget.|
| `requireConfirmation` | `boolean`|  **Required** | If true, adds a dedicated "Confirm" button step instead of emitting the value instantly upon dropdown selection. |
| `confirmPosition` | `'right' \| 'bottom'` | `right` | Position of the confirm button |
|`popupMenuDirection`| `'up' \| 'down'`	| `up` | Determines if the popup menu goes up or down from the autocomplete field. |

## Outputs 

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `selected` | emits `OntologyMatch` | Emitted when the user picks a suggestion (by clicking it or pressing Enter) or, in two-step mode, presses Confirm. The payload is the chosen `OntologyMatch`. |


## Link to Storybook

Interactive examples: 
```bash
npm run storybook.
````


## Styling

No global stylesheet is required; the component carries its own styles.

To match your app's look, set this CSS variable on the component or a parent element:

| Variable | Default | Used for |
| :--- | :--- | :--- |
| `--border-color` | `#ccc` | Borders of the input and the dropdown |


