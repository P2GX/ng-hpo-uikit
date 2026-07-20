import { Component, input, model, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PolishedHpoAnnotation, HierarchyMapItem, HpoTermMinimal } from "../models/hpo-annotation-models"
import { HpoAgeSelectorComponent } from '../hpo-age-selector/hpo-age-selector.component';
import { ModifierSelectorComponent } from './app-modifier-selector';

/*
 * This component provides one row in the HPO annotation table and allows users to "polish" the
 * annotations by toggling observed/excluded, setting onsets, adding modifiers, deleting annotations,
 * and adding new annotations via autocompletion.
*/
@Component({
  selector: 'tr[hpo-polisher-row]',
  standalone: true,
  imports: [
    ModifierSelectorComponent,
    CommonModule,
    FormsModule,
    HpoAgeSelectorComponent,
    OverlayModule
],
  templateUrl: './hpo-annotation-polish-row.component.html',
  styleUrl: './hpo-annotation-polish-row.component.scss'
})
export class HpoPolishRowComponent {
  
  readonly isModifierDialogOpen = signal(false);
  
  readonly annotation = model.required<PolishedHpoAnnotation>();
  readonly hierarchy = signal<HierarchyMapItem | null>(null);
   hierarchyProvider = input.required<(termId: string) => Promise<HierarchyMapItem>>();
  readonly availableModifiers = input<HpoTermMinimal[]>([]);

  readonly updated = output<PolishedHpoAnnotation>();
  readonly deleteRequested = output<void>();
  readonly termClick = output<string>();
  // Local autocomplete search inputs
  modifierSearchQuery = signal<string>('');
 
  readonly showHierarchyMenu = signal(false);
  showModifierMenu = signal(false);

  filteredModifiers = computed(() => {
    const query = this.modifierSearchQuery().toLowerCase().trim();
    const available = this.availableModifiers();
    const currentSelected = this.annotation().modifiers || [];
    
    return available.filter(mod => 
      !currentSelected.includes(mod) && 
      mod.label.includes(query)
    );
  });

 


  formattedModifierOptions = computed(() => {
    return this.availableModifiers().map(m => ({ id: m, label: m }));
  });

  readonly remainingModifierLabels = computed(() => {
    const mods = this.annotation().modifiers ?? [];

    return mods
      .slice(2)
      .map(m => m.label)
      .join('\n');
  });

  modifierButtonText = computed(() => {
    const count = this.annotation().modifiers?.length ?? 0;
    return count === 0 ? '+Add modifier' : 'Edit';
  });

  updateModifiers(updatedMods: HpoTermMinimal[]): void {
    const updatedAnnotation = {
      ...this.annotation(),
      modifiers: updatedMods
    };
    this.annotation.set(updatedAnnotation); 
    this.updated.emit(updatedAnnotation); 
  }

  toggleModifierModal(): void {
    this.isModifierDialogOpen.update(v => !v);
  }

  toggleHierarchyMenu(): void {
    this.showHierarchyMenu.update(v => !v);
  }

  async openHierarchyMenu(): Promise<void> {
    if (!this.showHierarchyMenu() && this.hierarchy() === null) {
      const provider = this.hierarchyProvider(); // Get the function
      const data = await provider(this.annotation().termId); // Fetch fresh
      this.hierarchy.set(data);
      }
    this.showHierarchyMenu.update(v => !v);
  }

  /* replace a term with a parent or child from the hierarchy menu */
  /* replace a term with a parent or child from the hierarchy menu */
  async replaceTerm(target: HpoTermMinimal): Promise<void> {
    const updatedAnnotation = {
      ...this.annotation(),
      termId: target.termId,
      label: target.label
    };
    this.annotation.set(updatedAnnotation);
    this.updated.emit(updatedAnnotation);

    //  fetch fresh data for the new term immediately
    // this prevents the menu from showing stale data on the next open
    const provider = this.hierarchyProvider();
    const data = await provider(target.termId);
    this.hierarchy.set(data);
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