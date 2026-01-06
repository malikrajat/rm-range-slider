# Performance Optimization

`rm-range-slider` is engineered for high performance, but there are several ways you can further optimize its impact on your application.

## Bundle Size Impact

We strive to keep the library core as small as possible. By leveraging tree-shaking and avoiding heavy external dependencies, the impact on your production bundle is minimal.

| Metric | Estimated Size |
| :--- | :--- |
| **Library Core (JS + CSS)** | ~3KB (Minified + Gzipped) |
| **Angular Material peer deps** | Varies (depends on your overall Material usage) |

### Tree-Shaking
To ensure you only bundle what you use, always import the component directly:

```typescript
import { RmRangeSliderComponent } from 'rm-range-slider';
```

---

## Rendering Performance

### 1. Passive Value Updates
The library uses a "passive" update mechanism where the main component logic remains idle during a drag. Only the visual elements (thumbs via CSS transforms and labels via property binding) are updated. This allows the browser to maintain a high frame rate even on complex pages.

### 2. Change Detection Strategy
By using `ChangeDetectionStrategy.OnPush` in your components that host the slider, you prevent Angular from checking the slider's state unless an Input change or an Event occurs.

```typescript
@Component({
  selector: 'app-heavy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

---

## Efficient Event Handling

### Use `rangeChanged` for Heavy Tasks
The `onValueChanged` event is fired continuously. For tasks like:
*   Fetching data from a server
*   Performing heavy filtering on a list of 1000+ items
*   Updating a database

Use the `rangeChanged` event instead, which only fires once the user has finished dragging and released the thumb.

```html
<rm-range-slider
  (onValueChanged)="updateLocalLabels($event)"
  (rangeChanged)="triggerExpensiveBackendCall($event)"
></rm-range-slider>
```

---

## Lazy Loading

If the slider is used in a feature that isn't required on initial page load (e.g., an "Advanced Filters" modal), consider lazy loading the component to speed up your initial Time-to-Interactive (TTI).

```typescript
// Example of lazy loading using Angular's dynamic import
async loadSlider() {
  const { RmRangeSliderComponent } = await import('rm-range-slider');
  // Logic to dynamically create or display the component
}
```