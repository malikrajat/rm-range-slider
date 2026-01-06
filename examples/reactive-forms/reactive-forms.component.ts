import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
    selector: 'app-reactive-forms',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RmRangeSliderComponent],
    template: `
    <div class="forms-container">
      <h2>Reactive Forms Integration</h2>
      <p class="subtitle">Synchronizing the slider with an Angular FormGroup.</p>

      <form [formGroup]="rangeForm" class="form-card">
        <div class="form-group">
          <label>Project Budget Range</label>
          <rm-range-slider
            [min]="0"
            [max]="50000"
            [startValue]="rangeForm.get('minBudget')?.value"
            [endValue]="rangeForm.get('maxBudget')?.value"
            (onValueChanged)="onSliderChange($event)"
          ></rm-range-slider>
        </div>

        <div class="input-row">
          <div class="input-field">
            <label>Min Budget ($)</label>
            <input type="number" formControlName="minBudget" step="1000">
          </div>
          <div class="input-field">
            <label>Max Budget ($)</label>
            <input type="number" formControlName="maxBudget" step="1000">
          </div>
        </div>

        <div class="form-actions">
          <button type="button" (click)="resetForm()">Reset to Default</button>
          <button type="submit" class="primary" [disabled]="!rangeForm.valid">
            Apply Filter
          </button>
        </div>
      </form>

      <div class="debug-panel">
        <strong>Form Value:</strong>
        <pre>{{ rangeForm.value | json }}</pre>
      </div>
    </div>
  `,
    styles: [`
    .forms-container { max-width: 550px; margin: 40px auto; font-family: 'Inter', sans-serif; }
    .subtitle { color: #666; margin-bottom: 24px; }
    .form-card { background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eee; }
    .form-group { margin-bottom: 32px; }
    .form-group label { display: block; margin-bottom: 12px; font-weight: 600; color: #444; }
    .input-row { display: flex; gap: 20px; margin-bottom: 32px; }
    .input-field { flex: 1; }
    .input-field label { display: block; font-size: 12px; color: #888; margin-bottom: 6px; }
    .input-field input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
    button { padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; border: 1px solid #ddd; background: white; }
    button.primary { background: #3f51b5; color: white; border-color: #3f51b5; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .debug-panel { margin-top: 32px; padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #eee; }
    .debug-panel pre { margin-top: 8px; font-size: 12px; color: #e91e63; }
  `]
})
export class ReactiveFormsComponent implements OnInit {
    rangeForm!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.rangeForm = this.fb.group({
            minBudget: [5000],
            maxBudget: [25000]
        });
    }

    onSliderChange(range: MINMAX) {
        // We update the form values, but avoid emitting events 
        // to prevent infinite change circles if you were subscribing to valueChanges
        this.rangeForm.patchValue({
            minBudget: range.min,
            maxBudget: range.max
        }, { emitEvent: false });
    }

    resetForm() {
        this.rangeForm.setValue({
            minBudget: 10000,
            maxBudget: 20000
        });
    }
}
