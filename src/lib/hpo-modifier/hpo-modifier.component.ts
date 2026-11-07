import { Component, input, model, output, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HpoTermDuplet } from '../models/hpo-annotation-models';
import { IconComponent } from '../svg-icons/svg-icon.component';

const SEVERITY_TERM_IDS: ReadonlySet<string> = new Set([
  'HP:0012825', // Mild
  'HP:0012826', // Moderate
  'HP:0012828', // Severe
]);

@Component({
  selector: 'hpo-modifier',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  templateUrl: './hpo-modifier.component.html',
  styleUrls: ['./hpo-modifier.component.scss']
})
export class HpoModifierComponent {
  availableModifiers = input.required<HpoTermDuplet[]>();
  selectedModifiers = model<HpoTermDuplet[]>([]);
  placeholder = input('Search modifiers...');

  modifierToggled = output<{ modifier: HpoTermDuplet; selected: boolean }>();
  menuClosed = output<void>();

  protected quickModifiers = computed(() =>
    this.availableModifiers().filter(t => SEVERITY_TERM_IDS.has(t.hpoId))
  );

  protected control = new FormControl<string | HpoTermDuplet | null>('', {
    validators: [this.mustBeKnownTerm.bind(this)]
  });

  private searchQuery = signal('');
  protected isOpen = signal(false);
  protected activeIndex = signal(-1);

  protected filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.availableModifiers();
    if (!query) return all;
    return all.filter(t =>
      t.hpoLabel.toLowerCase().includes(query) || t.hpoId.toLowerCase().includes(query)
    );
  });

  constructor() {
    this.control.valueChanges.subscribe(value => {
      const query = typeof value === 'string' ? value : value?.hpoLabel ?? '';
      this.searchQuery.set(query);
      this.activeIndex.set(-1);
      if (typeof value === 'string') {
        this.isOpen.set(value.length > 0);
      }
    });
  }

  private mustBeKnownTerm(ctrl: AbstractControl): ValidationErrors | null {
    const value = ctrl.value;
    if (!value) return null;
    return typeof value === 'string' ? { invalidSelection: true } : null;
  }



  protected isSelected(term: HpoTermDuplet): boolean {
    return this.selectedModifiers().some(t => t.hpoId === term.hpoId);
  }

  protected selectQuickModifier(mod: HpoTermDuplet): void {
    this.addModifier(mod);
  }

  protected onFocus(): void {
    this.isOpen.set(true);
  }

  protected onFocusOut(event: FocusEvent): void {
    const wrapper = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (!next || !wrapper.contains(next)) {
      this.isOpen.set(false);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions();
    if (!options.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.isOpen.set(true);
        this.activeIndex.set((this.activeIndex() + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.isOpen.set(true);
        this.activeIndex.set((this.activeIndex() - 1 + options.length) % options.length);
        break;
      case 'Enter': {
        const active = this.activeIndex();
        if (active >= 0 && active < options.length) {
          event.preventDefault();
          this.onOptionSelected(options[active]);
        }
        break;
      }
      case 'Escape':
        this.isOpen.set(false);
        break;
    }
  }


    protected onOptionSelected(option: HpoTermDuplet): void {
      this.addModifier(option);
      this.clear();
      this.isOpen.set(false);
      this.menuClosed.emit();
    }

  protected removeModifier(term: HpoTermDuplet): void {
    this.selectedModifiers.set(this.selectedModifiers().filter(t => t.hpoId !== term.hpoId));
    this.modifierToggled.emit({ modifier: term, selected: false });
  }

  private addModifier(term: HpoTermDuplet): void {
    if (this.isSelected(term)) return;
    this.selectedModifiers.set([...this.selectedModifiers(), term]);
    this.modifierToggled.emit({ modifier: term, selected: true });
  }

  protected clear(): void {
    this.control.setValue('');
  }

  protected closeMenu(): void {
    this.menuClosed.emit();
  }
}