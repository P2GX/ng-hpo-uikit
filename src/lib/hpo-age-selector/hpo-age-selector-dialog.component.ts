import { Component, input, output, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgeService } from '../services/age_service';
import { NotificationService } from '../services/notification.service';


export interface HpoAgeSelectorDialogData {
  currentSelection: string | null;
}


@Component({
  selector: 'hpo-age-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  templateUrl: './hpo-age-selector-dialog.component.html',
  styleUrls: ['./hpo-age-selector-dialog.component.scss']
})
export class HpoAgeSelectorDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<HpoAgeSelectorDialogComponent>);
  readonly data: HpoAgeSelectorDialogData = inject(MAT_DIALOG_DATA);

  private ageService = inject(AgeService);
  private notificationService = inject(NotificationService);
  
  customAge = signal('');
  
  existingAgeStrings = computed(() => this.ageService.selectedTerms());

  filteredTerms = computed(() => {
    const typed = this.customAge().trim().toLowerCase();
    if (! typed) return [];
    const allAvailable = this.ageService.allAvailableTerms();
    return allAvailable.filter(t => t.toLowerCase().includes(typed));
  });

  ngOnInit(): void {
    if (this.data?.currentSelection) {
      this.customAge.set(this.data.currentSelection);
    }
  }

  onSelectExisting(term: string): void {
    if (term) {
      this.dialogRef.close(term);
    }
  }

  onSubmitCustom(): void {
    const rawVal = this.customAge().trim();
    if (!rawVal) return;
    const processedVal = this.ageService.mapEtlAgeString(rawVal);
    if (processedVal && this.ageService.validateAgeInput(processedVal)) {
      this.ageService.addSelectedTerm(processedVal);
      this.dialogRef.close(processedVal);
    } else {
      this.notificationService.showError(
        'Invalid format. Please use standard HPO terms, ISO8601 (e.g., P1Y), or Gestational (e.g., G20w).'
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}