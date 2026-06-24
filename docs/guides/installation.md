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
or with minor version conflicts
```bash
npm install --legacy-peer-deps
```


## Demonstration

Most of the components in this library can be seen in the demonstration app. To start it, rull the following commands
to build the library and to start the components sandbox app.



```bash
npx ng build ng-hpo-uikit
npx ng serve components-sandbox
```

You will see a link to a server on local host at port 4200 (by default).

To stop the development server (this is needed to run the above commands more than once), enter the following to
terminate the server:

```bash
kill -9 $(lsof -t -i:4200)
```
