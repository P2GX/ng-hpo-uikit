---
title: HpoTwostepMiningComponent
description: Two-step text mining and curation workflow for HPO phenotype annotation
---

# HpoTwostepMiningComponent

`HpoTwostepMiningComponent` drives a two-step workflow for turning free-text clinical
narrative into curated HPO annotations:

1. **Mining** — the user pastes clinical text; the host application runs it through a
   text-mining pipeline (e.g. `fenominal`) and returns a list of `FenominalSentence[]`.
2. **Polishing** — the mined sentences are shown for manual review, term correction,
   modifier assignment (onset, severity, laterality, etc.), and manual HPO term addition.

The component is **config-driven**: it has no knowledge of your backend, your IPC layer,
or whether it's hosted in a dialog. All app-specific behavior — mining, autocomplete,
hierarchy lookups, and available modifiers — is injected via a single `config` input.

```html
<lib-hpo-twostep-mining
  [config]="dialogData"
  (curationComplete)="dialogRef.close($event)"
  (cancelled)="dialogRef.close()"
  (errorOccurred)="handleError($event)">
</lib-hpo-twostep-mining>
```

## Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `config` | `HpoTwostepData` | Yes | Supplies all host-app callbacks. See [HpoTwostepData](#hpotwostepdata) below. |

## Outputs

| Output | Payload | Emitted when |
|---|---|---|
| `curationComplete` | `PolishedHpoAnnotation[]` | The user finishes polishing and clicks "save/finish". |
| `cancelled` | `void` | The user closes the workflow before completing it (Escape key or close button). |
| `errorOccurred` | `string` | An unrecoverable error occurs (e.g. available modifiers fail to load). |

The component itself has **no output for the mining step** — mining requests from the
child `hpo-mining-workspace` are handled internally, by calling `config().mineTextProvider(...)`
directly. The host application never sees an intermediate "mining requested" event.

## HpoTwostepData

The `config` input is a plain object implementing this interface:

```typescript
export interface HpoTwostepData {
  mineTextProvider: (text: string) => Promise<FenominalSentence[]>;
  hierarchyProvider: (termId: string) => Promise<HierarchyMapItem>;
  availableModifiers: () => Promise<HpoTermMinimal[]>;
  autocompleteProvider: (query: string) => Observable<OntologyMatch[]>;
}
```

| Property | Called by | Frequency | Notes |
|---|---|---|---|
| `mineTextProvider` | Component internally, on mining submit | Once per mining action | Should resolve with the parsed sentences or reject with an error; rejections are surfaced to the mining workspace's error UI. |
| `hierarchyProvider` | Polishing workspace, on-demand | Once per unique term, cached locally | Used to fetch parent/child terms when the user expands a term's hierarchy. |
| `availableModifiers` | Component internally, once on init | Once per dialog open | Resolved value is cached in a local signal and passed down as a plain array — **not** re-invoked on every render. |
| `autocompleteProvider` | Polishing workspace, per keystroke | Many times | Returns an `Observable`, not a `Promise`, since autocomplete needs cancellation/switchMap semantics. |

### Example: providing config from a host application

```typescript
import { HpoTwostepMiningComponent, HpoTwostepData } from 'ng-hpo-uikit';

const dialogData: HpoTwostepData = {
  mineTextProvider: (text: string) => this.configService.mineClinicalText(text),
  autocompleteProvider: (query: string) => this.performHpoAutocomplete(query),
  hierarchyProvider: (termId: string) => this.fetchHpoHierarchy(termId),
  availableModifiers: () => this.availableModifiers()
};

this.dialog.open(HpoDialogWrapperComponent, {
  width: '85vw',
  maxWidth: '1200px',
  height: '80vh',
  disableClose: true,
  data: dialogData
});
```

> Note: `mineTextProvider`, `autocompleteProvider`, and `hierarchyProvider` above are
> arrow-function class fields (e.g. `performHpoAutocomplete = (query: string) => {...}`).
> This matters — arrow-function fields capture `this` lexically at definition time, so a
> bare reference like `autocompleteProvider: this.performHpoAutocomplete` is safe. If any
> of these were ever converted to regular class *methods*, a bare reference would lose its
> `this` binding. Wrap in an arrow function at the call site if you're not sure
> (`(query) => this.performHpoAutocomplete(query)`), as shown for `mineTextProvider` above.

## Hosting in a Material Dialog

`HpoTwostepMiningComponent` has no dependency on `MatDialog` — it only reads from `config`
and emits its three outputs. To use it in a dialog, wrap it in a thin dialog component that
bridges `MAT_DIALOG_DATA` in and `MatDialogRef.close()` out:

```typescript
@Component({
  selector: 'app-hpo-dialog-wrapper',
  standalone: true,
  imports: [HpoTwostepMiningComponent],
  template: `
    <lib-hpo-twostep-mining
      [config]="dialogData"
      (curationComplete)="dialogRef.close($event)"
      (cancelled)="dialogRef.close()"
      (errorOccurred)="handleError($event)">
    </lib-hpo-twostep-mining>
  `
})
export class HpoDialogWrapperComponent {
  protected readonly dialogRef = inject(MatDialogRef<HpoDialogWrapperComponent>);
  protected readonly dialogData = inject<HpoTwostepData>(MAT_DIALOG_DATA);
  private notificationService = inject(NotificationService);

  handleError(msg: string) {
    this.notificationService.showError(msg);
  }
}
```

Because the component only depends on plain inputs/outputs, it can equally be embedded
inline in a page or side panel without a dialog at all — just bind `config` directly and
handle the three outputs however fits your layout.

## Common pitfalls

### `.bind()` in template event bindings does nothing

This is the most common way this component silently "does nothing" when a button is
clicked. Angular evaluates template event expressions as plain JS — `.bind()` only
**returns a new function**, it never calls it:

```html
<!-- ❌ Silently does nothing. Creates a bound function and discards it. -->
<hpo-mining-workspace (miningRequested)="handleMiningRequest.bind($event)">

<!-- ✅ Correct. Calls handleMiningRequest with the event payload. -->
<hpo-mining-workspace (miningRequested)="handleMiningRequest($event)">
```

There is no compile error and no runtime error — the event handler is simply never
invoked. If mining (or any other action in this component) appears to do nothing at all,
grep your templates for `.bind(`:

```bash
grep -rn "\.bind(" --include="*.html"
```

### Unhandled promise rejections fail silently

Any provider function in `HpoTwostepData` that rejects without a corresponding `.catch()`
downstream will fail with no visible error. In particular, `hierarchyProvider` calls inside
the polishing workspace are easy to leave unhandled — always attach a `.catch()` that
routes to `errorOccurred` or a notification service, rather than assuming the promise will
always resolve.

### `availableModifiers` is a one-shot load, not a live provider

Unlike `hierarchyProvider` and `autocompleteProvider`, `availableModifiers()` is called
**once**, on initialization, and its resolved value is cached and passed down as a plain
array. If your host app's list of modifiers can change during a session, this component
will not pick up the change until it's re-initialized (e.g. dialog closed and reopened).
