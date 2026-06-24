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
# alternatively
pkill -f "node|nx|tauri"
```


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