# Usage Guide

This guide provides a comprehensive set of examples demonstrating how to use `rm-range-slider` in various real-world scenarios.

## Basic Usage

The most common use case is a simple dual-range selection with min/max bounds and initial values.

```typescript
import { Component } from '@angular/core';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [RmRangeSliderComponent],
  template: `
    <div class="container">
      <h3>Select Range</h3>
      <rm-range-slider
        [min]="0"
        [max]="1000"
        [startValue]="200"
        [endValue]="800"
        (onValueChanged)="handleRangeChange($event)"
      ></rm-range-slider>
      
      <p>Current: {{range.min}} - {{range.max}}</p>
    </div>
  `
})
export class BasicDemoComponent {
  range: MINMAX = { min: 200, max: 800 };

  handleRangeChange(newRange: MINMAX) {
    this.range = newRange;
  }
}
```

---

## Example 1: Price Range Filter

Perfect for e-commerce applications where you need to filter a list of products.

```typescript
import { Component } from '@angular/core';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [RmRangeSliderComponent, CommonModule],
  template: `
    <div class="pricing-card">
      <h4>Filter by Price</h4>
      <div class="labels">
        <span>Min: ${{priceRange.min}}</span>
        <span>Max: ${{priceRange.max}}</span>
      </div>
      
      <rm-range-slider
        [min]="0"
        [max]="5000"
        [startValue]="500"
        [endValue]="2500"
        (onValueChanged)="updatePriceRange($event)"
      ></rm-range-slider>
    </div>
  `,
  styles: [`
    .pricing-card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .labels { display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold; }
  `]
})
export class PriceFilterComponent {
  priceRange: MINMAX = { min: 500, max: 2500 };

  updatePriceRange(range: MINMAX) {
    this.priceRange = range;
    // Logic to filter products based on priceRange.min and priceRange.max
  }
}
```

---

## Example 2: Date Range Selection

By treating days or timestamps as numeric values, you can use the slider for date selection.

```typescript
import { Component } from '@angular/core';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-date-selector',
  standalone: true,
  imports: [RmRangeSliderComponent],
  template: `
    <div class="date-container">
      <h3>Select Reporting Period</h3>
      <p>From: {{formatDate(daysRange.min)}}</p>
      <p>To: {{formatDate(daysRange.max)}}</p>
      
      <rm-range-slider
        [min]="0"
        [max]="30"
        [startValue]="0"
        [endValue]="7"
        (onValueChanged)="daysRange = $event"
      ></rm-range-slider>
    </div>
  `
})
export class DateSelectorComponent {
  daysRange: MINMAX = { min: 0, max: 7 };
  baseDate = new Date();

  formatDate(daysOffset: number): string {
    const d = new Date(this.baseDate);
    d.setDate(d.getDate() - (30 - daysOffset));
    return d.toLocaleDateString();
  }
}
```

---

## Example 3: Age Range Filter

Simple numeric filtering for user profiles or demographic data.

```typescript
@Component({
  selector: 'app-age-filter',
  standalone: true,
  imports: [RmRangeSliderComponent],
  template: `
    <div class="filter-box">
      <label>Age Range: {{age.min}} - {{age.max}} years</label>
      <rm-range-slider
        [min]="18"
        [max]="99"
        [startValue]="25"
        [endValue]="45"
        (onValueChanged)="age = $event"
      ></rm-range-slider>
    </div>
  `
})
export class AgeFilterComponent {
  age: MINMAX = { min: 25, max: 45 };
}
```

## Tips for Best UX

1.  **Labels:** Always provide clear labels showing the current selected values above or below the slider.
2.  **Debouncing:** If the slider triggers API calls (like fetching products), use `debounceTime` from RxJS to wait until the user stops dragging.
3.  **Validation:** In your `onValueChanged` handler, you can implement custom logic to ensure a minimum gap between handles if necessary.

For more advanced configurations like Reactive Forms integration, see [Advanced Configuration](./ADVANCED_CONFIGURATION.md).
