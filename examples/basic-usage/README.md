# Basic Usage: Price Range Filter

This example demonstrates the core functionality of the `rm-range-slider` library. It shows how to implement a standard price filter for a product list.

## Core Concepts

In this example, we use the following features:

1.  **Direct Binding**: We pass `[min]`, `[max]`, `[startValue]`, and `[endValue]` directly to the component.
2.  **Event Handling**: We listen to the `(onValueChanged)` output to update our local state and filter the list in real-time.
3.  **Standalone Integration**: The component is imported directly into a standalone Angular component.

## Code Snippet

```html
<rm-range-slider
  [min]="0"
  [max]="1000"
  [startValue]="range.min"
  [endValue]="range.max"
  (onValueChanged)="onPriceChanged($event)"
></rm-range-slider>
```

## How it works

- The `range` object (type `MINMAX`) holds the current state of the slider.
- Every time the user updates the slider, `onPriceChanged` updates the `range` object.
- The `filteredProducts` getter automatically recalculates whenever the `range` changes, providing a seamless user experience.

---

### Key Takeaway
For simple numeric filtering, the `rm-range-slider` requires zero configuration and works out of the box with sensible defaults.