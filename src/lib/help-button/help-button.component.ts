import { Component, input, ViewEncapsulation } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-help-button', // Generalized for library usage
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  encapsulation: ViewEncapsulation.None, // Essential for styling mat-menu panelClasses globally
  templateUrl: './help-button.component.html',
  styleUrl: './help-button.component.scss'
})
export class HelpButtonComponent {
  title = input.required<string>();
  lines = input.required<string[]>();
  helpUrl = input<string>();

  /* Open page safely in system browser via Tauri opener, or a new tab otherwise */
  async openDocs() {
    const url = this.helpUrl();
    if (!url) {
      return;
    }
    try {
      // Use the tauri opener if available in the application, but do not import it in this library
      // requires that @tauri-apps/plugin-opener be declared optional in package.json
      if ('__TAURI_INTERNALS__' in window) {
        const { openUrl } = await import('@tauri-apps/plugin-opener');
        await openUrl(url);
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Failed to open documentation:', err);
    }
  }
}