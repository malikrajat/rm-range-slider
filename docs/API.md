# API Reference

This document provides a detailed technical reference for the `rm-range-slider` library.

## `RmRangeSliderComponent`

The primary component for dual-range value selection.

### Selector
`rm-range-slider`

### Input Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `min` | `number` | `0` | The lower bound of the slider track. |
| `max` | `number` | `100` | The upper bound of the slider track. |
| `startValue` | `number` | `0` | The initial position of the left (minimum) thumb. |
| `endValue` | `number` | `10` | The initial position of the right (maximum) thumb. |
| `disabled` | `boolean` | `false` | Whether the slider is interactive. |
| `step` | `number` | `1` | The increment step for thumb movement. |

### Output Events

| Event | Payload Type | Description |
| :--- | :--- | :--- |
| `onValueChanged` | `EventEmitter<MINMAX>` | Emitted whenever a thumb is moved. Contains the current min and max values. |
| `rangeChanged` | `EventEmitter<MINMAX>` | (v5.0+) Emitted when a thumb is released (drag end). Useful for triggering expensive operations like API calls. |

---

## Interfaces & Types

### `MINMAX`

Represents the state of the slider range.

```typescript
interface MINMAX {
  min: number; // The current value of the left thumb
  max: number; // The current value of the right thumb
}
```

---

## Constants

### `DEFAULT_CONFIG`

Internal configuration object used to initialize the slider with sensible defaults.

| Property | Default Value |
| :--- | :--- |
| MIN | `0` |
| MAX | `100` |
| START | `0` |
| END | `10` |

---

## Technical Considerations

### Rendering Strategy
The component uses a "passive rendering" approach during drags. While a thumb is being moved:
1.  The thumb position is updated via CSS transforms (gpu accelerated).
2.  The label components are updated via standard Angular property binding.
3.  The main component tree is **not** re-rendered, ensuring high FPS.

### Event Throttling
`onValueChanged` is emitted on every pixel/step change. If you need to perform heavy operations based on this value, it is highly recommended to use the `rangeChanged` event or apply an RxJS `debounceTime` operator to the event stream.

---

## Integration Examples

### Binding to the Event
```html
<rm-range-slider
  [min]="0"
  [max]="500"
  [startValue]="100"
  [endValue]="400"
  (onValueChanged)="onSliderUpdate($event)"
></rm-range-slider>
```

### Type Usage in Component
```typescript
import { MINMAX } from 'rm-range-slider';

onSliderUpdate(values: MINMAX) {
  console.log(`Current range: ${values.min} to ${values.max}`);
}
```
