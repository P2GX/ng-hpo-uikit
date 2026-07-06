import { Component, input, model, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HpoTermMinimal } from '../models/hpo-annotation-models';


// Fixed severity term IDs — these three are stable, well-known HPO terms
const SEVERITY_TERM_IDS: ReadonlySet<string> = new Set([
  'HP:0012825', // Mild
  'HP:0012826', // Moderate
  'HP:0012828', // Severe
]);

@Component({
  selector: 'hpo-modifier',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './hpo-modifier.component.html',
  styleUrls: ['./hpo-modifier.component.scss']
})
export class HpoModifierComponent {
  availableModifiers = input.required<HpoTermMinimal[]>();
  selectedModifiers = model<HpoTermMinimal[]>([]);
  placeholder = input('Search modifiers...');

  modifierToggled = output<{ modifier: HpoTermMinimal; selected: boolean }>();
  menuClosed = output<void>();

  // Mild, Moderate, Severe -- we always will display these terms
  protected quickModifiers = computed(() =>
    this.availableModifiers().filter(t => SEVERITY_TERM_IDS.has(t.termId))
  );

  protected control = new FormControl<string | HpoTermMinimal | null>('', {
    validators: [this.mustBeKnownTerm.bind(this)]
  });

  private searchQuery = signal('');

  protected filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.availableModifiers();
    if (!query) return all;
    return all.filter(t =>
      t.label.toLowerCase().includes(query) || t.termId.toLowerCase().includes(query)
    );
  });

  constructor() {
    this.control.valueChanges.subscribe(value => {
      const query = typeof value === 'string' ? value : value?.label ?? '';
      this.searchQuery.set(query);
    });
  }

  private mustBeKnownTerm(ctrl: AbstractControl): ValidationErrors | null {
    const value = ctrl.value;
    if (!value) return null;
    return typeof value === 'string' ? { invalidSelection: true } : null;
  }

  protected isSelected(term: HpoTermMinimal): boolean {
    return this.selectedModifiers().some(t => t.termId === term.termId);
  }

  protected selectQuickModifier(mod: HpoTermMinimal): void {
    this.addModifier(mod);
  }

  protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.addModifier(event.option.value as HpoTermMinimal);
    this.clear();
  }

  protected removeModifier(term: HpoTermMinimal): void {
    this.selectedModifiers.set(this.selectedModifiers().filter(t => t.termId !== term.termId));
    this.modifierToggled.emit({ modifier: term, selected: false });
  }

  private addModifier(term: HpoTermMinimal): void {
    if (this.isSelected(term)) return;
    this.selectedModifiers.set([...this.selectedModifiers(), term]);
    this.modifierToggled.emit({ modifier: term, selected: true });
  }

  protected displayFn(option: HpoTermMinimal | null): string {
    return option ? option.label : '';
  }

  protected clear(): void {
    this.control.setValue('');
  }

  protected closeMenu(): void {
    this.menuClosed.emit();
  }
}