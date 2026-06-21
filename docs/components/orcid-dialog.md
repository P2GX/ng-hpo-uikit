# ORCID Dialog Component

The `OrcidDialogComponent` provides a clean, standalone modal container designed to validate and update a researcher's persistent digital identifier.

## Basic Implementation

To use the dialog in an external application, import the standalone component and open it using Angular Material's `MatDialog` manager.

### Component Controller Configuration

```typescript
import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrcidDialogComponent } from 'ng-hpo-uikit';

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

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      // If the user cancelled or cleared the input, exit cleanly
      if (!result) return;

      // Update the reactive signal state
      this.biocuratorOrcid.set(result);
    });
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

### Return Types

| Event | Type | Description |
| :--- | :--- | :--- |
| **On Save** | `string` | Returned when the user hits "Save" with a structurally valid value. |
| **On Cancel / Close** | `undefined` | Returned when the user closes the modal or clicks "Cancel". |

