# Native Dialogs

This library uses the
native HTML `<dialog>` element, driven by Angular signals (`input()` /
`output()`) (instead of other heavier solutions such as `MatDialogRef`). 

## Two patterns

There are two ways a dialog gets shown in this codebase, depending on **who
owns the decision to show it**.

| | Template-gated | Service-driven |
|---|---|---|
| Triggered from | A parent component's template | Anywhere via DI (services, guards, other components) |
| Mounting mechanism | `@if` around the dialog's selector | `createComponent()` + `ApplicationRef.attachView()` |
| Result delivery | `output()` handled in the parent template | `Observable` returned from a service method |
| Use when | The dialog only ever opens in response to one specific parent's state | The dialog is opened from multiple call sites, or from non-component code |

---

## Pattern 1: Template-gated dialog

Use this when a single parent component owns the "should this dialog be open"
state as a signal, and only that parent ever opens it.

### Dialog component

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, input, output } from '@angular/core';

export interface ConstantColumnData {
  colIndex: number;
  columnName: string;
  constantValue: string;
}

@Component({
  selector: 'app-add-constant-column-dialog',
  standalone: true,
  templateUrl: './add-constant-column-dialog.component.html',
  styleUrls: ['./add-constant-column-dialog.component.scss'],
})
export class AddConstantColumnDialogComponent implements AfterViewInit {
  colindex = input.required<number>();
  closed = output<ConstantColumnData | null>();

  @ViewChild('dialogEl') dialogEl!: ElementRef<HTMLDialogElement>;

  columnName = '';
  constantValue = '';

  ngAfterViewInit() {
    this.dialogEl?.nativeElement.showModal();
  }

  onCancel(): void {
    this.dialogEl?.nativeElement.close();
    this.closed.emit(null);
  }

  onSave(): void {
    this.dialogEl?.nativeElement.close();
    this.closed.emit({
      colIndex: this.colindex(),
      columnName: this.columnName,
      constantValue: this.constantValue,
    });
  }
}
```

### Parent template

```html
@if (constantColumnIndex(); as colIdx) {
  <app-add-constant-column-dialog
    [colindex]="colIdx"
    (closed)="handleConstantColumn($event)"
  />
}
```

### Parent component

```typescript
constantColumnIndex = signal<number | null>(null);

handleConstantColumn(data: ConstantColumnData | null): void {
  if (data) {
    // apply the result
  }
  this.constantColumnIndex.set(null); // unmounts the dialog
}
```

> **Gotcha — falsy-zero trap:** if the value gating your `@if` can legitimately
> be `0` (e.g. a real column index), don't rely on truthiness. Use a nullable
> signal (`number | null`) and gate on `!== null`, as shown above — `@if (0)`
> is falsy and will silently fail to render.

> **Why `closed.emit()` runs *after* `dialog.close()`:** always call
> `nativeElement.close()` before emitting. If a consumer's handler resets the
> gating signal synchronously, you want the dialog's own close (and any close
> animation) to already be in flight rather than fighting with Angular
> tearing down the host element mid-transition.

---

## Pattern 2: Service-driven dialog

Use this when the dialog is opened from multiple places, or from code that
isn't a component template at all (a toolbar action, a menu, a keyboard
shortcut handler, etc). This is the direct native-`<dialog>` replacement for
`MatDialog.open(...).afterClosed()`.

### Dialog wrapper component

The wrapper owns the `<dialog>` element and exposes exactly one input and one
output — same signal-based shape as pattern 1, just without a parent template
to gate it:

```typescript
import { Component, ElementRef, afterNextRender, inject, input, output, viewChild } from '@angular/core';
import { HpoTwostepMiningComponent, NotificationService, HpoTwostepData, PolishedHpoAnnotation } from 'ng-hpo-uikit';

@Component({
  selector: 'app-hpo-dialog-wrapper',
  standalone: true,
  imports: [HpoTwostepMiningComponent],
  template: `
    <dialog #nativeDialog (close)="onNativeClose()" class="phenoboard-dialog hpo-mining-dialog">
      <lib-hpo-twostep-mining
        [config]="dialogData()"
        (curationComplete)="onCurationComplete($event)"
        (cancelled)="close()"
        (errorOccurred)="handleError($event)"
      />
    </dialog>
  `,
  styleUrl: './hpo-dialog-wrapper.component.scss',
})
export class HpoDialogWrapperComponent {
  dialogData = input.required<HpoTwostepData>();
  result = output<PolishedHpoAnnotation[] | undefined>();

  private notificationService = inject(NotificationService);
  private dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('nativeDialog');
  private emitted = false;
  private pendingResult?: PolishedHpoAnnotation[];

  constructor() {
    afterNextRender(() => {
      const modal = this.dialogEl().nativeElement;
      if (!modal.open) modal.showModal();
    });
  }

  onCurationComplete(annotations: PolishedHpoAnnotation[]): void {
    this.pendingResult = annotations;
    this.close();
  }

  /** Only entry point that should close the dialog — Esc and backdrop route here too. */
  close(): void {
    const modal = this.dialogEl().nativeElement;
    if (modal.open) modal.close();
  }

  /** Single emission point: fires for completion, cancel, Esc, and backdrop alike. */
  onNativeClose(): void {
    if (this.emitted) return;
    this.emitted = true;
    this.result.emit(this.pendingResult);
  }

  handleError(msg: string): void {
    this.notificationService.showError(msg);
  }
}
```

> **Why `ngOnInit`-timed `showModal()` isn't good enough here:** `afterNextRender`
> guarantees the `<dialog>` element actually exists in the DOM before we call
> `showModal()`. Since this component is mounted imperatively (see below)
> rather than through the normal template/CD cycle, `ngAfterViewInit` timing
> is less reliable than it is in Pattern 1 — `afterNextRender` is the safer
> choice for imperatively-created components.

> **Single emission point:** routing completion, cancellation, Esc, *and*
> backdrop click all through the native `close` event (`onNativeClose`) — rather
> than emitting directly from `onCancel()`/`onSave()`-style handlers — means
> there's exactly one place that can emit, guarded by the `emitted` flag. This
> avoids double-emission races between (for example) a Save button handler and
> the dialog's own `close` event firing a moment later.

### Service

Because this component has no parent template, something has to create it,
attach it to the app's dependency-injection tree, and mount it into the DOM
by hand. `createComponent()` + `ApplicationRef.attachView()` is Angular's
imperative equivalent of what `MatDialog.open()` used to do internally:

```typescript
import {
  Injectable, inject, EnvironmentInjector, ApplicationRef, createComponent,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HpoTwostepData, PolishedHpoAnnotation } from 'ng-hpo-uikit';
import { HpoDialogWrapperComponent } from '../util/hpo-dialog-wrapper/hpo-dialog-wrapper.component';

@Injectable({ providedIn: 'root' })
export class HpoMiningDialogService {
  private environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);

  openHpoTwoStepDialog(dialogData: HpoTwostepData): Observable<PolishedHpoAnnotation[] | undefined> {
    return new Observable((subscriber) => {
      const hostElement = document.createElement('div');
      document.body.appendChild(hostElement);

      const componentRef = createComponent(HpoDialogWrapperComponent, {
        environmentInjector: this.environmentInjector,
        hostElement,
      });

      componentRef.setInput('dialogData', dialogData);
      this.appRef.attachView(componentRef.hostView);

      const cleanup = () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        hostElement.remove();
      };

      const subscription = componentRef.instance.result.subscribe((value) => {
        subscriber.next(value);
        subscriber.complete();
        cleanup();
      });

      return () => {
        subscription.unsubscribe();
        cleanup();
      };
    });
  }
}
```

### Consuming it

```typescript
this.hpoMiningDialogService.openHpoTwoStepDialog(dialogData).subscribe((annotations) => {
  if (!annotations) return; // cancelled
  // apply result
});
```

> **`setInput()`, not property assignment:** `componentRef.instance.dialogData = ...`
> would bypass Angular's input-setter machinery (change detection wouldn't know
> the input changed). `componentRef.setInput('dialogData', dialogData)` is the
> only correct way to set a signal `input()` on an imperatively created
> component.

> **Always clean up the host view:** `attachView()` without a matching
> `detachView()` + `destroy()` + DOM-node removal leaks a detached view and a
> stray host `<div>` on every dialog open. The teardown function returned from
> the `Observable` constructor and the subscription callback both call
> `cleanup()` so this happens whether the dialog resolves normally or the
> subscriber unsubscribes early.

---

## Choosing between the two patterns

- **One call site, parent owns the "open" state as a signal** → template-gated
  (Pattern 1). Simpler; no manual `ApplicationRef` bookkeeping.
- **Multiple call sites, or opened from non-template code** → service-driven
  (Pattern 2).
- If a template-gated dialog later needs a second call site, don't duplicate
  the `@if` block — that's the signal it's time to move it to a service.

## Common pitfalls checklist

- [ ] Gating signal is `T | null`, not relying on truthiness (falsy-zero trap).
- [ ] `dialog.close()` is called before the `output()` emits.
- [ ] Exactly one code path can emit the `output()` — guard with a boolean flag
      if `close` fires from multiple triggers (Esc, backdrop, buttons).
- [ ] Service-mounted dialogs use `setInput()`, never direct property assignment.
- [ ] Service-mounted dialogs call `detachView()` + `destroy()` + remove the
      host element in every exit path, including early unsubscription.
- [ ] `showModal()` is called after the element is guaranteed to be in the DOM
      — `afterNextRender()` for imperatively-mounted components, `ngAfterViewInit`
      is fine for template-mounted ones.