import { Component, input, output, signal, computed, inject, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgeService } from '../services/age_service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'hpo-age-selector-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './hpo-age-selector-dialog.component.html',
  styleUrls: ['./hpo-age-selector-dialog.component.scss']
})
export class HpoAgeSelectorDialogComponent implements OnInit {
  @ViewChild('ageSelectorDialog') dialogRef!: ElementRef<HTMLDialogElement>;

  currentSelection = input<string | null>(null);
  selected = output<string>();
  dismissed = output<void>();

  private ageService = inject(AgeService);
  private notificationService = inject(NotificationService);
  
  customAge = signal('');
  showSuggestions = signal(false);
  
  existingAgeStrings = computed(() => this.ageService.selectedTerms());

  filteredTerms = computed(() => {
    const typed = this.customAge().trim().toLowerCase();
    if (!typed) return [];
    const allAvailable = this.ageService.allAvailableTerms();
    return allAvailable.filter(t => t.toLowerCase().includes(typed));
  });

  ngOnInit(): void {
    const current = this.currentSelection();
    if (current) {
      this.customAge.set(current);
    }
  }

  public open(): void {
    this.dialogRef.nativeElement.showModal();
    this.showSuggestions.set(false);
  }

  public close(): void {
    this.dialogRef.nativeElement.close();
    this.showSuggestions.set(false);
  }

  onInputChange(value: string): void {
    this.customAge.set(value);
    this.showSuggestions.set(true);
  }

  onSelectExisting(term: string): void {
    if (term) {
      this.showSuggestions.set(false);
      this.selected.emit(term);
      this.close();
    }
  }

  onSubmitCustom(): void {
    const rawVal = this.customAge().trim();
    if (!rawVal) return;
    this.showSuggestions.set(false);
    const processedVal = this.ageService.mapEtlAgeString(rawVal);
    if (processedVal && this.ageService.validateAgeInput(processedVal)) {
      this.ageService.addSelectedTerm(processedVal);
      this.selected.emit(processedVal);
      this.close();
    } else {
      this.notificationService.showError(
        'Invalid format. Please use standard HPO terms, ISO8601 (e.g., P1Y), or Gestational (e.g., G20w).'
      );
    }
  }

  onCancel(): void {
    this.showSuggestions.set(false);
    this.dismissed.emit();
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.onCancel();
    }
  }

  // Close suggestions if clicking completely outside the input area
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.manual-entry')) {
      this.showSuggestions.set(false);
    }
  }
}