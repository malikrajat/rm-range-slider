import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-ux-best-practices',
  standalone: true,
  imports: [CommonModule, RmRangeSliderComponent],
  template: `
    <div class="ux-container">
      <header>
        <h2>UX & Accessibility</h2>
        <p>Best practices for creating an inclusive and polished range selector.</p>
      </header>

      <section class="example-box">
        <label id="age-label" class="sr-only">Select Age Range</label>
        
        <div class="visual-summary" aria-live="polite">
          <span class="age-badge">
            <span class="label">Min Age</span>
            <span class="value">{{ageRange.min}}</span>
          </span>
          <span class="connector">to</span>
          <span class="age-badge">
            <span class="label">Max Age</span>
            <span class="value">{{ageRange.max}}</span>
          </span>
        </div>

        <rm-range-slider
          role="slider"
          aria-labelledby="age-label"
          [min]="18"
          [max]="99"
          [startValue]="ageRange.min"
          [endValue]="ageRange.max"
          (onValueChanged)="ageRange = $event"
        ></rm-range-slider>
        
        <div class="instruction">
          Drag handles to set your target audience age range.
        </div>
      </section>

      <footer class="tips">
        <h4>💡 UX Tip</h4>
        <p>Use high-contrast labels and ensure your slider is wrapped in an ARIA group for screen reader users.</p>
      </footer>
    </div>
  `,
  styles: [`
    .ux-container {
      max-width: 550px;
      margin: 40px auto;
      font-family: 'Inter', system-ui, sans-serif;
      padding: 32px;
      background: #fafafa;
      border: 1px solid #eaeaea;
      border-radius: 12px;
    }
    h2 { margin: 0; color: #111; font-size: 24px; }
    p { color: #666; font-size: 14px; margin-top: 4px; }
    
    .example-box {
      margin-top: 40px;
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    
    .visual-summary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 40px;
    }
    
    .age-badge {
      background: #000;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-align: center;
      min-width: 80px;
    }
    
    .age-badge .label { display: block; font-size: 10px; text-transform: uppercase; opacity: 0.7; margin-bottom: 2px; }
    .age-badge .value { display: block; font-size: 24px; font-weight: 800; }
    
    .connector { font-weight: 600; color: #999; text-transform: uppercase; font-size: 12px; }
    
    .instruction { text-align: center; font-size: 13px; color: #888; margin-top: 24px; }
    
    .tips {
      margin-top: 32px;
      padding: 16px;
      background: #fff8e1;
      border-left: 4px solid #ffca28;
      border-radius: 4px;
    }
    .tips h4 { margin: 0 0 4px; font-size: 14px; color: #856404; }
    .tips p { margin: 0; color: #856404; font-size: 13px; }
    
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0,0,0,0); border: 0;
    }
  `]
})
export class UxBestPracticesComponent {
  ageRange: MINMAX = { min: 21, max: 35 };
}
