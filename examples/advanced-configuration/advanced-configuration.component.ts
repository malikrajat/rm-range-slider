import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [CommonModule, RmRangeSliderComponent],
  template: `
    <div class="advanced-container">
      <h2>Advanced: Date Range Selection</h2>
      <p class="intro">
        This example shows how to map the slider's numeric values (0 - 30) to a range of dates.
      </p>

      <div class="date-display">
        <div class="date-card">
          <span class="label">Start Date</span>
          <span class="value">{{ formatDate(range.min) }}</span>
        </div>
        <div class="date-card">
          <span class="label">End Date</span>
          <span class="value">{{ formatDate(range.max) }}</span>
        </div>
      </div>

      <div class="slider-wrapper">
        <rm-range-slider
          [min]="0"
          [max]="30"
          [startValue]="range.min"
          [endValue]="range.max"
          (onValueChanged)="onRangeChange($event)"
        ></rm-range-slider>
        
        <div class="range-info">
          Selected Period: <strong>{{ range.max - range.min }} days</strong>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .advanced-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 32px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      font-family: 'Inter', sans-serif;
    }
    h2 { color: #2d3436; margin-bottom: 8px; }
    .intro { color: #636e72; margin-bottom: 32px; font-size: 15px; }
    .date-display {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 40px;
    }
    .date-card {
      background: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      text-align: center;
    }
    .date-card .label { display: block; font-size: 11px; text-transform: uppercase; color: #b2bec3; letter-spacing: 1px; margin-bottom: 4px; }
    .date-card .value { display: block; font-weight: 700; color: #2d3436; font-size: 16px; }
    .slider-wrapper { background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .range-info { margin-top: 16px; text-align: center; color: #636e72; font-size: 14px; }
  `]
})
export class AdvancedConfigurationComponent {
  // We represent the last 30 days as a numeric range from 0 to 30
  range: MINMAX = { min: 0, max: 7 };
  referenceDate = new Date();

  formatDate(daysAgo: number): string {
    const date = new Date(this.referenceDate);
    date.setDate(date.getDate() - (30 - daysAgo));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  onRangeChange(newRange: MINMAX): void {
    this.range = newRange;
  }
}
