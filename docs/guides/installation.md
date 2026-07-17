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

## Determining the correct version of angular etc to install in applications

The peer dependencies in the package.json of this library determine what
angular versions the library can be used with.
```json
 "peerDependencies": {
    "@angular/common": "^21.2.0",
    "@angular/core": "^21.2.0",
    "@angular/material": "^21.2.0",
    "@angular/platform-browser": "^21.2.0",
    "@tauri-apps/plugin-opener": "^2.0.0"
  },
```

This means that we can can an version of angular/common that is at at least 21.2.0 but less than version 22 (and so on for the other libraries). In our application, we can look for the latest version that satisfies this:

```bash
npm view @angular/material versions --json | grep '21\.2\.'
  "21.2.0-next.0",
  "21.2.0-next.1",
  "21.2.0-next.2",
  (...)
  "21.2.12",
  "21.2.13",
  "21.2.14",
%
```

In this case, we would choose 21.2.14, and install like this:
```bash
npm install @angular/material@21.2.14 @angular/cdk@21.2.14 --save-exact
```

The `--save-exact` argument means means npm writes the exact version number into package.json, instead of the default caret range. Without it we would get
```json
"@angular/material": "^21.2.14"
```
with it we get
```json
"@angular/material": "21.2.14"
```

This is because applications benefit from pinning exact versions so builds are reproducible.


## Ensuring that an application uses the latest version of ng-hpo-uikit
Delete the existing package, uninstall it, reinstall fresh from the dist-build branch

```bash
npm uninstall ng-hpo-uikit --legacy-peer-deps
rm -rf node_modules/ng-hpo-uikit
npm install ng-hpo-uikit@github:P2GX/ng-hpo-uikit#dist-build --legacy-peer-deps
```

Check things worked:
```bash
# check
head node_modules/ng-hpo-uikit/package.json 
{
  "name": "ng-hpo-uikit",
  "version": "0.2.42",
  (..)
```
