import { Component, input, output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HpoAgeSelectorDialogComponent } from './hpo-age-selector-dialog.component';

@Component({
  selector: 'hpo-age-selector',
  standalone: true,
  templateUrl: './hpo-age-selector.component.html',
  styleUrls: ['./hpo-age-selector.component.scss']
})
export class HpoAgeSelectorComponent {
  private dialog = inject(MatDialog);

  selectedOnset = input<string | null>(null);
 

  onsetChanged = output<string>();

  openSelectorDialog(): void {
    const dialogRef = this.dialog.open(HpoAgeSelectorDialogComponent, {
      width: '440px',
      panelClass: 'compact-dialog-overlay',
      data: {
        currentSelection: this.selectedOnset()
      }
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.onsetChanged.emit(result);
      }
    });
  }
}