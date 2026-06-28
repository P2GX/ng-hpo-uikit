import { Component, computed, inject, input, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'lib-shared-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private sanitizer = inject(DomSanitizer);
  public appName = input.required<string>();
  public appVersion = input.required<string>();
  public gitHubIssuesUrl = input.required<string>();
  public currentYear = input<number>(2026); // Sensible default

  public helpRequested = output<void>();

   protected sanitizedIssuesUrl = computed(() => 
    this.sanitizer.bypassSecurityTrustUrl(this.gitHubIssuesUrl())
  );

  onHelpClick(): void {
    this.helpRequested.emit();
  }

 
}