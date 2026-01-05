# Best Practices & Guidelines

To get the most out of `rm-range-slider` and ensure a smooth experience for your users, follow these recommended patterns and avoid common pitfalls.

## Component Design

### 1. Use Reactive Patterns
Lean into Angular's reactive nature. instead of using local variables, consider using `Subject`s or `Signal`s to manage the slider state.

```typescript
// Good practice: Using RxJS for value streams
range$ = new BehaviorSubject<MINMAX>({ min: 10, max: 90 });

onRangeUpdate(range: MINMAX) {
  this.range$.next(range);
}
```

### 2. Provide Contextual Labels
While the slider provides visual feedback, users with screen readers or those who need precision benefit from large, clear labels indicating the current numeric values.

```html
<div class="slider-group">
  <div class="display">Selected: {{range.min}}% to {{range.max}}%</div>
  <rm-range-slider ...></rm-range-slider>
</div>
```

---

## Performance Optimization

### 1. Debounce API Calls
The `onValueChanged` event fires rapidly during a drag operation. If you are triggering an API search or complex data filtering, **always debounce the action**.

```typescript
// Essential for performance
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

ngOnInit() {
  this.searchCriteria$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(values => this.performSearch(values));
}
```

### 2. Use `OnPush` Change Detection
If your component tree is large, set `changeDetection: ChangeDetectionStrategy.OnPush`. `rm-range-slider` is designed to work seamlessly with `OnPush`, reducing unnecessary checks across your application.

---

## Accessibility (A11y)

Ensuring your UI is inclusive is critical. `rm-range-slider` includes several built-in accessibility features, but you can enhance them:

1.  **ARIA Labels:** Wrap the slider in a container with an `aria-label` or use `aria-labelledby` to describe what the range selection represents (e.g., "Price Range Selection").
2.  **Live Regions:** For users with screen readers, consider using an `aria-live="polite"` region to announce value changes if they are critical to the page content.
3.  **Keyboard Navigation:** `rm-range-slider` supports keyboard interactions (Arrow keys, Page Up/Down, Home/End). Ensure you don't block these events in parent components.

---

## Things to Avoid

*   **Avoid Manual DOM Manipulation:** Don't try to select slider thumbs or tracks via `document.querySelector` to apply styles or read values. Use the provided Input/Output API.
*   **Don't Over-Validate during Drags:** While validation is important, performing complex calculations or deep-object comparisons during the `onValueChanged` event can cause "jank" and drop your frame rate.
*   **Avoid Magic Numbers:** Use constants for your `min`, `max`, and `step` values to make your code more maintainable.

```typescript
// Avoid this
<rm-range-slider [min]="0" [max]="500" [step]="5">

// Prefer this
const MIN_PRICE = 0;
const MAX_PRICE = 500;
const PRICE_INCREMENT = 5;

<rm-range-slider [min]="MIN_PRICE" [max]="MAX_PRICE" [step]="PRICE_INCREMENT">
```