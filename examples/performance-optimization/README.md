# Performance: Debounced Filtering

In applications with large datasets or remote APIs, triggering a search on every single pixel movement of the slider can lead to severe performance degradation. This example shows how to use RxJS to optimize these updates.

## The Problem

The `onValueChanged` event fires rapidly (potentially 60+ times per second) during a drag operation. This is great for smooth UI labels but bad for:
- Database queries
- Heavy array filtering (`Array.filter`)
- Network requests

## The Solution: RxJS `debounceTime`

By piping the slider events into a `Subject` and applying a debounce, we ensure that the "heavy" logic only runs after the user has stopped moving the handle for a specific duration (e.g., 400ms).

## Key Implementation Steps

1.  **Create a Subject**: `private rangeSubject = new Subject<MINMAX>();`
2.  **Subscribe with Pipe**:
    ```typescript
    this.rangeSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(...)
    ```
3.  **Push Values**: In the component template, `(onValueChanged)="rangeSubject.next($event)"`.

## Metrics Shown

The example provides a live comparison between the number of raw slider events and the actual number of filter executions, demonstrating a significant reduction in computational load.

---

### Key Takeaway
Always decouple UI state (labels) from business logic (filtering/API) when using interactive components like sliders.
