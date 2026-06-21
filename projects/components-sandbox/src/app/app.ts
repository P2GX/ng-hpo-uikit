import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrcidDialogComponent } from 'ng-hpo-uikit'; 

// 1. Import the missing modules
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // Or RouterOutlet if using individual routing primitives

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Add them right here to register the tags
  imports: [
    MatDialogModule, 
    MatIconModule, 
    RouterModule, 
    OrcidDialogComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  private dialog = inject(MatDialog);
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
      if (!result) return;
      this.biocuratorOrcid.set(result);
    });
  }
}