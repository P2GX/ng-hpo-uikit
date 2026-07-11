import { AfterViewInit, Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface OrcidDialogData {
  currentOrcid?: string;
}

@Component({
  selector: 'hpo-orcid-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatInputModule, 
    MatIconModule, 
    MatTooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './orcid-dialog.component.html',
  styleUrl: './orcid-dialog.component.scss'
})
export class OrcidDialogComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<OrcidDialogComponent>);
  public data = inject<OrcidDialogData>(MAT_DIALOG_DATA);
  public externalLinkClicked = output<string>();

  orcidForm: FormGroup = this.fb.group({
    orcid: [
      this.data?.currentOrcid || '', 
      [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/)
      ]
    ]
  });

  ngAfterViewInit(): void {
    const control = this.orcidForm.get('orcid');

    if (control?.invalid) {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  onLinkClick(event: Event): void {
    event.preventDefault(); 
    this.externalLinkClicked.emit('https://orcid.org/');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.orcidForm.valid) {
      this.dialogRef.close(this.orcidForm.value.orcid);
    }
  }
}