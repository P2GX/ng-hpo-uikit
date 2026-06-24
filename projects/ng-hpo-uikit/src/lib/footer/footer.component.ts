import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-shared-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  public appName = input.required<string>();
  public appVersion = input.required<string>();
  public gitHubIssuesUrl = input.required<string>();
  public currentYear = input<number>(2026); // Sensible default

  public helpRequested = output<void>();

  onHelpClick(): void {
    this.helpRequested.emit();
  }
}