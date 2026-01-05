# Range Validation & Constraints

Building a robust UI requires more than just displaying values; you often need to enforce business rules. This example shows how to validate the range selection and provide visual feedback for invalid states.

## Scenarios

1.  **Minimum Gap**: Enforcing that the minimum and maximum values are not too close to each other.
2.  **Visual Feedback**: Using CSS classes and animations (like a shake effect) to notify the user of an invalid state.
3.  **State Protection**: Distinguishing between the "visual" state of the slider and the "valid" state of the data.

## Implementation Pattern

```typescript
validateAndNotify(newRange: MINMAX) {
  if (newRange.max - newRange.min < MIN_GAP) {
    this.isInvalid = true;
  } else {
    this.isInvalid = false;
  }
  this.range = newRange;
}
```

## CSS Feedback

The example uses a `shaking` animation when the range becomes invalid, which is a common UX pattern to draw the user's attention to a mistake in real-time.

---

### Key Takeaway
Validation should happen in the host component's logic. Use the `onValueChanged` event to intercept changes and apply your business rules before submitting or processing the data.
