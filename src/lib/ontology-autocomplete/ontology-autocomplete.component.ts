// ontology-autocomplete.component.ts
import { Component, input, output, viewChild, effect, ElementRef, signal, HostListener, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, of, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { OntologyMatch } from '../models/ontology-dto'; 
import { OntologyAutocompleteProvider } from '../models/hpo-annotation-models';



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
  requireConfirmation = input.required<boolean>();
  confirmPosition = input<'bottom' | 'right'>('right');
  selected = output<OntologyMatch>();

  inputElement = viewChild<ElementRef<HTMLInputElement>>('ontologyInput');
  control = new FormControl<string>('', { nonNullable: true });

  // UI State Signals
  isOpen = signal<boolean>(false);
  activeHighlightIndex = signal<number>(-1);
  activeSelection = signal<OntologyMatch | null>(null);
  hasValidSelection = computed(() => this.activeSelection() !== null);

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
    // Automatically clear the input and reset state if the parent clears the inputString
    effect(() => {
      const text = this.inputString();
      if (!text) {
        this.clear(); // Calls your existing clear method inside the autocomplete component
      }
    });
  }

  isValid = toSignal(
    this.control.valueChanges.pipe(
      startWith(this.control.value),
      map(val => {
        const text = typeof val === 'string' ? val.trim() : '';
        // Valid if empty, or if the current text matches the active selection label
        return text === '' || text === this.activeSelection()?.label;
      })
    ),
    { initialValue: true }
  );

  // Computed error flag for your template
  hasError = computed(() => {
    const text = this.control.value.trim();
    // Show error if there's text typed in, it's touched/dirty, and it doesn't match a selected term
    return text.length > 0 && text !== this.activeSelection()?.label && this.control.touched;
  });

  options = toSignal(
    this.control.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(300),
      switchMap((value) => {
        const query = typeof value === 'string' ? value.trim() : '';
        if (!query) {
          this.activeSelection.set(null);
          return of([]);
        }
        // If the current input text matches the active selection, don't search
        if (query === this.activeSelection()?.label) {
          return of([]);
        }
        // If the user typed something different than the active selection, 
        // clear the old selection so they can search for a new term!
        if (this.activeSelection() !== null) {
          this.activeSelection.set(null);
        }
        // Perform autocomplete with fenominal!
        if (query.length > 2) {
          return this.autocompleteProvider()(query);
        }
        // fall back
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


  truncatedSelectionLabel = computed(() => {
  const label = this.activeSelection()?.label ?? '';
  return label.length > 20 ? label.slice(0, 20) + '…' : label;
});

  showDropdown() {
    this.isOpen.set(true);
  }

  hideDropdown() {
    this.isOpen.set(false);
  }

  selectOption(option: OntologyMatch) {
    this.activeSelection.set(option);
    this.control.setValue(option.label, { emitEvent: true });
    this.control.markAsPristine();
    if (! this.requireConfirmation()) {
      this.selected.emit(option);
    } 
    this.hideDropdown();
  }

  confirmSelection() {
    const current = this.activeSelection();
    if (current) {
      this.selected.emit(current);
      this.clear();
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
    this.control.setValue('', { emitEvent: false });
    this.control.markAsUntouched();
    this.control.markAsPristine();
    this.control.setErrors(null);
    this.activeSelection.set(null);
    this.activeHighlightIndex.set(-1);
    this.hideDropdown();
    const inputRef = this.inputElement();
    if (inputRef) {
      inputRef.nativeElement.value = '';
    }
  }
}