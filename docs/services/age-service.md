# Age Service

`AgeService` determines which age strings are valid and which ones the
user has chosen so far. It is `providedIn: 'root'`, so every component in the app shares one
instance. The [Age Selector](../components/hpo-age-selector.md) uses it, as do the [phenoboard](https://github.com/P2GX/phenoboard) table editors.

```typescript
import { inject } from '@angular/core';
import { AgeService } from 'ng-hpo-uikit';

private ageService = inject(AgeService);
```

## Accepted formats

| Format | Examples |
| :--- | :--- |
| HPO onset label | `Infantile onset`, `Congenital onset` |
| ISO 8601 duration | `P1Y6M`, `P35Y`, `P10D` |
| Gestational age | `G20w`, `G32w3d` |
| Not available | `na` |

## Remembered ages

The service keeps a list of the ages chosen in this session. The Age Selector shows them as
"Choose existing" tags so the curator can reuse them quickly.

| Member | Description |
| :--- | :--- |
| `selectedTerms` | Read-only signal. The remembered ages. Starts as `['na']`. |
| `allAvailableTerms` | Computed signal. All HPO onset labels plus the remembered ages, used for autocomplete. |
| `addSelectedTerm(term)` / `addSelectedTerms(terms)` | Remember one or more ages. Duplicates are ignored. |
| `removeSelectedTerm(term)` / `removeSelectedTerms(terms)` | Forget ages. |
| `clearSelectedTerms()` | Reset to `['na']`. Call this when the user starts a new cohort. |

Every way of choosing an age in the Age Selector, including clicking an autocomplete
suggestion, adds the age to this list.

## Validating and normalizing

| Method | Description |
| :--- | :--- |
| `validateAgeInput(input)` | `true` if the string is already in one of the accepted formats. |
| `validator()` | Angular `ValidatorFn` using the same rule, for reactive forms. Empty values pass, so combine with `Validators.required`. |
| `normalizeAgeInput(raw)` | Converts free text to a canonical age and validates it. Returns the string, or `null` if invalid. **Use this for user-typed input.** |

`normalizeAgeInput` examples:

| Input | Result |
| :--- | :--- |
| `childhood` | `Childhood onset` |
| `neonate` | `Neonatal onset` |
| `p1y` | `P1Y` |
| `4y2m` | `P4Y2M` |
| `3 w` | `P21D` |
| `g35w1d` | `G35w1d` |
| `garbage` | `null` |

Full-label matching is case-sensitive: `Infantile onset` is accepted, `infantile onset` is not.
Use the short keywords (`infantile` is not one of them, see `AGE_TERM_MAP`) or pick from the suggestions.

## Lower-level helpers

`mapAgeStringToSymbolic`, `mapEtlAgeString`, `mapYmdToIso` and `numericYearToIso` do the
individual conversion steps. Prefer `normalizeAgeInput` unless you need one step on its own.