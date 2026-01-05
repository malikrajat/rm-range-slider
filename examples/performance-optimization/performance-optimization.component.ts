import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-performance-demo',
  standalone: true,
  imports: [CommonModule, RmRangeSliderComponent],
  template: `
    <div class="perf-container">
      <h2>Performance: Debounced Filtering</h2>
      <p class="desc">
        Useful when updating data based on slider values requires heavy computation or API calls.
      </p>

      <div class="monitor">
        <div class="stat">
          <span class="label">Slider Updates</span>
          <span class="value">{{ sliderUpdateCount }}</span>
        </div>
        <div class="stat highlight">
          <span class="label">Filter Actions</span>
          <span class="value">{{ filterCount }}</span>
        </div>
      </div>

      <div class="slider-box">
        <rm-range-slider
          [min]="0"
          [max]="1000"
          [startValue]="300"
          [endValue]="700"
          (onValueChanged)="onSliderUpdate($event)"
        ></rm-range-slider>
      </div>

      <div class="log">
        <div *ngFor="let entry of logs" class="log-entry">
          {{ entry }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .perf-container { max-width: 600px; margin: 40px auto; padding: 32px; font-family: 'Segoe UI', sans-serif; }
    .desc { color: #666; margin-bottom: 32px; }
    .monitor { display: flex; gap: 20px; margin-bottom: 40px; }
    .stat { flex: 1; padding: 20px; background: #f0f0f0; border-radius: 8px; text-align: center; }
    .stat.highlight { background: #e3f2fd; border: 2px solid #2196f3; }
    .stat .label { display: block; font-size: 12px; color: #555; margin-bottom: 8px; }
    .stat .value { font-size: 32px; font-weight: 800; color: #333; }
    .slider-box { margin-bottom: 40px; padding: 20px; border: 1px dashed #ccc; border-radius: 8px; }
    .log { height: 150px; overflow-y: auto; background: #1e1e1e; color: #00ff00; padding: 16px; font-family: monospace; font-size: 12px; border-radius: 8px; }
    .log-entry { margin-bottom: 4px; border-bottom: 1px solid #333; padding-bottom: 2px; }
  `]
})
export class PerformanceOptimizationComponent implements OnInit, OnDestroy {
  sliderUpdateCount = 0;
  filterCount = 0;
  logs: string[] = ['System initialized...'];

  private rangeSubject = new Subject<MINMAX>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // 1. Listen to the subject with a debounce
    this.rangeSubject.pipe(
      debounceTime(400),       // Wait 400ms after user stops dragging
      distinctUntilChanged(),   // Only fire if values actually changed
      takeUntil(this.destroy$)
    ).subscribe(range => {
      this.performHeavyFilter(range);
    });
  }

  onSliderUpdate(range: MINMAX) {
    this.sliderUpdateCount++;
    // 2. Push current values into the stream
    this.rangeSubject.next(range);
  }

  performHeavyFilter(range: MINMAX) {
    this.filterCount++;
    const timestamp = new Date().toLocaleTimeString();
    this.logs.unshift(`[${timestamp}] Filter applied: ${range.min} - ${range.max}`);
    if (this.logs.length > 20) this.logs.pop();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
