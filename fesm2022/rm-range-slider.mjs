import * as i0 from '@angular/core';
import { EventEmitter, numberAttribute, Component, Input, Output } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import { Subject, throttleTime, takeUntil } from 'rxjs';

class RmRangeSliderComponent {
    constructor() {
        this.destroy$ = new Subject();
        /* The `@Input` decorator in the TypeScript code snippet is used to define an input property for the
      `RmRangeSliderComponent` component in Angular. In this specific case: */
        this.startValue = 0;
        /* The `@Input` decorator in the TypeScript code snippet is used to define an input property for the
      `RmRangeSliderComponent` component in Angular. In this specific case, the `endValue` property is
      being defined as an input property with the following configuration: */
        this.endValue = 10;
        /* The `@Input` decorator in the TypeScript code snippet is used to define an input property for the
      `RmRangeSliderComponent` component in Angular. In this specific case, the `min` property is being
      defined as an input property with the following configuration: */
        this.min = 0;
        /* The `@Input` decorator in the TypeScript code snippet is used to define an input property for the
      `RmRangeSliderComponent` component in Angular. In this specific case, the `max` property is being
      defined as an input property with the following configuration: */
        this.max = 100;
        /* The `@Output()` decorator in the TypeScript code snippet is used to define an output property for
      the `RmRangeSliderComponent` component in Angular. In this specific case, the `getMinMax` property
      is being defined as an output property with the type of `EventEmitter<MINMAX>`. */
        this.onValueChanged = new EventEmitter();
    }
    /**
     * The `onSliderInput` function sets the `value` object with `startValue` and `endValue` properties and
     * calls the `onSliderChange` function with this value.
     */
    onSliderInput() {
        const value = {
            from: this.startValue,
            to: this.endValue,
        };
        this.onSliderChange(value);
    }
    /**
     * The `formatLabel` function in TypeScript formats a number value by rounding it to the nearest
     * hundredth and appending a 'k' if the value is greater than or equal to 1000.
     * @param {number} value - The `value` parameter is a number that represents a numerical value which
     * needs to be formatted. The `formatLabel` function takes this number as input and returns a formatted
     * string representation of the number. If the value is greater than or equal to 1000, it will be
     * rounded and displayed in
     * @returns If the `value` is greater than or equal to 1000, the function will return the value divided
     * by 100 and rounded, followed by the letter 'k'. Otherwise, it will return the value as a string.
     */
    formatLabel(value) {
        if (value >= 1000) {
            return Math.round(value / 100) + 'k';
        }
        return `${value}`;
    }
    /**
     * The `onSliderChange` function in TypeScript sets up a Subject to emit slider value changes with a
     * throttle time of 5000 milliseconds.
     * @param {MINMAX} value - The `value` parameter in the `onSliderChange` method represents the current
     * value of the slider, which is of type `MINMAX`.
     */
    onSliderChange(value) {
        this.destroy$.next();
        this.destroy$.complete();
        const sliderValueChanges$ = new Subject();
        sliderValueChanges$
            .pipe(throttleTime(5000), takeUntil(this.destroy$))
            .subscribe((newValue) => {
            this.onValueChanged.emit(newValue);
        });
        sliderValueChanges$.next(value);
    }
    /**
     * The ngOnDestroy function in TypeScript is used to clean up resources and unsubscribe from
     * observables by completing a subject.
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.4", ngImport: i0, type: RmRangeSliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.1.4", type: RmRangeSliderComponent, isStandalone: true, selector: "rm-range-slider", inputs: { startValue: ["startValue", "startValue", numberAttribute], endValue: ["endValue", "endValue", numberAttribute], min: ["min", "min", numberAttribute], max: ["max", "max", numberAttribute] }, outputs: { onValueChanged: "onValueChanged" }, ngImport: i0, template: `
    <mat-slider
      [min]="this.min"
      [max]="this.max"
      showTickMarks
      discrete
      [displayWith]="formatLabel"
      (change)="onSliderInput()"
    >
      <input matSliderStartThumb [(ngModel)]="startValue" />
      <input matSliderEndThumb [(ngModel)]="endValue" />
    </mat-slider>
  `, isInline: true, styles: ["mat-slider{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: MatSliderModule }, { kind: "component", type: i1.MatSlider, selector: "mat-slider", inputs: ["disabled", "discrete", "showTickMarks", "min", "color", "disableRipple", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i1.MatSliderRangeThumb, selector: "input[matSliderStartThumb], input[matSliderEndThumb]", exportAs: ["matSliderRangeThumb"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.4", ngImport: i0, type: RmRangeSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-range-slider', standalone: true, imports: [MatSliderModule, FormsModule], template: `
    <mat-slider
      [min]="this.min"
      [max]="this.max"
      showTickMarks
      discrete
      [displayWith]="formatLabel"
      (change)="onSliderInput()"
    >
      <input matSliderStartThumb [(ngModel)]="startValue" />
      <input matSliderEndThumb [(ngModel)]="endValue" />
    </mat-slider>
  `, styles: ["mat-slider{width:100%}\n"] }]
        }], propDecorators: { startValue: [{
                type: Input,
                args: [{
                        required: true,
                        transform: numberAttribute,
                    }]
            }], endValue: [{
                type: Input,
                args: [{
                        required: true,
                        transform: numberAttribute,
                    }]
            }], min: [{
                type: Input,
                args: [{
                        required: true,
                        transform: numberAttribute,
                    }]
            }], max: [{
                type: Input,
                args: [{
                        required: true,
                        transform: numberAttribute,
                    }]
            }], onValueChanged: [{
                type: Output
            }] } });

/*
 * Public API Surface of rm-range-slider
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RmRangeSliderComponent };
//# sourceMappingURL=rm-range-slider.mjs.map
