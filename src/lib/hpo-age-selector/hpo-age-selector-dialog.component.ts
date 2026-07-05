import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
export class HpoAgeSelectorDialogComponent {
  existingAgeStrings = input.required<string[]>();
  allAvailableTerms = input<string[]>([]);
  hasError = input<boolean>(false);

  selectTerm = output<string>();
  createCustomTerm = output<string>();
  cancel = output<void>();

  customAge = signal('');

  filteredTerms = computed(() => {
    const typed = this.customAge().trim().toLowerCase();
    if (! typed) return [];
    return this.allAvailableTerms().filter(t => t.toLowerCase().includes(typed));
  });

  onSelectExisting(term: string): void {
    if (term) {
      this.selectTerm.emit(term);
    }
  }

  onSumbitCustom(): void {
    const val = this.customAge().trim();
    if (!val) return;
    const exactMatch = this.allAvailableTerms().find(
      (t) => t.trim().toLowerCase() === val.toLowerCase()
    );
    if (exactMatch) {
      this.selectTerm.emit(exactMatch);
    } else {
      this.createCustomTerm.emit(val);
    }
  }
}