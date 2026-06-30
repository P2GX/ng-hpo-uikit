# Installation

To use components of this library in angular (including Tauri) applications, add the following line to the `package.json` file of their application:


```json
"dependencies": {
  "ng-hpo-uikit": "github:P2GX/ng-hpo-uikit#dist-build"
}
```

Then, all of the modules provided by this library can be used in components. For instance, `OrcidDialogComponent`, add  the following import statement.

```typescript
import { OrcidDialogComponent } from 'ng-hpo-uikit';
```


## Updates
After this library has been updated, it will be necessary to pull in the latest version for applications

```bash
npm install
```
or to update the library and mitigate minor version conflicts
```bash
npm update --legacy-peer-deps
```


## Demonstration

See the [storybook](storybook.md) page.

# Reset

Sometime, the versions of angular or dependencies see to get out of whack, and a reset can do wonders.

```bash
# Clear npm's internal cache
npm cache clean --force

# Delete the node_modules folder and package lock
rm -rf node_modules package-lock.json

# Clear Nx's local cache folder
rm -rf .nx/cache
npm install --legacy-peer-deps
```

# Styles

Add this to  the host application's styles.scss
```css
@import 'ng-hpo-uikit/styles/styles.scss';
```

