# HpoPolishingWorkspaceComponent

The `HpoPolishingWorkspaceComponent` provides an interactive, terminal-grade curation workspace where clinicians review, refine, and validate Human Phenotype Ontology (HPO) terms extracted from unstructured clinical text. 

It splits complex text flows into interactive inline badges while managing an synchronized tabular view for modifying clinical attributes (onset, severity, modifiers, and presence status).

---

## Architectural Data Flow

The workspace coordinates an un-nested, unidirectional state loop:

[Input Text] ──> localSentences() ──(auto-computed)──> uniqueTableAnnotations()
│                                         │
(Inline Text Badges)                      (Curation Data Table)

1. **`localSentences` (Local State Buffer)**: The component holds isolated copies of text sentences broken into text or concept hit segments. All inline drag, drop, deletion, or injection workflows mutate this single source signal.
2. **`uniqueTableAnnotations` (Reactive Derivation)**: A computed signal automatically filters, groups, and transforms the raw structural hits from the sentences into a flat array of curation rows. No secondary state tracking or manual synchronization loops are required.

---

## Key Features

### 1. Fault-Tolerant Concept Moving
When a user moves a badge or modifies an underlying selection window, the component instantly demotes the targeted fragment into plain text. This ensures that if a backend NLP validator fails to find a structural concept for the new string selection, the old table row vanishes cleanly without leaving orphaned records or freezing the UI.

### 2. Manual Autocomplete Injection
Clinicians can look up non-extracted terms using an inline search box. Injecting a custom term inserts a synthetic tracking sentence envelope into the data stream, which automatically registers a fresh, curated row in the data table via the reactive pipeline.

---

## Component API

### Inputs & Outputs

| Binding | Type | Description |
| :--- | :--- | :--- |
| `[sentences]` | `Input<Sentence[]>` | **Required.** The collection of raw textual blocks and initialized NLP annotations from the backend analyzer. |
| `(save)` | `Output<CurationPayload>` | Emitted when the user commits finalized curation alterations. |
| `(cancel)` | `Output<void>` | Emitted when discarding current pending modifications. |

---

## Code Signature Documentation

```typescript
/**
 * @component HpoPolishingWorkspaceComponent
 * 
 * Orchestrates document layout text visualization alongside interactive HPO concept metadata tuning tables.
 */
@Component({
  selector: 'hpo-polishing-workspace',
  templateUrl: './hpo-polishing-workspace.component.html',
  styleUrls: ['./hpo-polishing-workspace.component.scss']
})
export class HpoPolishingWorkspaceComponent {
  
  /** Source collection tracking raw sentences and concept hits. */
  public sentences = input.required<Sentence[]>();

  /** Internal mutable signal buffer driving the document rendering engine. */
  protected localSentences = signal<Sentence[]>([]);

  /** Automatically maps live text edits into grouped table rows. */
  protected uniqueTableAnnotations = computed<PolishedHpoAnnotation[]>(() => 
    extractUniqueAnnotations(this.localSentences())
  );

  /**
   * Instantly demotes a hit segment back into standard text layout frames.
   * Clears old rows out of the data table while awaiting potential background NLP match resolution.
   */
  protected handleBadgeMoved(
    originalTermId: string, 
    textSnippet: string, 
    newSpan: { start: number; end: number }
  ): void;

  /**
   * Upgrades a plain text slice back into a rich HPO hit when background lookup loops yield a success.
   */
  public promoteTextToHit(
    newHit: FenominalHit, 
    targetSpan: { start: number; end: number }
  ): void;

  /**
   * Builds an augmented FenominalHit frame out of an explicit autocomplete selection.
   * Pushes a synthetic line into localSentences to instantly spin up a matching curation table entry.
   */
  protected injectManualHpoToken(): void;
}
```


::: info Performance Isolation
Because uniqueTableAnnotations is driven by a computed signal tracking local modifications, table row calculations, structural cleanups, and layout validation checks operate completely on the client side, bypassing redundant angular component change detection cycles.
:::