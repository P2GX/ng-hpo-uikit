import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface HpoTermMinimal {
  termId: string;
  label: string;
}

export interface HierarchyMapItem {
  parents: HpoTermMinimal[];
  children: HpoTermMinimal[];
}

export interface PolishedHpoAnnotation {
  termId: string;
  label: string;
  isObserved: boolean;
  onsetString?: string;
  modifiers?: string[];
}

@Component({
  selector: '[app-hpo-annotation-polisher]', // Use attribute selector to render nicely inside <tr>
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './hpo-annotation-polisher.component.html',
  styleUrl: './hpo-annotation-polisher.component.scss'
})
export class HpoAnnotationPolisherComponent {
  
  readonly annotation = model.required<PolishedHpoAnnotation>();
  readonly hierarchy = input<HierarchyMapItem | null>(null);
  readonly availableOnsets = input<string[]>([]);
  readonly availableModifiers = input<string[]>([]);

  readonly updated = output<PolishedHpoAnnotation>();
  readonly deleteRequested = output<void>();
  readonly termClick = output<string>();

  readonly showHierarchyMenu = signal<boolean>(false);

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
    const updatedAnnotation = {
      ...this.annotation(),
      isObserved: !this.annotation().isObserved
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
}