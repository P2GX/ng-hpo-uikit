import { Component, input, output, viewChild, effect, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { debounceTime, switchMap, of, map, startWith, Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core'; 
import { MatIconModule } from "@angular/material/icon";
import { toSignal } from '@angular/core/rxjs-interop';
import { OntologyMatch } from '../models/ontology-dto'; 

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
  selector: 'ui-ontology-autocomplete',
  standalone: true,
  templateUrl: './ontology-autocomplete.component.html',
  styleUrl: './ontology-autocomplete.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule
  ]
})
export class OntologyAutocompleteComponent {
  placeholder = input<string>('Search ontology term...');
  inputString = input<string>('');
  
  // Provide the query function dynamically from the parent
  searchProvider = input.required<(query: string) => Observable<OntologyMatch[]>>();

  selected = output<OntologyMatch>();

  inputElement = viewChild<ElementRef<HTMLInputElement>>('ontologyInput');
  control = new FormControl<string | OntologyMatch>('', [ontologyMatchValidator()]);

  isValid = toSignal(this.control.statusChanges.pipe(map(status => status === 'VALID')), { initialValue: false });

  options = toSignal(
    this.control.valueChanges.pipe(
      startWith(this.control.value),
      debounceTime(300),
      switchMap((value) => {
        const query = typeof value === 'string' ? value : value?.label;
        if (query && query.length > 2) {
          // Execute the dynamic search provider instead of a hardcoded service
          return this.searchProvider()(query);
        }
        return of([]);
      })
    ),
    { initialValue: [] as OntologyMatch[] }
  );

  constructor() {
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
  }

  displayFn(option: OntologyMatch | string | null): string {
    if (!option) return '';
    return typeof option === 'string' ? option : option.label;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selection = event.option.value as OntologyMatch;
    this.selected.emit(selection);
  }
  
  clear() {
    this.control.setValue('');
  }
}