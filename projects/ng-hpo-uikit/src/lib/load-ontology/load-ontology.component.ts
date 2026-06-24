import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HelpButtonComponent } from '../help-button/help-button.component';

@Component({
  selector: 'ui-load-ontology',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressSpinnerModule, 
    MatIconModule,
    HelpButtonComponent // Integrated to resolve <hpo-ui-help-button> or <app-help-button>
  ],
  templateUrl: './load-ontology.component.html',
  styleUrls: ['./load-ontology.component.scss']
})
export class LoadOntologyComponent {
  // Required Signal Inputs
  title = input.required<string>();          // e.g., "Ontology"
  label = input.required<string>();          // e.g., "HPO" or "GO"
  isLoading = input.required<boolean>();
  isLoaded = input.required<boolean>();
  statusMessage = input.required<string>();

  // Optional Signal Inputs with defaults
  termCount = input<number | undefined>(undefined);
  helpUrl = input<string>('https://p2gx.github.io/phenoboard/help/start.html');
  helpLines = input<string[]>(['Select the ontology file.']);

  // Modern Output API
  onLoad = output<void>();
}