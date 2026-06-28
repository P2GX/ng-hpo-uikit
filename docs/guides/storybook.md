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

```bash
npx ng run ng-hpo-uikit:storybook
```