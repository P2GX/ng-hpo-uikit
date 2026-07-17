# HelpButtonComponent

A small help button that opens a native popover with contextual instructions and an optional link to further documentation.

### Usage

The minimal setup is as follows.
```html
<hpo-help-button 
  title="Phenotype Matching" 
  [lines]="['Select a valid HPO term to begin analysis.', 'Matches require an active network hook.']" />
```

We can also provide an external link

```html
<hpo-help-button 
  title="ORCID Authentication" 
  [lines]="[
    'An <strong>ORCID iD</strong> ensures correct author curation attribution.',
    'Format must follow: <code>0000-0000-0000-0000</code>'
  ]" 
  helpUrl="https://p2gx.github.io/phenoboard/help/start.html#orcid" />
```



### Inputs

| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `title` | `string` | **Yes** | Header text shown at the top of the popover. |
| `lines` | `string[]` | **Yes** | Instructional paragraphs. Supports HTML (e.g. `<strong>`, `<code>`). |
| `helpUrl` | `string` | No | If provided, adds a "Learn more" button linking to this URL. |


