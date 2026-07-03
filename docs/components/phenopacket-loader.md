# Phenopacket Loader Component

The `PhenopacketLoaderComponent` provides a clean, standalone drop-and-load file interface designed to handle drag-and-drop actions or native browse selections of GA4GH Phenopacket JSON profiles.

## Basic Implementation

To maintain clean separation of concerns and avoid coupling your component library to explicit system wrappers, this widget delegates processing logic to a callback handler passed into an explicit Angular signal input.

### Component Controller Configuration

```typescript
import { Component, signal } from '@angular/core';
import { PhenopacketLoaderComponent } from 'ng-hpo-uikit';
import { invoke } from '@tauri-apps/api/core';

@Component({
  selector: 'app-new-case-workspace',
  standalone: true,
  imports: [PhenopacketLoaderComponent],
  templateUrl: './new-case-workspace.component.html'
})
export class NewCaseWorkspaceComponent {
  public statusMessage = signal<string | null>(null);
  public isProcessing = signal<boolean>(false);

  /**
   * Agnostic callback pipeline passed into the library component.
   * Defined as an arrow function to preserve class contextual execution bounds safely.
   */
  public handleBackendIngest = async (payload: string): Promise<void> => {
    try {
      this.isProcessing.set(true);
      this.statusMessage.set('Forwarding schema text payload to native Rust engine...');
      
      // IPC invocation bridging data to the serde deserializer
      const response = await invoke<string>('ingest_phenopacket', { payload });
      
      this.statusMessage.set(`Success: ${response}`);
    } catch (error) {
      this.statusMessage.set(`Backend parsing validation failure: ${error}`);
    } finally {
      this.isProcessing.set(false);
    }
  };
}
```

### Template Layout

```html
<div class="workspace-panel">
  <h2>Import Case Data</h2>
  
  <hpo-phenopacket-loader 
    [onIngest]="handleBackendIngest">
  </hpo-phenopacket-loader>

  @if (statusMessage()) {
    <div class="feedback-toast" [class.loading]="isProcessing()">
      {{ statusMessage() }}
    </div>
  }
</div>
```

## Component API Reference

### Inputs

 The component uses explicit modern Angular input signal properties. The callback is required to guarantee platform-agnostic portability.

 | Input | Type Definition | Description |
| :--- | :--- | :--- |
| `onIngest` | `(payload: string) => Promise<void> \| void` | **Required.** A handler function executed automatically whenever a valid JSON profile is extracted by the template file reader. Passes the raw text payload string as its primary argument. |

### Internal Reactive State Table Markdown

The structural block applies a matching helper class context depending on active layout tracking parameters. You can style these overrides via local host pipelines.

| Signal Token | Type | UI Representation |
| :--- | :--- | :--- |
| `isDragging` | `boolean` | Flips to `true` when a file asset hovers over the active drop target boundary, applying the selector class variant `.drop-container--active`. |
| `fileName` | `string \| null` | Stores the normalized lower-case filename string value upon safe ingestion initialization. |
| `errorMessage` | `string \| null` | Tracks and holds native structural processing exceptions (e.g., uploading non-JSON files or picking files that fail raw `JSON.parse` evaluations). |

