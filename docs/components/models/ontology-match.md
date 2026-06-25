# Models: OntologyMatch

The data pipeline for generic lookup widgets relies entirely on the structural definition of the `OntologyMatch` contract.

## Interface Specifications

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | The global unique namespace prefix id (e.g., `HP:0000118`). |
| `label` | `string` | The default, fully authorized term name. |
| `matchedText` | `string` | The matched token string (useful for highlighting matched synonyms). |

## Integration with Components

When creating an autocomplete query, your search function must map the response payload from the backend into an array of `OntologyMatch[]`.

```typescript
// Example: Mapping your custom backend schema to the library model
import { OntologyMatch } from 'ng-hpo-uikit';

searchProvider = (query: string): Observable<OntologyMatch[]> => {
  return this.http.get<MyBackendSchema[]>(`/api/search?q=${query}`).pipe(
    map(results => results.map(item => ({
      id: item.termId,
      label: item.name,
      matchedText: item.matchedSynonym || item.name
    })))
  );
};
```
