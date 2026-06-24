# ORCID Dialog Component

The `OrcidDialogComponent` provides a clean, standalone modal container designed to validate and update a researcher's persistent digital identifier.

## Basic Implementation

To use the dialog in an external application, import the standalone component and open it using Angular Material's `MatDialog` manager.

### Component Controller Configuration

```typescript
import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrcidDialogComponent } from 'ng-hpo-uikit';
// Import Tauri shell API to handle desktop system navigation
import { open as openExternalBrowser } from '@tauri-apps/plugin-shell';

@Component({
  selector: 'app-biocurator-settings',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  private dialog = inject(MatDialog);
  
  // Local or service-driven reactive state
  public biocuratorOrcid = signal<string>('0000-0002-1825-0097');

  setBiocuratorOrcid(): void {
    const dialogRef = this.dialog.open(OrcidDialogComponent, {
      width: '500px',
      disableClose: true, 
      data: { 
        currentOrcid: this.biocuratorOrcid()
      }
    });

    // this subscribes to the @output/emit of the dialog and opens
    // the ORCID website in the system browser
    dialogRef.componentInstance.externalLinkClicked.subscribe((url: string) => {
      this.handleExternalNavigation(url);
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      // If the user cancelled or cleared the input, exit cleanly
      if (!result) return;

      // Update the reactive signal state
      this.biocuratorOrcid.set(result);
    });
  }

  private async handleExternalNavigation(url: string): Promise<void> {
    try {
      // Directs the native OS to launch the link in the user's default browser
      await openExternalBrowser(url);
    } catch (error) {
      console.warn('Tauri environment missing, falling back to standard web navigation.', error);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
```

## Template Layout

```typescript
<div class="action-with-help">  
  <button (click)="setBiocuratorOrcid()" class="hpo-btn-secondary">
    <mat-icon>account_circle</mat-icon>
    {{ biocuratorOrcid() || 'Set ORCID' }}
  </button>
</div>
```
---

## Component API Reference

### Dialog Data Injections

The component expects an object conforming to the following structure passed into the `data` configuration property:

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentOrcid` | `string` | The active ORCID value populated in the form field when initialized. |



### Outputs

The component exposes a signal-driven output stream accessible via the componentInstance property on the opened dialog reference:

| Output | Emitted type | Description |
| :--- | :--- | :--- |
| `externalLinkClicked` | `string` | Emits the target absolute URL string whenever the user interacts with documentation links inside the modal context. |


### Return Types

| Event | Type | Description |
| :--- | :--- | :--- |
| **On Save** | `string` | Returned when the user hits "Save" with a structurally valid value. |
| **On Cancel / Close** | `undefined` | Returned when the user closes the modal or clicks "Cancel". |

