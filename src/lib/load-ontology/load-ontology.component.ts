import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpButtonComponent } from '../help-button/help-button.component';

@Component({
  selector: 'ui-load-ontology',
  standalone: true,
  imports: [
    CommonModule, 
    HelpButtonComponent 
  ],
  templateUrl: './load-ontology.component.html',
  styleUrls: ['./load-ontology.component.scss']
})
export class LoadOntologyComponent {

  label = input.required<string>();          // e.g., "HPO" or "MAxO"
  isLoading = input.required<boolean>();
  isLoaded = input.required<boolean>();
  statusMessage = input.required<string>();

  termCount = input<number | undefined>(undefined);
  helpUrl = input<string>('https://p2gx.github.io/phenoboard/help/start.html');
  helpLines = input<string[]>(['Select the ontology file.']);

  onLoad = output<void>();
}