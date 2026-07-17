import { Component, input, model, computed, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PolishedHpoAnnotation, HierarchyMapItem, HpoTermMinimal } from "../models/hpo-annotation-models"
import { HpoAgeSelectorComponent } from '../hpo-age-selector/hpo-age-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { HpoModifierDialogComponent, ModifierDialogData, ModifierDialogResult } from '../hpo-modifier/hpo-modifier-dialog.component'

/*
 * This component provides one row in the HPO annotation table and allows users to "polish" the
 * annotations by toggling observed/excluded, setting onsets, adding modifiers, deleting annotations,
 * and adding new annotations via autocompletion.
*/
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
    MatTooltip
],
  templateUrl: './hpo-annotation-polish-row.component.html',
  styleUrl: './hpo-annotation-polish-row.component.scss'
})
export class HpoPolishRowComponent {
  private dialog = inject(MatDialog);
  
  readonly annotation = model.required<PolishedHpoAnnotation>();
  readonly hierarchy = input<HierarchyMapItem | null>(null);
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

  toggleHierarchyMenu(): void {
    this.showHierarchyMenu.update(v => !v);
  }

  /* replace a term with a parent or child from the hierarchy menu */
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

  protected openModifierDialog(): void {
    const ref = this.dialog.open<HpoModifierDialogComponent, ModifierDialogData, ModifierDialogResult>(
      HpoModifierDialogComponent,
      {
        data: {
          availableModifiers: this.availableModifiers(),
          selectedModifiers: this.annotation().modifiers || []
        },
        width: '480px'
      }
    );

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.updateModifiers(result.selectedModifiers);
      }
    });
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