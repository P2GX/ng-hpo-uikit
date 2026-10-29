# Age Selector (hpo-age-selector)

`HpoAgeSelectorComponent` lets a curator enter an age, for example the age of onset of a phenotypic feature or the age at last encounter.

## Summary

The component renders a button. It shows "+Add Age of Onset" while no age is set, and the selected age afterwards. Clicking the button opens a dialog with two parts:

- **Choose existing:** the ages already in use, shown as clickable tags.
- **Create new:** a text field with suggestions. The user types an age and presses Enter or **Use**.

When the user picks or enters a valid age, the component emits it through `onsetChanged`.

### Accepted age formats

| Format | Examples |
| :--- | :--- |
| HPO onset label | `Infantile onset`, `Congenital onset` |
| ISO 8601 duration | `P1Y6M`, `P35Y`, `P10D` |
| Gestational age | `G20w`, `G32w3d` |
| Not available | `na` |
| Informal text (converted to ISO 8601) | `4y2m` becomes `P4Y2M`; `11.5` or `3 w` is not accepted unless it has a unit |

Anything else is rejected with an error message.

## Requirements from the host app

1. **Feed the value back.** The component does not keep the selected age itself. Store the emitted value and pass it back through `selectedOnset`, or the button never changes.
2. **Show error messages.** Invalid input is reported through the library's [NotificationService](./notification-service.md). Put `<app-toast-container />` once in your app, for example in the root component, or the user sees nothing.
3. **Optional:** the "existing" tags come from `AgeService`. Seed them at startup with `AgeService.addSelectedTerms(['Infantile onset', 'P1Y'])`. `AgeService` is shared by the whole app.

## Usage

```html
<hpo-age-selector
  [selectedOnset]="onset()"
  size="small"
  (onsetChanged)="onset.set($event)" />

<app-toast-container />
```

```typescript
import { HpoAgeSelectorComponent, ToastContainerComponent } from 'ng-hpo-uikit';

@Component({
  imports: [HpoAgeSelectorComponent, ToastContainerComponent],
  /* … */
})
export class MyComponent {
  onset = signal<string | null>(null);
}
```

## Inputs

| Input Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `selectedOnset` | `string \| null` | `null` | The age currently shown on the button, and pre-filled in the dialog. |
| `size` | `'normal' \| 'small'` | `'normal'` | Use `'small'` for dense layouts such as table rows. |
| `disabled` | `boolean` | `false` | Disables the button, so the dialog cannot be opened. |

## Outputs

| Output Name | Type | Description |
| :--- | :--- | :--- |
| `onsetChanged` | emits `string` | Emitted when the user picks an existing age or submits a valid new one. Cancelling the dialog emits nothing. |

## Link to Storybook

Interactive examples: run

```bash
npm run storybook
```

## Styling

The component carries its own styles. It currently reads no CSS variables.