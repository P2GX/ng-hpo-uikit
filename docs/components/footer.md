# Shared Footer Component

The `SharedFooterComponent` provides a unified, responsive structural footer for layout boundaries across biocuration interfaces. It abstracts brand identity and software version tracking into consistent visual layouts while allowing individual applications to retain control over dynamic documentation targets and repository problem logs.

## Core Features
* **Modular Architecture:** Fully independent layout built on modern Angular signal-based inputs—isolated completely from window environments.
* **Contextual Help Hooks:** Emits structural events rather than managing application navigation state, remaining highly portable between distinct app workflows.
* **Adaptive Versioning:** Accepts declarative runtime strings for versioning, repository targets, and branding definitions.

---

## Technical Implementation

### 1. Library Interface Configuration (`ng-hpo-uikit`)

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-shared-footer',
  standalone: true,
  templateUrl: './shared-footer.component.html',
  styleUrl: './shared-footer.component.scss'
})
export class SharedFooterComponent {
  // Declarative metadata inputs
  public appName = input.required<string>();
  public appVersion = input.required<string>();
  public gitHubIssuesUrl = input.required<string>();
  public currentYear = input<number>(2026);

  // Structural events emitted to host application context
  public helpRequested = output<void>();

  public onHelpClick(): void {
    this.helpRequested.emit();
  }
}
```

### 2. Template Markup Layout

```typescript
<footer class="site-footer">
  <div class="footer-content">
    <p>&copy; {{ currentYear() }} {{ appName() }} v{{ appVersion() }}</p>
    
    <button 
      type="button"
      (click)="onHelpClick()"
      class="footer-link"
      title="Open dynamic documentation context"
    >
      <span>Help</span>
      <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <a
      [href]="gitHubIssuesUrl()"
      target="_blank"
      rel="noopener noreferrer"
      class="footer-link"
      title="File workspace bug reports via GitHub Issues"
    >
      <span>Report bug</span>
      <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 8l1.5-1.5M5 8L3.5 6.5M12 1v2M12 5a4 4 0 00-4 4v2H8 a4 4 0 008 0h0V9a4 4 0 00-4-4zM4 13h16M4 17h16M12 21v2" />
      </svg>
    </a>
  </div>
</footer>
```

## Host Integration Reference

### Single-Page Application (SPA) Active Path Tracking

To maintain a single layout footer component while routing across varied UI modules, pass the execution state to the master application root controller. The host resolves context-dependent URLs matching the runtime active router configuration before pushing to the desktop runtime.

Controller Setup (app.component.ts)

```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedFooterComponent } from 'ng-hpo-uikit';
import { open as openExternalBrowser } from '@tauri-apps/plugin-shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedFooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);

  /**
   * Evaluates the current active route of the SPA and shifts
   * the user out to targeted documentation anchor positions.
   */
  public async handleHelpNavigation(): Promise<void> {
    const currentRoute = this.router.url;
    let documentationAnchor = '';

    if (currentRoute.includes('settings')) {
      documentationAnchor = '#biocurator-profiles';
    } else if (currentRoute.includes('phenotype')) {
      documentationAnchor = '#hpo-distribution-analysis';
    } else {
      documentationAnchor = '#general-overview';
    }

    const documentationTarget = `https://p2gx.github.io/phenoboard/help/${documentationAnchor}`;
    
    try {
      // Execute window breakout over the Tauri sidecar bridge
      await openExternalBrowser(documentationTarget);
    } catch (error) {
      console.warn('System shell execution missing, opening browser window instead.', error);
      window.open(documentationTarget, '_blank', 'noopener,noreferrer');
    }
  }
}
```

### Application Declarative Usage (app.component.html)

```typescript
<main class="workspace-viewport">
  <router-outlet></router-outlet>
</main>

<lib-shared-footer
  appName="Phenoboard"
  appVersion="1.4.0"
  gitHubIssuesUrl="[https://github.com/P2GX/phenoboard/issues/new](https://github.com/P2GX/phenoboard/issues/new)"
  (helpRequested)="handleHelpNavigation()"
></lib-shared-footer>
```

## API Reference Matrix

### Inputs
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | *Required* | System name rendered in copyright statement. |
| `appVersion` | `string` | *Required* | Current compiled app semver string. |
| `gitHubIssuesUrl` | `string` | *Required* | Destination link for tracking new package structural bug issues. |
| `currentYear` | `number` | `2026` | Tracking year attached to copyright declarations. |

### Outputs
| Event | Payload Type | Trigger Condition |
| :--- | :--- | :--- |
| `helpRequested` | `void` | Fired when the interactive help button is selected by the user. |
