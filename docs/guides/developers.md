# Developers

This page provides some explanations for developers.

## File format
Use the prettier app
```bash
npx prettier --write path/to/your/file.js
```


# Multiple angular core libraries

We can import a component from this library and use it in anapplication like this
```html
<hpo-help-button
    title="Entering HPO data"
    [lines]="[
        'Copy text describing the clinical manifestations of the individual and paste it into the dialog that will appear upon clicking <b>+ Add HPO Annotations</b>.',
        'Enter only text that is specific to the individual. The text mining dialog will allow you to add additional HPO terms as required.',
    ]"
    helpUrl="https://obophenotype.github.io/human-phenotype-ontology/clinicians/HPO_term_selection/"
/>
```

VS Code may underline the arguments (e.g., `title`) and show and error like this
```bash
Property '__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@2523' does not exist on type 'InputSignal<string[]>'. Did you mean '__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@4842'?ngtsc(2551)
```

The application will still run.

We can address this by searching for how many times were are pulling in the angular core libraries
```bash
 npm ls @angular/core
phenoboard@0.6.17 /Users/peterrobinson/GIT/phenoboard
├─┬ @angular-devkit/build-angular@21.2.7
│ ├─┬ @angular/build@21.2.7 invalid: "21.2.18" from node_modules/@angular-devkit/build-angular, "21.2.18" from node_modules/@nx/angular
│ │ └── @angular/core@21.2.9 deduped
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/animations@21.2.9
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/cdk@21.2.14
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/common@21.2.9
│ └── @angular/core@21.2.9 deduped
├── @angular/core@21.2.9
├─┬ @angular/forms@21.2.9
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/material@21.2.14
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/platform-browser-dynamic@21.2.9
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/platform-browser@21.2.9
│ └── @angular/core@21.2.9 deduped
├─┬ @angular/router@21.2.9
│ └── @angular/core@21.2.9 deduped
└─┬ @storybook/angular@10.5.2
  └── @angular/core@21.2.9 deduped
```







