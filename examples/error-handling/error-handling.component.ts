import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-validation-demo',
  standalone: true,
  imports: [CommonModule, RmRangeSliderComponent],
  template: `
    <div class="validation-container">
      <h2>Range Validation & Constraints</h2>
      <p class="desc">
        Implementing business rules like enforcing a minimum gap between handles.
      </p>

      <div class="info-alert">
        <strong>Rule:</strong> There must be at least a 10-unit gap between handles.
      </div>

      <div class="slider-box" [class.invalid]="isInvalid">
        <rm-range-slider
          [min]="0"
          [max]="100"
          [startValue]="range.min"
          [endValue]="range.max"
          (onValueChanged)="validateAndNotify($event)"
        ></rm-range-slider>
      </div>

      <div class="display">
        Current Selection: <strong>{{ range.min }} - {{ range.max }}</strong>
        <p *ngIf="isInvalid" class="error-text">
          ⚠️ Min and Max are too close! (Minimum gap: 10)
        </p>
      </div>
    </div>
  `,
  styles: [`
    .validation-container { max-width: 500px; margin: 40px auto; padding: 24px; font-family: sans-serif; }
    .desc { color: #666; margin-bottom: 24px; }
    .info-alert { padding: 12px; background: #e3f2fd; color: #0d47a1; border-radius: 6px; margin-bottom: 24px; font-size: 14px; }
    .slider-box { padding: 20px; border: 2px solid transparent; border-radius: 12px; transition: all 0.3s; }
    .slider-box.invalid { border-color: #f44336; background: #ffebee; animation: shake 0.4s; }
    .display { margin-top: 24px; text-align: center; }
    .error-text { color: #d32f2f; font-weight: bold; margin-top: 8px; font-size: 14px; }
    
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `]
})
export class ErrorHandlingComponent {
  range: MINMAX = { min: 20, max: 80 };
  isInvalid = false;
  readonly MIN_GAP = 10;

  validateAndNotify(newRange: MINMAX) {
    // Check if the business rule is violated
    if (newRange.max - newRange.min < this.MIN_GAP) {
      this.isInvalid = true;
      // We still update the UI values for visual feedback, 
      // but we mark the state as invalid.
      this.range = newRange;
    } else {
      this.isInvalid = false;
      this.range = newRange;
    }
  }
}
