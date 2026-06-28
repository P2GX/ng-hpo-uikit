# Storybook

This page discusses some tips for using storybook to test new components.

### Installation

Install the package from the root directory.

```bash
npx storybook@latest init
```


### Creating a story file

Create a file such as `hpo-annotation-polisher.stories.ts` in the same directory as the component (in this case, `hpo-annotation-polisher.component.ts`). You can view the example there to get started.


### Launch the development server

First build

```bash
npx ng build ng-hpo-uikit --configuration production
```
and then run
```bash
npx ng run ng-hpo-uikit:storybook
```



### Exit server

It may be necessary to kill server processes (all related to node).

```bash
killall node 2>/dev/null
``` 