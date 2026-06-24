import { Component, input, ViewEncapsulation } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { openUrl } from '@tauri-apps/plugin-opener'; 

@Component({
  selector: 'ui-help-button', // Generalized for library usage
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

  /* Open page safely in system browser via Tauri opener */
  async openDocs() {
    const url = this.helpUrl();
    if (url) {
      try {
        await openUrl(url);
      } catch (err) {
        console.error("Failed to open documentation via Tauri Opener:", err);
      }
    }
  }
}