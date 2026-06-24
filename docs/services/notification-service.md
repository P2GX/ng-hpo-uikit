# Notification Service

The `NotificationService` provides a unified, accessible way to display global toast messages (snackbars) across applications. It standardizes the visual presentation of success, warning, and error states using Angular Material.

## Installation & Setup

This service relies on `@angular/material/snack-bar`. Ensure that your application has initialized an Angular Material theme (typically in your `styles.scss` or `angular.json`).

```typescript
import { inject } from '@angular/core';
import { NotificationService } from 'ng-hpo-uikit';
```

## API Reference

### `showSuccess()`
Displays a transient success message. Ideal for confirming actions like data saving or successful curation.

* **Signature:** `showSuccess(message: string, duration: number = 4000): void`
* **Default Position:** Bottom

```typescript
this.notificationService.showSuccess('Phenopacket updated successfully.');
```

### `showWarning()`
Displays a persistent warning message. Use this for non-blocking issues or alerts that require extra user attention.

* **Signature:** `showWarning(message: string, duration: number = 6000): void`
* **Default Position:** Bottom Center

```typescript
const pmid = '31042562';
this.notificationService.showWarning(`Warning: ${pmid} is already present in the cohort.`);
```

### `showError()`

Displays a high-priority error message with an explicit "Dismiss" action. Ideal for network failures, validation issues, or backend exceptions.

* **Signature:** `showError(message: string, duration: number = 8000): void`
* **Default Position:** Bottom Center

```typescript
this.notificationService.showError('Failed to fetch initial backend status.');
```

### Styling Customization
The service attaches specific CSS classes to the snackbar container based on the method invoked. You can customize the look and feel in your global application stylesheet (e.g., styles.scss):

```css
// Global Snackbar Styles
.error-snackbar {
  --mdc-snackbar-container-color: #b00020;
  --mdc-snackbar-supporting-text-color: #ffffff;
}

.success-snackbar {
  --mdc-snackbar-container-color: #4caf50;
  --mdc-snackbar-supporting-text-color: #ffffff;
}

.warning-snackbar {
  --mdc-snackbar-container-color: #ff9800;
  --mdc-snackbar-supporting-text-color: #000000;
}
```

:::tip Note on View Encapsulation
Because Angular Material Snackbars are rendered in a global overlay container outside the application component tree, these styles must be placed in a global stylesheet rather than a component-scoped CSS/SCSS file.
:::