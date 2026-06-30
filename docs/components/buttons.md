# HPO UI Kit — Button System Documentation

This library uses a two-tier CSS architecture powered by Sass. All structural infrastructure (sizing, padding, focus rules, and disabled states) is standardized inside a base class, while semantic colors are exposed via clear, individual utility classes.

| Class Class Name | Purpose | Example Usage |
| :--- | :--- | :--- |
| `.btn-outline-primary` | Main interactive actions (e.g., triggers, runs, saves). | `Run HPO Text Mining`, `Analyze` |
| `.btn-outline-cancel` | Neutral or secondary actions (e.g., closing drawers, resetting states). | `Cancel`, `Clear`, `Back` |



## 1. Primary Action Button
Use this for the main functional trigger in a component.

```html
<button class="btn-outline-primary">
  Run HPO Text Mining
</button>
```
The button can be shown as disabled

```html
<button class="btn-outline-primary" [disabled]="isMining">
  Run HPO Text Mining
</button>
````

## 2. Secondary/Cancel Button
```html
<button class="btn-outline-cancel">
  Cancel
</button>
```

## Layout Standard Behavior

* **Alignment:** All buttons use inline-flex with centered vertical baselines. This ensures that text matches up perfectly even if you add an SVG icon inside the button tag down the road (e.g., <button class="btn-outline-primary"><mat-icon>search</mat-icon> Run Mining</button>).
* **Sizing:** Buttons use a uniform height baseline dictated by an exact padding ratio (8px 16px) and a uniform font size (14px). This prevents button height jump across different views.
