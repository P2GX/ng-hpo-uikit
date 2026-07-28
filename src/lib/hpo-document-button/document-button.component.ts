import { Component, input, output } from '@angular/core';

@Component({
  selector: 'hpo-document-button',
  templateUrl: './document-button.component.html',
  styleUrl: './document-button.component.scss',
  standalone: true,
})
export class DocumentButtonComponent {
  /** Tooltip / accessible title, e.g. "Show PMIDs" or "Edit Modes of Inheritance" */
  label = input.required<string>();
  /** Visible text next to the icon, e.g. "PMIDs" or "MOI" */
  text = input<string>('');
  clicked = output<void>();
}