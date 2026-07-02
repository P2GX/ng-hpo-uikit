# HelpButtonComponent

The HelpButtonComponent provides consistent, contextual interactive help micro-dialogs across curation dashboards. It displays custom formatted help strings using standard Angular Material overlay popovers and safely redirects to specialized external documentation pages.

### Features

* **Modern Tooling:** Built completely utilizing Angular’s native Signals architecture and modern control flow.
* **Tauri Integration:** Employs the secure @tauri-apps/plugin-opener layer to ensure web URLs trigger cleanly inside the desktop user's native system web browser.
* **Flexible Text Injection:** Supports HTML strings via un-encapsulated template routing ([innerHTML]).
* **Global Overlays:** Employs ViewEncapsulation.None to bypass standard component style shadow gates, allowing customization of the detached Material overlay menu pane.

## API Summary

* Selector

```typescript
<lib-help-button></lib-help-button>
```

### Inputs

| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `title` | `Signal<string>` | **Yes** | The header text displayed prominently inside the popover. |
| `lines` | `Signal<string[]>` | **Yes** | An array of instructional paragraphs. Supports custom HTML (e.g., `<strong>`, `<code>`). |
| `helpUrl` | `Signal<string \| undefined>` | **No** | An optional fully qualified web address linking out to documentation. |


## Implementation Context Examples


**Basic Usage**

For a simple structural notification block with raw text instructions:

```html
<lib-help-button 
  title="Phenotype Matching" 
  [lines]="['Select a valid HPO term to begin analysis.', 'Matches require an active network hook.']" />
```

** Advanced Usage with Rich HTML and Documentation Links

For complex clinical curation notes requiring hyperlinks and text emphasis:

```html
<lib-help-button 
  title="ORCID Authentication" 
  [lines]="[
    'An <strong>ORCID iD</strong> ensures correct author curation attribution.',
    'Format must follow: <code>0000-0000-0000-0000</code>'
  ]" 
  helpUrl="https://p2gx.github.io/phenoboard/help/start.html#orcid" />
```

## Architectural Layout and Layout Style Alignment

The layout uses a flex wrapper inside the detached overlay portal tree. Ensure your global styles accommodate the custom panel designation hook:

```scss
/* Ensure this layer is exposed globally to style the material overlay container */
.help-bubble-menu {
  max-width: 280px !important;
  border-radius: 8px !important;
  
  .help-content {
    padding: 12px 16px;
    
    .help-title { font-weight: 600; margin-bottom: 8px; }
    .help-text { font-size: 0.85rem; line-height: 1.4; color: #555555; }
    .btn-docs { color: #0288d1; display: flex; align-items: center; gap: 6px; }
  }
}
``` 