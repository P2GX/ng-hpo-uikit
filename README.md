# ng-hpo-uikit

Angular HPO Application UI Toolkit

See the [Documentation](https://p2gx.github.io/ng-hpo-uikit/).

## Development server

To test a component

```bash
npx ng build ng-hpo-uikit
kill -9 $(lsof -t -i:4200)
npx ng serve components-sandbox
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

To generate a comonent, consider

```bash
npx ng generate component orcid-dialog --project=ng-hpo-uikit
```

## VitePress

npm install -D vitepress
