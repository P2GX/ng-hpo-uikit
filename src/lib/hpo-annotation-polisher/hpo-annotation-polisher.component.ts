import { Component, input, output, signal } from '@angular/core';
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
  template: `
    <td class="font-mono">
      <a (click)="termClick.emit(annotation().termId)" class="link-text">
        {{ annotation().termId }}
      </a>
    </td>

    <td class="label-cell">
      <div class="dropdown-wrapper">
        <span (click)="toggleHierarchyMenu()" class="dropdown-trigger">
          {{ annotation().label }} <span class="caret">▼</span>
        </span>

        @if (showHierarchyMenu()) {
          <div class="local-context-menu" (mouseleave)="showHierarchyMenu.set(false)">
            @if (hierarchy()?.parents?.length) {
              <div class="menu-section-title">Parents</div>
              <ul>
                @for (p of hierarchy()?.parents; track p.termId) {
                  <li (click)="replaceTerm(p)" class="menu-item">{{ p.label }} ({{ p.termId }})</li>
                }
              </ul>
            }
            @if (hierarchy()?.children?.length) {
              <div class="menu-section-title">Children</div>
              <ul>
                @for (c of hierarchy()?.children; track c.termId) {
                  <li (click)="replaceTerm(c)" class="menu-item">{{ c.label }} ({{ c.termId }})</li>
                }
              </ul>
            }
          </div>
        }
      </div>
    </td>

    <td>
      <span class="badge" [ngClass]="annotation().isObserved ? 'badge-green' : 'badge-red'">
        {{ annotation().isObserved ? 'OBS' : 'EXC' }}
      </span>
    </td>

    <td class="onset-cell">
      <div class="onset-inline-group">
        <select 
          [ngModel]="annotation().onsetString"
          (ngModelChange)="changeOnset($event)"
          class="onset-select"
        >
          <option [value]="''">-- No Onset Specified --</option>
          @for (option of availableOnsets(); track option) {  
            <option [value]="option">{{ option }}</option>
          }
        </select>
      </div>
    </td>

    <td class="modifier-cell">
      <div class="modifiers-container">
        @for (mod of annotation().modifiers || []; track mod; let idx = $index) {
          <span class="modifier-chip">
            {{ mod }}
            <button class="remove-mod-btn" (click)="removeModifier(idx)">×</button>
          </span>
        }
        <select class="modifier-select" (change)="addModifier($event)">
          <option value="" disabled selected>+ Add Modifier</option>
          @for (opt of availableModifiers(); track opt) {
            <option [value]="opt">{{ opt }}</option>
          }
        </select>
      </div>
    </td>

    <td class="action-cell">
      <div class="action-group">
        <button (click)="toggleObserved()" class="btn-icon">
          <mat-icon>swap_horiz</mat-icon>Toggle
        </button>
        <button (click)="deleteRequested.emit()" class="btn-icon btn-delete">
          <mat-icon>delete</mat-icon>Delete
        </button>
      </div>
    </td>
  `,
  styles: [`
    :host { display: table-row; } /* Evaluates smoothly within standard layouts */
    .label-cell { position: relative; }
    .dropdown-wrapper { position: relative; display: inline-block; }
    .dropdown-trigger { cursor: pointer; color: #0d6efd; font-weight: 500; }
    .dropdown-trigger:hover { text-decoration: underline; }
    
    /* Scoped to this specific cell, no absolute screen-space coordinate math needed! */
    .local-context-menu {
      position: absolute; top: 100%; left: 0; z-index: 1000;
      background: #ffffff; border: 1px solid #ced4da; border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); min-width: 260px; max-height: 300px; overflow-y: auto;
    }
    .menu-section-title { background: #f8f9fa; padding: 6px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; color: #6c757d; }
    .menu-item { padding: 8px 12px; font-size: 13px; cursor: pointer; list-style: none; }
    .menu-item:hover { background-color: #f1f3f5; }

    /* Modifier configuration layouts */
    .modifiers-container { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
    .modifier-chip { background: #e9ecef; border-radius: 12px; padding: 2px 8px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; }
    .remove-mod-btn { border: none; background: transparent; cursor: pointer; font-weight: bold; color: #dc3545; }
    .modifier-select, .onset-select { padding: 4px; border-radius: 4px; border: 1px solid #ced4da; font-size: 12px; }
  `]
})
export class HpoAnnotationPolisherComponent {
  // Inputs via new modern Signal Inputs API
  readonly annotation = input.required<PolishedHpoAnnotation>();
  readonly hierarchy = input<HierarchyMapItem | null>(null);
  readonly availableOnsets = input<string[]>([]);
  readonly availableModifiers = input<string[]>([]);

  // Clean event outputs
  readonly updated = output<PolishedHpoAnnotation>();
  readonly deleteRequested = output<void>();
  readonly termClick = output<string>();

  readonly showHierarchyMenu = signal<boolean>(false);

  toggleHierarchyMenu(): void {
    this.showHierarchyMenu.update(v => !v);
  }

  replaceTerm(target: HpoTermMinimal): void {
    this.updated.emit({
      ...this.annotation(),
      termId: target.termId,
      label: target.label
    });
    this.showHierarchyMenu.set(false);
  }

  toggleObserved(): void {
    this.updated.emit({
      ...this.annotation(),
      isObserved: !this.annotation().isObserved
    });
  }

  changeOnset(newOnset: string): void {
    this.updated.emit({
      ...this.annotation(),
      onsetString: newOnset || undefined
    });
  }

  addModifier(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    if (!value) return;

    const currentMods = this.annotation().modifiers || [];
    if (!currentMods.includes(value)) {
      this.updated.emit({
        ...this.annotation(),
        modifiers: [...currentMods, value]
      });
    }
    select.value = ''; // Reset select tag view line
  }

  removeModifier(idx: number): void {
    const currentMods = this.annotation().modifiers || [];
    const updatedMods = currentMods.filter((_, i) => i !== idx);
    this.updated.emit({
      ...this.annotation(),
      modifiers: updatedMods
    });
  }
}