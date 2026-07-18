// ontology-autocomplete.component.ts
import { Component, input, output, viewChild, effect, ElementRef, signal, HostListener } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { debounceTime, switchMap, of, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { OntologyMatch } from '../models/ontology-dto'; 
import { OntologyAutocompleteProvider } from '../models/hpo-annotation-models';

export function ontologyMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.length > 0) {
      return { 'invalidSelection': true };
    }
    return null;
  };
}

@Component({
  selector: 'hpo-ontology-autocomplete',
  standalone: true,
  templateUrl: './ontology-autocomplete.component.html',
  styleUrl: './ontology-autocomplete.component.scss',
  imports: [ReactiveFormsModule] // Complete removal of all Material dependencies
})
export class OntologyAutocompleteComponent {
  placeholder = input<string>('Search ontology term...');
  inputString = input<string>('');
  autocompleteProvider = input.required<OntologyAutocompleteProvider>();
  requireConfirmation = input<boolean>(false);

  selected = output<OntologyMatch>();

  inputElement = viewChild<ElementRef<HTMLInputElement>>('ontologyInput');
  control = new FormControl<string | OntologyMatch>('', [ontologyMatchValidator()]);

  // UI State Signals
  isOpen = signal<boolean>(false);
  activeHighlightIndex = signal<number>(-1);
  activeSelection = signal<OntologyMatch | null>(null);

  isValid = toSignal(this.control.statusChanges.pipe(map(status => status === 'VALID')), { initialValue: false });

  options = toSignal(
    this.control.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(300),
      switchMap((value) => {
        const query = typeof value === 'string' ? value : value?.label;
        if (query && query.length > 2) {
          return this.autocompleteProvider()(query);
        }
        return of([]);
      })
    ),
    { initialValue: [] as OntologyMatch[] }
  );

  // Close the dropdown cleanly when clicking completely outside the host element
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.hideDropdown();
    }
  }

  constructor(private elRef: ElementRef) {
    effect(() => {
      const val = this.inputString();
      const inputRef = this.inputElement();

      if (val && inputRef) {
        this.control.setValue(val, { emitEvent: true });
        setTimeout(() => {
          inputRef.nativeElement.focus();
          inputRef.nativeElement.select();
        }, 0);
      }
    });

    // Reset keyboard highlight whenever choices update
    effect(() => {
      this.options();
      this.activeHighlightIndex.set(-1);
    });
  }

  showDropdown() {
    this.isOpen.set(true);
  }

  hideDropdown() {
    this.isOpen.set(false);
  }

  selectOption(option: OntologyMatch) {
    // Sync the input value display text
    this.control.setValue(option.label, { emitEvent: false });
    
    if (this.requireConfirmation()) {
      this.activeSelection.set(option);
    } else {
      this.selected.emit(option);
    }
    this.hideDropdown();
  }

  confirmSelection() {
    const current = this.activeSelection();
    if (current) {
      this.selected.emit(current);
      this.activeSelection.set(null);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.isOpen() || this.options().length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeHighlightIndex.update(idx => (idx + 1) % this.options().length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeHighlightIndex.update(idx => (idx - 1 + this.options().length) % this.options().length);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.activeHighlightIndex() >= 0) {
          this.selectOption(this.options()[this.activeHighlightIndex()]);
        }
        break;
      case 'Escape':
        this.hideDropdown();
        break;
    }
  }
  
  clear() {
    this.control.setValue('');
    this.activeSelection.set(null);
    this.activeHighlightIndex.set(-1);
  }
}