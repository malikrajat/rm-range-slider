import { Component, EventEmitter, Input, Output, numberAttribute, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Subject, takeUntil, throttleTime } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/slider";
import * as i2 from "@angular/forms";
export class RmRangeSliderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JtLXJhbmdlLXNsaWRlci9zcmMvbGliL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBNkJ4RCxNQUFNLE9BQU8sc0JBQXNCO0lBdkJuQztRQXdCVSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV2Qzs4RUFDc0U7UUFLdEUsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2Qjs7NkVBRXFFO1FBS3JFLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEI7O3VFQUUrRDtRQUsvRCxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCOzt1RUFFK0Q7UUFLL0QsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUVsQjs7d0ZBRWdGO1FBRXpFLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztLQTBEcEQ7SUF4REM7OztPQUdHO0lBQ0gsYUFBYTtRQUNYLE1BQU0sS0FBSyxHQUFXO1lBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUVILFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNsRCxtQkFBbUI7YUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xELFNBQVMsQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQW5HVSxzQkFBc0I7a0dBQXRCLHNCQUFzQixzR0FPcEIsZUFBZSxzQ0FTZixlQUFlLHVCQVNmLGVBQWUsdUJBU2YsZUFBZSw0RUFyRGxCOzs7Ozs7Ozs7Ozs7R0FZVCxpR0FiUyxlQUFlLHNZQUFFLFdBQVc7OzJGQW9CM0Isc0JBQXNCO2tCQXZCbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLFlBQzdCOzs7Ozs7Ozs7Ozs7R0FZVDs4QkFnQkQsVUFBVTtzQkFKVCxLQUFLO3VCQUFDO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxlQUFlO3FCQUMzQjtnQkFVRCxRQUFRO3NCQUpQLEtBQUs7dUJBQUM7d0JBQ0wsUUFBUSxFQUFFLElBQUk7d0JBQ2QsU0FBUyxFQUFFLGVBQWU7cUJBQzNCO2dCQVVELEdBQUc7c0JBSkYsS0FBSzt1QkFBQzt3QkFDTCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxTQUFTLEVBQUUsZUFBZTtxQkFDM0I7Z0JBVUQsR0FBRztzQkFKRixLQUFLO3VCQUFDO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxlQUFlO3FCQUMzQjtnQkFPTSxjQUFjO3NCQURwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPdXRwdXQsXHJcbiAgbnVtYmVyQXR0cmlidXRlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcclxuaW1wb3J0IHsgU3ViamVjdCwgdGFrZVVudGlsLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzJztcclxuZXhwb3J0IGludGVyZmFjZSBNSU5NQVgge1xyXG4gIGZyb206IG51bWJlcjtcclxuICB0bzogbnVtYmVyO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3JtLXJhbmdlLXNsaWRlcicsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbTWF0U2xpZGVyTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxtYXQtc2xpZGVyXHJcbiAgICAgIFttaW5dPVwidGhpcy5taW5cIlxyXG4gICAgICBbbWF4XT1cInRoaXMubWF4XCJcclxuICAgICAgc2hvd1RpY2tNYXJrc1xyXG4gICAgICBkaXNjcmV0ZVxyXG4gICAgICBbZGlzcGxheVdpdGhdPVwiZm9ybWF0TGFiZWxcIlxyXG4gICAgICAoY2hhbmdlKT1cIm9uU2xpZGVySW5wdXQoKVwiXHJcbiAgICA+XHJcbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJTdGFydFRodW1iIFsobmdNb2RlbCldPVwic3RhcnRWYWx1ZVwiIC8+XHJcbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJFbmRUaHVtYiBbKG5nTW9kZWwpXT1cImVuZFZhbHVlXCIgLz5cclxuICAgIDwvbWF0LXNsaWRlcj5cclxuICBgLFxyXG4gIHN0eWxlczogYFxyXG4gICAgbWF0LXNsaWRlciB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSbVJhbmdlU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyogVGhlIGBASW5wdXRgIGRlY29yYXRvciBpbiB0aGUgVHlwZVNjcmlwdCBjb2RlIHNuaXBwZXQgaXMgdXNlZCB0byBkZWZpbmUgYW4gaW5wdXQgcHJvcGVydHkgZm9yIHRoZVxyXG5gUm1SYW5nZVNsaWRlckNvbXBvbmVudGAgY29tcG9uZW50IGluIEFuZ3VsYXIuIEluIHRoaXMgc3BlY2lmaWMgY2FzZTogKi9cclxuICBASW5wdXQoe1xyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSxcclxuICB9KVxyXG4gIHN0YXJ0VmFsdWU6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qIFRoZSBgQElucHV0YCBkZWNvcmF0b3IgaW4gdGhlIFR5cGVTY3JpcHQgY29kZSBzbmlwcGV0IGlzIHVzZWQgdG8gZGVmaW5lIGFuIGlucHV0IHByb3BlcnR5IGZvciB0aGVcclxuYFJtUmFuZ2VTbGlkZXJDb21wb25lbnRgIGNvbXBvbmVudCBpbiBBbmd1bGFyLiBJbiB0aGlzIHNwZWNpZmljIGNhc2UsIHRoZSBgZW5kVmFsdWVgIHByb3BlcnR5IGlzXHJcbmJlaW5nIGRlZmluZWQgYXMgYW4gaW5wdXQgcHJvcGVydHkgd2l0aCB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb246ICovXHJcbiAgQElucHV0KHtcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUsXHJcbiAgfSlcclxuICBlbmRWYWx1ZTogbnVtYmVyID0gMTA7XHJcblxyXG4gIC8qIFRoZSBgQElucHV0YCBkZWNvcmF0b3IgaW4gdGhlIFR5cGVTY3JpcHQgY29kZSBzbmlwcGV0IGlzIHVzZWQgdG8gZGVmaW5lIGFuIGlucHV0IHByb3BlcnR5IGZvciB0aGVcclxuYFJtUmFuZ2VTbGlkZXJDb21wb25lbnRgIGNvbXBvbmVudCBpbiBBbmd1bGFyLiBJbiB0aGlzIHNwZWNpZmljIGNhc2UsIHRoZSBgbWluYCBwcm9wZXJ0eSBpcyBiZWluZ1xyXG5kZWZpbmVkIGFzIGFuIGlucHV0IHByb3BlcnR5IHdpdGggdGhlIGZvbGxvd2luZyBjb25maWd1cmF0aW9uOiAqL1xyXG4gIEBJbnB1dCh7XHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlLFxyXG4gIH0pXHJcbiAgbWluOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKiBUaGUgYEBJbnB1dGAgZGVjb3JhdG9yIGluIHRoZSBUeXBlU2NyaXB0IGNvZGUgc25pcHBldCBpcyB1c2VkIHRvIGRlZmluZSBhbiBpbnB1dCBwcm9wZXJ0eSBmb3IgdGhlXHJcbmBSbVJhbmdlU2xpZGVyQ29tcG9uZW50YCBjb21wb25lbnQgaW4gQW5ndWxhci4gSW4gdGhpcyBzcGVjaWZpYyBjYXNlLCB0aGUgYG1heGAgcHJvcGVydHkgaXMgYmVpbmdcclxuZGVmaW5lZCBhcyBhbiBpbnB1dCBwcm9wZXJ0eSB3aXRoIHRoZSBmb2xsb3dpbmcgY29uZmlndXJhdGlvbjogKi9cclxuICBASW5wdXQoe1xyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSxcclxuICB9KVxyXG4gIG1heDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAvKiBUaGUgYEBPdXRwdXQoKWAgZGVjb3JhdG9yIGluIHRoZSBUeXBlU2NyaXB0IGNvZGUgc25pcHBldCBpcyB1c2VkIHRvIGRlZmluZSBhbiBvdXRwdXQgcHJvcGVydHkgZm9yXHJcbnRoZSBgUm1SYW5nZVNsaWRlckNvbXBvbmVudGAgY29tcG9uZW50IGluIEFuZ3VsYXIuIEluIHRoaXMgc3BlY2lmaWMgY2FzZSwgdGhlIGBnZXRNaW5NYXhgIHByb3BlcnR5XHJcbmlzIGJlaW5nIGRlZmluZWQgYXMgYW4gb3V0cHV0IHByb3BlcnR5IHdpdGggdGhlIHR5cGUgb2YgYEV2ZW50RW1pdHRlcjxNSU5NQVg+YC4gKi9cclxuICBAT3V0cHV0KClcclxuICBwdWJsaWMgb25WYWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1JTk1BWD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGBvblNsaWRlcklucHV0YCBmdW5jdGlvbiBzZXRzIHRoZSBgdmFsdWVgIG9iamVjdCB3aXRoIGBzdGFydFZhbHVlYCBhbmQgYGVuZFZhbHVlYCBwcm9wZXJ0aWVzIGFuZFxyXG4gICAqIGNhbGxzIHRoZSBgb25TbGlkZXJDaGFuZ2VgIGZ1bmN0aW9uIHdpdGggdGhpcyB2YWx1ZS5cclxuICAgKi9cclxuICBvblNsaWRlcklucHV0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdmFsdWU6IE1JTk1BWCA9IHtcclxuICAgICAgZnJvbTogdGhpcy5zdGFydFZhbHVlLFxyXG4gICAgICB0bzogdGhpcy5lbmRWYWx1ZSxcclxuICAgIH07XHJcbiAgICB0aGlzLm9uU2xpZGVyQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBgZm9ybWF0TGFiZWxgIGZ1bmN0aW9uIGluIFR5cGVTY3JpcHQgZm9ybWF0cyBhIG51bWJlciB2YWx1ZSBieSByb3VuZGluZyBpdCB0byB0aGUgbmVhcmVzdFxyXG4gICAqIGh1bmRyZWR0aCBhbmQgYXBwZW5kaW5nIGEgJ2snIGlmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMTAwMC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgYHZhbHVlYCBwYXJhbWV0ZXIgaXMgYSBudW1iZXIgdGhhdCByZXByZXNlbnRzIGEgbnVtZXJpY2FsIHZhbHVlIHdoaWNoXHJcbiAgICogbmVlZHMgdG8gYmUgZm9ybWF0dGVkLiBUaGUgYGZvcm1hdExhYmVsYCBmdW5jdGlvbiB0YWtlcyB0aGlzIG51bWJlciBhcyBpbnB1dCBhbmQgcmV0dXJucyBhIGZvcm1hdHRlZFxyXG4gICAqIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLiBJZiB0aGUgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDEwMDAsIGl0IHdpbGwgYmVcclxuICAgKiByb3VuZGVkIGFuZCBkaXNwbGF5ZWQgaW5cclxuICAgKiBAcmV0dXJucyBJZiB0aGUgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMTAwMCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSB2YWx1ZSBkaXZpZGVkXHJcbiAgICogYnkgMTAwIGFuZCByb3VuZGVkLCBmb2xsb3dlZCBieSB0aGUgbGV0dGVyICdrJy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgdmFsdWUgYXMgYSBzdHJpbmcuXHJcbiAgICovXHJcblxyXG4gIGZvcm1hdExhYmVsKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKHZhbHVlID49IDEwMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyAxMDApICsgJ2snO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGAke3ZhbHVlfWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYG9uU2xpZGVyQ2hhbmdlYCBmdW5jdGlvbiBpbiBUeXBlU2NyaXB0IHNldHMgdXAgYSBTdWJqZWN0IHRvIGVtaXQgc2xpZGVyIHZhbHVlIGNoYW5nZXMgd2l0aCBhXHJcbiAgICogdGhyb3R0bGUgdGltZSBvZiA1MDAwIG1pbGxpc2Vjb25kcy5cclxuICAgKiBAcGFyYW0ge01JTk1BWH0gdmFsdWUgLSBUaGUgYHZhbHVlYCBwYXJhbWV0ZXIgaW4gdGhlIGBvblNsaWRlckNoYW5nZWAgbWV0aG9kIHJlcHJlc2VudHMgdGhlIGN1cnJlbnRcclxuICAgKiB2YWx1ZSBvZiB0aGUgc2xpZGVyLCB3aGljaCBpcyBvZiB0eXBlIGBNSU5NQVhgLlxyXG4gICAqL1xyXG4gIG9uU2xpZGVyQ2hhbmdlKHZhbHVlOiBNSU5NQVgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gICAgY29uc3Qgc2xpZGVyVmFsdWVDaGFuZ2VzJCA9IG5ldyBTdWJqZWN0PE1JTk1BWD4oKTtcclxuICAgIHNsaWRlclZhbHVlQ2hhbmdlcyRcclxuICAgICAgLnBpcGUodGhyb3R0bGVUaW1lKDUwMDApLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBNSU5NQVgpID0+IHtcclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkLmVtaXQobmV3VmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIHNsaWRlclZhbHVlQ2hhbmdlcyQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbmdPbkRlc3Ryb3kgZnVuY3Rpb24gaW4gVHlwZVNjcmlwdCBpcyB1c2VkIHRvIGNsZWFuIHVwIHJlc291cmNlcyBhbmQgdW5zdWJzY3JpYmUgZnJvbVxyXG4gICAqIG9ic2VydmFibGVzIGJ5IGNvbXBsZXRpbmcgYSBzdWJqZWN0LlxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==