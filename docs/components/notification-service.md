# Notification Service

`NotificationService` provides a simple, app-wide API for showing transient
status messages — errors, successes, and warnings — without any component
needing to manage its own toast state or UI.

It replaces the old `MatSnackBar`-based implementation as part of the
library's migration away from Angular Material. Toasts now render via the
native [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
rather than a CDK overlay, which means they render correctly in the
browser's **top layer** — the same layer used by native `<dialog>` elements
opened with `showModal()`. This matters in Tauri/desktop contexts especially:
a CDK-overlay-based toast can end up rendered *behind* an open modal dialog,
since overlay content is teleported to a `<body>`-level container outside the
dialog's DOM subtree and therefore doesn't inherit its top-layer promotion.
A popover-based toast has no such problem — it always renders above whatever
else is currently open, including modal dialogs.

## API

Inject `NotificationService` anywhere in your app (it's `providedIn: 'root'`,
so there's a single shared instance app-wide) and call one of three methods:

```typescript
import { inject } from '@angular/core';
import { NotificationService } from 'ng-hpo-uikit';

export class SomeComponent {
  private notificationService = inject(NotificationService);

  onSave() {
    this.notificationService.showSuccess('Saved successfully');
  }

  onError(message: string) {
    this.notificationService.showError(message);
  }

  onStaleData() {
    this.notificationService.showWarning('This data may be out of date');
  }
}
```

| Method | Default duration | Dismiss label | Use for |
|---|---|---|---|
| `showError(message, duration?)` | 8000ms | "Dismiss" | Failed operations, validation errors |
| `showSuccess(message, duration?)` | 4000ms | "OK" | Confirmations after a completed action |
| `showWarning(message, duration?)` | 6000ms | "Close" | Non-blocking issues the user should notice |

Pass `duration` in milliseconds to override the default. Pass `0` to keep a
toast visible until the user dismisses it manually.

Multiple toasts stack vertically and each dismisses independently — firing
`showError()` twice in a row shows two toasts, not one replacing the other
(a deliberate difference from `MatSnackBar`, which only ever shows one
message at a time).

## Setup

`NotificationService` only holds state — a signal of currently-visible
toasts. Rendering that state requires mounting `ToastContainerComponent`
once, near the root of your application:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from 'ng-hpo-uikit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `
    <app-toast-container />
    <router-outlet />
  `,
})
export class AppComponent {}
```

No `providers` array is needed — the component and every consumer of
`NotificationService` throughout your app resolve to the same singleton
automatically.

Mount it exactly once per application. Mounting it multiple times will show
each toast duplicated, once per mounted container.

## How it works

- Calling `showError`/`showSuccess`/`showWarning` pushes a `Toast` object
  onto an internal `toasts` signal and schedules its removal after
  `duration` milliseconds via `setTimeout`.
- `ToastContainerComponent` reads that signal and renders one `<div>` per
  toast inside a `[popover="manual"]` container.
- `manual` mode means the popover won't auto-dismiss on outside click or
  `Escape` — visibility is driven entirely by the service's toast list, not
  by browser-default popover dismissal behavior.
- On every change to the toast list, the container hides and immediately
  re-shows its popover. This re-insertion is what keeps toasts on top even
  if a modal `<dialog>` opens afterward — the top layer orders elements by
  most-recent insertion, so a dialog opened after the toast's last
  hide/show cycle would otherwise render above it.

## Browser support

The Popover API is supported in all Chromium-based browsers/WebViews and
Safari 17+ (macOS Sonoma / iOS 17 and later). For Tauri builds, this means:

- **Windows** (WebView2, Chromium-based): fully supported.
- **macOS** (WKWebView): requires macOS Sonoma (14) or later as the app's
  minimum target.

If you need to support