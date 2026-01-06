# Forms: Reactive Integration

Integrating custom components with Angular Reactive Forms is a common requirement for enterprise applications. This example shows how to synchronize the `rm-range-slider` with a `FormGroup`.

## The Challenge

Since the component doesn't implement `ControlValueAccessor` (CVA) yet, it cannot be used directly with `formControlName`. Instead, we use a synchronization pattern.

## The Sync Pattern

1.  **Input Binding**: We bind the slider's `startValue` and `endValue` to the form control values.
2.  **Output Listener**: We use the `onValueChanged` event to `patchValue` back to the form.
3.  **Preventing Loops**: We use `{ emitEvent: false }` when patching to the form to avoid unnecessary change detection cycles if you are listening to `valueChanges`.

## Code Example

```typescript
onSliderChange(range: MINMAX) {
  this.rangeForm.patchValue({
    min: range.min,
    max: range.max
  }, { emitEvent: false });
}
```

## Benefits of this approach

- **Unified State**: The `FormGroup` remains the single source of truth for the entire form.
- **Two-Way Sync**: Updating the form manually (e.g., via the input fields) automatically updates the slider handles.
- **Standard Validation**: You can still use standard Angular validators on the underlying form controls.

---

### Key Takeaway
Manual synchronization with `patchValue` is a clean and robust way to integrate non-CVA components into Reactive Forms.
