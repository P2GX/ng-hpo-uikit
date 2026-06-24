# LoadOntologyComponent

The `LoadOntologyComponent` provides a unified, reusable layout interface for loading graphical data ontologies (such as HPO or GO) into application contexts. It manages loading states, success indicators, term-capacity counts, and deep documentation linking dynamically via internal template signals.

## API Summary

### Selector
```html
<ui-load-ontology></ui-load-ontology>
```

Import as

```typescript
import { LoadOntologyComponent } from 'ng-hpo-uikit';
```
 

### Inputs & Outputs

| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `title` | `Signal<string>` | **Yes** | Header text category mapping label (e.g., `"Ontology"`, `"Gene Ontology"`). |
| `label` | `Signal<string>` | **Yes** | Inline visual label applied to buttons and help links (e.g., `"HPO"`, `"GO"`). |
| `isLoading` | `Signal<boolean>` | **Yes** | Disables interactions and spins a progress spinner when evaluating files. |
| `isLoaded` | `Signal<boolean>` | **Yes** | Displays a success checkmark block and metadata tracking strings. |
| `statusMessage` | `Signal<string>` | **Yes** | Context-aware message text explaining current parser operations. |
| `termCount` | `Signal<number \| undefined>` | **No** | Number of total parsed hierarchical terms available upon a successful load. |
| `helpUrl` | `Signal<string>` | **No** | Override link to direct manual setup documentation. |
| `helpLines` | `Signal<string[]>` | **No** | Custom micro-instruction string paragraphs shown inside the popover layout. |
| `onLoad` | `Output<void>` | — | Fires a bubble event hook when the primary action button is clicked. |


## mplementation Context Examples

Standard Human Phenotype Ontology Setup

```html
<ui-load-ontology
  title="Ontology"
  label="HPO"
  [isLoading]="statusService.hpoLoading()"
  [isLoaded]="statusService.hpoLoaded()"
  [statusMessage]="hpoMessage()"
  [termCount]="statusService.state().nHpoTerms"
  helpUrl="[https://p2gx.github.io/phenoboard/help/start.html#load-the-hpo](https://p2gx.github.io/phenoboard/help/start.html#load-the-hpo)"
  [helpLines]="['Select the local hp.json file from your machine configuration storage directory.']"
  (onLoad)="loadHpo()">
</ui-load-ontology>
```


## Secondary Gene Ontology (GO) Setup Variant

```html
<ui-load-ontology
  title="Gene Functional Annotation"
  label="GO"
  [isLoading]="statusService.goLoading()"
  [isLoaded]="statusService.goLoaded()"
  [statusMessage]="goMessage()"
  [termCount]="statusService.state().nGoTerms"
  helpUrl="[https://p2gx.github.io/phenoboard/help/start.html#load-the-go](https://p2gx.github.io/phenoboard/help/start.html#load-the-go)"
  [helpLines]="['Select the go.json layout descriptor package file.']"
  (onLoad)="loadGo()">
</ui-load-ontology>
```

