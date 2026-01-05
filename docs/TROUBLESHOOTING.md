# Troubleshooting Guide

Find solutions to common issues encountered when setting up or using `rm-range-slider`.

## Visibility & Layout Issues

### Issue: The slider is not appearing on the page.
**Potential Solutions:**
1.  **Check Height/Width:** Ensure the parent container of the slider has a defined width. The slider will expand to fill its container's width but has a minimal height.
2.  **Angular Material Theme:** Verify that you have imported an Angular Material theme in your global styles. Without a theme, the Material components used internally might have `display: none` or zero opacity.
3.  **Module Import:** Ensure `RmRangeSliderComponent` is present in your component's `imports` array (for standalone) or the `@NgModule` imports.

### Issue: Styles look "broken" or inconsistent with Material Design.
**Potential Solutions:**
1.  **Peer Dependencies:** Ensure you have `@angular/material` and `@angular/cdk` installed.
2.  **Global Styles:** Make sure you aren't applying aggressive CSS resets that might be stripping styles from the internal `mat-slider` or thumb elements.

---

## Behavior & Event Issues

### Issue: `onValueChanged` isn't firing.
**Potential Solutions:**
1.  **Syntax Check:** Ensure you are using the correct event binding syntax: `(onValueChanged)="myHandler($event)"`.
2.  **Disabled State:** Check if the `[disabled]="true"` input is being applied accidentally.

### Issue: Min and Max handles can overlap.
**Explanation:**
The slider allows thumbs to get close to each other.
**Solution:**
Implement a minimum gap in your change handler:

```typescript
onRangeChange(range: MINMAX) {
  const MIN_GAP = 5;
  if (range.max - range.min < MIN_GAP) {
    // You can either reject the update or manually adjust the values
    return; 
  }
  this.currentRange = range;
}
```

---

## Form Integration Issues

### Issue: Reactive Form doesn't update when the slider moves.
**Solution:**
`rm-range-slider` does not currently implement `ControlValueAccessor` directly. You must manually sync the values using the `onValueChanged` event. See the [Advanced Configuration](./ADVANCED_CONFIGURATION.md) guide for a code example.

---

## Performance Issues

### Issue: The page feels "laggy" while dragging.
**Potential Solutions:**
1.  **Debounce:** If you are performing heavy operations in the `onValueChanged` handler, use a debounce or switch to the `rangeChanged` event.
2.  **OnPush:** Ensure your component is using `ChangeDetectionStrategy.OnPush`.
3.  **Complex Templates:** If you have many deep-nested components updating simultaneously with the slider, consider moving the slider labels into their own small component to isolate change detection.

---

## Still having trouble?

If you can't find a solution here, please check our [FAQ](./FAQ.md) or open an issue on our [GitHub Repository](https://github.com/malikrajat/rm-range-slider/issues).
