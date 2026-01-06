# Advanced: Date Range Selection

This example demonstrates how to adapt the `rm-range-slider` for non-numeric data, such as dates, by using a numeric mapping strategy.

## The Strategy

Since the slider works with `number` types, we represent a date range by:
1.  Defining a baseline (e.g., "30 days ago" = 0, "Today" = 30).
2.  Using the slider values as an offset from that baseline.
3.  Converting the numeric values back to `Date` objects in the UI/Logic.

## Key Features

- **Dynamic Formatting**: We use a `formatDate()` helper function to turn numbers into readable strings.
- **Computed Context**: We calculate the "Selected Period" in days based on the difference between `max` and `min`.
- **Modern Styling**: Demonstrates how to wrap the slider in a more complex, styled container.

## Code Highlights

```typescript
formatDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - (30 - daysOffset));
  return date.toLocaleDateString();
}
```

---

### Key Takeaway
You can use `rm-range-slider` for any linear data set (Time, Dates, Weight, Distance) as long as you can map it to a numeric scale.
