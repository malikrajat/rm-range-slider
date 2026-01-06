# Advanced Configuration

This document covers advanced integration patterns and complex configuration scenarios for `rm-range-slider`.

## Integration with Reactive Forms

To use `rm-range-slider` with Angular's Reactive Forms, you can synchronize the form values using the `onValueChanged` event.

### Example: Form Synchronization

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [ReactiveFormsModule, RmRangeSliderComponent],
  template: `
    <form [formGroup]="filterForm">
      <h4>Price Selection</h4>
      
      <rm-range-slider
        [min]="0"
        [max]="1000"
        [startValue]="filterForm.get('minPrice')?.value"
        [endValue]="filterForm.get('maxPrice')?.value"
        (onValueChanged)="syncFormValues($event)"
      ></rm-range-slider>
      
      <div class="form-inputs">
        <input type="number" formControlName="minPrice">
        <input type="number" formControlName="maxPrice">
      </div>
    </form>
  `
})
export class FilterFormComponent implements OnInit {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      minPrice: [100],
      maxPrice: [500]
    });
  }

  syncFormValues(range: MINMAX) {
    this.filterForm.patchValue({
      minPrice: range.min,
      maxPrice: range.max
    }, { emitEvent: false }); // Avoid infinite loops if you subscribe to valueChanges
  }
}
```

---

## Dynamic Range Boundaries

`rm-range-slider` automatically responds to changes in its `[min]` and `[max]` input properties. This is useful when the available range depends on other selections (e.g., selecting a category that changes the price bounds).

### Handling Bound Shifts

When shifting boundaries dynamically, it's a best practice to ensure your `startValue` and `endValue` still fall within the new bounds:

```typescript
updateBounds(newMin: number, newMax: number) {
  this.absoluteMin = newMin;
  this.absoluteMax = newMax;
  
  // Re-validate current values
  if (this.currentRange.min < newMin) this.currentRange.min = newMin;
  if (this.currentRange.max > newMax) this.currentRange.max = newMax;
}
```

---

## State Management (NgRx / Akita / Signals)

For applications using central state management, dispatch actions in response to slider changes.

### Example: NgRx Integration

```typescript
import { Store } from '@ngrx/store';
import { updateFilterRange } from './state/actions';

export class ProductListComponent {
  constructor(private store: Store) {}

  onSliderChange(range: MINMAX) {
    this.store.dispatch(updateFilterRange({ 
      filterId: 'price',
      min: range.min,
      max: range.max
    }));
  }
}
```

---

## Theming and Customization (v6.0+)

Starting with version 6.0, you can customize the slider's appearance using CSS custom properties (variables).

```css
/* In your component's styles or global styles.css */
rm-range-slider {
  --slider-primary-color: #3f51b5;
  --slider-track-color: rgba(0, 0, 0, 0.1);
  --slider-thumb-size: 20px;
  --slider-label-background: #333;
  --slider-label-color: #fff;
}
```

> [!TIP]
> Refer to the [Roadmap](./ROADMAP.md) for upcoming customization features like step increments and vertical orientation.
