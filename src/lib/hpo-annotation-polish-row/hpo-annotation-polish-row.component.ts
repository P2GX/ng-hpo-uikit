import { Component, input, model, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HpoModifierMenuComponent } from "../hpo-modifier-menu/hpo-modifier-menu.component";
import { PolishedHpoAnnotation, HierarchyMapItem, HpoTermMinimal } from "../models/hpo-annotation-models"
import { HpoAgeSelectorComponent } from '../hpo-age-selector/hpo-age-selector.component';

@Component({
  selector: 'tr[hpo-polisher-row]',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HpoAgeSelectorComponent,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    HpoModifierMenuComponent
],
  templateUrl: './hpo-annotation-polish-row.component.html',
  styleUrl: './hpo-annotation-polish-row.component.scss'
})
export class HpoPolishRowComponent {
  
  readonly annotation = model.required<PolishedHpoAnnotation>();
  readonly hierarchy = input<HierarchyMapItem | null>(null);
  readonly availableOnsets = input<string[]>([]);
  readonly availableModifiers = input<string[]>([]);

  readonly updated = output<PolishedHpoAnnotation>();
  readonly deleteRequested = output<void>();
  readonly termClick = output<string>();

  createOnsetRequested = output<void>(); 

  // Local autocomplete search inputs
  modifierSearchQuery = signal<string>('');
  onsetSearchQuery = signal<string>('');

  readonly showHierarchyMenu = signal<boolean>(false);
  showModifierMenu = signal(false);

  filteredModifiers = computed(() => {
    const query = this.modifierSearchQuery().toLowerCase().trim();
    const available = this.availableModifiers();
    const currentSelected = this.annotation().modifiers || [];
    
    return available.filter(mod => 
      !currentSelected.includes(mod) && 
      mod.toLowerCase().includes(query)
    );
  });

  filteredOnsets = computed(() => {
    const query = this.onsetSearchQuery().toLowerCase().trim();
    return this.availableOnsets().filter(onset => 
      onset.toLowerCase().includes(query)
    );
  });

  formattedModifierOptions = computed(() => {
    return this.availableModifiers().map(m => ({ id: m, label: m }));
  });

  updateModifiers(updatedMods: string[]): void {
  const updatedAnnotation = {
    ...this.annotation(),
    modifiers: updatedMods
  };
  
  this.annotation.set(updatedAnnotation); // Update local signal view
  this.updated.emit(updatedAnnotation);   // Inform parent/backend pipeline
}

  toggleHierarchyMenu(): void {
    this.showHierarchyMenu.update(v => !v);
  }

  replaceTerm(target: HpoTermMinimal): void {
   const updatedAnnotation = {
      ...this.annotation(),
      termId: target.termId,
      label: target.label
    };
    this.annotation.set(updatedAnnotation);
    this.updated.emit(updatedAnnotation);
    this.showHierarchyMenu.set(false);
  }

  toggleObserved(): void {
    const updatedAnnotation: PolishedHpoAnnotation = {
      ...this.annotation(),
      excluded: !this.annotation().excluded
    };
    this.annotation.set(updatedAnnotation);
    this.updated.emit(updatedAnnotation);
  }


  addModifier(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    if (!value) return;

    const currentMods = this.annotation().modifiers || [];
    if (!currentMods.includes(value)) {
      const updatedAnnotation = {
        ...this.annotation(),
        modifiers: [...currentMods, value]
      };
      
      this.annotation.set(updatedAnnotation); // Update local view
      this.updated.emit(updatedAnnotation);
    }
    select.value = ''; // Reset select tag view line
  }

  removeModifier(idx: number): void {
    const currentMods = this.annotation().modifiers || [];
    const updatedMods = currentMods.filter((_, i) => i !== idx);
    const updatedAnnotation = {
      ...this.annotation(),
      modifiers: updatedMods
    };

    this.annotation.set(updatedAnnotation); 
    this.updated.emit(updatedAnnotation);
  }

  changeOnset(newOnset: string): void {
    const updatedAnnotation = {
      ...this.annotation(),
      onsetString: newOnset || undefined
    };
    this.annotation.set(updatedAnnotation); 
    this.updated.emit(updatedAnnotation);
  }
}