# Release

This page discusses how we release the library code on GitHub. We will create a release that will have just the compiled distribution artifacts.

The GitHub Actions is appended to the documentation action (deploy.yml).

```yml
- name: Install Dependencies
        run: npm ci

      - name: Compile Angular Library Distribution
        run: npx ng build ng-hpo-uikit --configuration production

      - name: Deploy Built Library Assets to dist-build Branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist/ng-hpo-uikit # Points directly to your compiled package output
          publish_branch: dist-build # Creates a pristine branch containing only the compiled JS package
```


Users need to add the following to the `package.json` file of their application (Replace `your-github-username`):

```json
"dependencies": {
  "ng-hpo-uikit": "github:P2GXng-hpo-uikit#dist-build"
}
```

## Public API

Recall that all components need to be made public by a corresponding entry in the `public-api.ts` file.


## Documentation

Test new documentation locally using

```bash
npm run docs:dev
```


## Rebuild compodocs database

```bash
npx compodoc -p .storybook/tsconfig.json
```