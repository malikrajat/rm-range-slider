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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RmRangeSliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.2.2", type: RmRangeSliderComponent, isStandalone: true, selector: "rm-range-slider", inputs: { startValue: ["startValue", "startValue", numberAttribute], endValue: ["endValue", "endValue", numberAttribute], min: ["min", "min", numberAttribute], max: ["max", "max", numberAttribute] }, outputs: { onValueChanged: "onValueChanged" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RmRangeSliderComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JtLXJhbmdlLXNsaWRlci9zcmMvbGliL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixlQUFlLEdBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBNkJ4RCxNQUFNLE9BQU8sc0JBQXNCO0lBdkJuQztRQXdCVSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV2Qzs4RUFDc0U7UUFLdEUsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2Qjs7NkVBRXFFO1FBS3JFLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEI7O3VFQUUrRDtRQUsvRCxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCOzt1RUFFK0Q7UUFLL0QsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUVsQjs7d0ZBRWdGO1FBRXpFLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztLQTBEcEQ7SUF4REM7OztPQUdHO0lBQ0gsYUFBYTtRQUNYLE1BQU0sS0FBSyxHQUFXO1lBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUVILFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNsRCxtQkFBbUI7YUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xELFNBQVMsQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQW5HVSxzQkFBc0I7a0dBQXRCLHNCQUFzQixzR0FPcEIsZUFBZSxzQ0FTZixlQUFlLHVCQVNmLGVBQWUsdUJBU2YsZUFBZSw0RUFyRGxCOzs7Ozs7Ozs7Ozs7R0FZVCxpR0FiUyxlQUFlLHNZQUFFLFdBQVc7OzJGQW9CM0Isc0JBQXNCO2tCQXZCbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLFlBQzdCOzs7Ozs7Ozs7Ozs7R0FZVDs4QkFnQkQsVUFBVTtzQkFKVCxLQUFLO3VCQUFDO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxlQUFlO3FCQUMzQjtnQkFVRCxRQUFRO3NCQUpQLEtBQUs7dUJBQUM7d0JBQ0wsUUFBUSxFQUFFLElBQUk7d0JBQ2QsU0FBUyxFQUFFLGVBQWU7cUJBQzNCO2dCQVVELEdBQUc7c0JBSkYsS0FBSzt1QkFBQzt3QkFDTCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxTQUFTLEVBQUUsZUFBZTtxQkFDM0I7Z0JBVUQsR0FBRztzQkFKRixLQUFLO3VCQUFDO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxlQUFlO3FCQUMzQjtnQkFPTSxjQUFjO3NCQURwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgbnVtYmVyQXR0cmlidXRlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7IFN1YmplY3QsIHRha2VVbnRpbCwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcyc7XG5leHBvcnQgaW50ZXJmYWNlIE1JTk1BWCB7XG4gIGZyb206IG51bWJlcjtcbiAgdG86IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm0tcmFuZ2Utc2xpZGVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW01hdFNsaWRlck1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxtYXQtc2xpZGVyXG4gICAgICBbbWluXT1cInRoaXMubWluXCJcbiAgICAgIFttYXhdPVwidGhpcy5tYXhcIlxuICAgICAgc2hvd1RpY2tNYXJrc1xuICAgICAgZGlzY3JldGVcbiAgICAgIFtkaXNwbGF5V2l0aF09XCJmb3JtYXRMYWJlbFwiXG4gICAgICAoY2hhbmdlKT1cIm9uU2xpZGVySW5wdXQoKVwiXG4gICAgPlxuICAgICAgPGlucHV0IG1hdFNsaWRlclN0YXJ0VGh1bWIgWyhuZ01vZGVsKV09XCJzdGFydFZhbHVlXCIgLz5cbiAgICAgIDxpbnB1dCBtYXRTbGlkZXJFbmRUaHVtYiBbKG5nTW9kZWwpXT1cImVuZFZhbHVlXCIgLz5cbiAgICA8L21hdC1zbGlkZXI+XG4gIGAsXG4gIHN0eWxlczogYFxuICAgIG1hdC1zbGlkZXIge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBSbVJhbmdlU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyogVGhlIGBASW5wdXRgIGRlY29yYXRvciBpbiB0aGUgVHlwZVNjcmlwdCBjb2RlIHNuaXBwZXQgaXMgdXNlZCB0byBkZWZpbmUgYW4gaW5wdXQgcHJvcGVydHkgZm9yIHRoZVxuYFJtUmFuZ2VTbGlkZXJDb21wb25lbnRgIGNvbXBvbmVudCBpbiBBbmd1bGFyLiBJbiB0aGlzIHNwZWNpZmljIGNhc2U6ICovXG4gIEBJbnB1dCh7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUsXG4gIH0pXG4gIHN0YXJ0VmFsdWU6IG51bWJlciA9IDA7XG5cbiAgLyogVGhlIGBASW5wdXRgIGRlY29yYXRvciBpbiB0aGUgVHlwZVNjcmlwdCBjb2RlIHNuaXBwZXQgaXMgdXNlZCB0byBkZWZpbmUgYW4gaW5wdXQgcHJvcGVydHkgZm9yIHRoZVxuYFJtUmFuZ2VTbGlkZXJDb21wb25lbnRgIGNvbXBvbmVudCBpbiBBbmd1bGFyLiBJbiB0aGlzIHNwZWNpZmljIGNhc2UsIHRoZSBgZW5kVmFsdWVgIHByb3BlcnR5IGlzXG5iZWluZyBkZWZpbmVkIGFzIGFuIGlucHV0IHByb3BlcnR5IHdpdGggdGhlIGZvbGxvd2luZyBjb25maWd1cmF0aW9uOiAqL1xuICBASW5wdXQoe1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlLFxuICB9KVxuICBlbmRWYWx1ZTogbnVtYmVyID0gMTA7XG5cbiAgLyogVGhlIGBASW5wdXRgIGRlY29yYXRvciBpbiB0aGUgVHlwZVNjcmlwdCBjb2RlIHNuaXBwZXQgaXMgdXNlZCB0byBkZWZpbmUgYW4gaW5wdXQgcHJvcGVydHkgZm9yIHRoZVxuYFJtUmFuZ2VTbGlkZXJDb21wb25lbnRgIGNvbXBvbmVudCBpbiBBbmd1bGFyLiBJbiB0aGlzIHNwZWNpZmljIGNhc2UsIHRoZSBgbWluYCBwcm9wZXJ0eSBpcyBiZWluZ1xuZGVmaW5lZCBhcyBhbiBpbnB1dCBwcm9wZXJ0eSB3aXRoIHRoZSBmb2xsb3dpbmcgY29uZmlndXJhdGlvbjogKi9cbiAgQElucHV0KHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSxcbiAgfSlcbiAgbWluOiBudW1iZXIgPSAwO1xuXG4gIC8qIFRoZSBgQElucHV0YCBkZWNvcmF0b3IgaW4gdGhlIFR5cGVTY3JpcHQgY29kZSBzbmlwcGV0IGlzIHVzZWQgdG8gZGVmaW5lIGFuIGlucHV0IHByb3BlcnR5IGZvciB0aGVcbmBSbVJhbmdlU2xpZGVyQ29tcG9uZW50YCBjb21wb25lbnQgaW4gQW5ndWxhci4gSW4gdGhpcyBzcGVjaWZpYyBjYXNlLCB0aGUgYG1heGAgcHJvcGVydHkgaXMgYmVpbmdcbmRlZmluZWQgYXMgYW4gaW5wdXQgcHJvcGVydHkgd2l0aCB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb246ICovXG4gIEBJbnB1dCh7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUsXG4gIH0pXG4gIG1heDogbnVtYmVyID0gMTAwO1xuXG4gIC8qIFRoZSBgQE91dHB1dCgpYCBkZWNvcmF0b3IgaW4gdGhlIFR5cGVTY3JpcHQgY29kZSBzbmlwcGV0IGlzIHVzZWQgdG8gZGVmaW5lIGFuIG91dHB1dCBwcm9wZXJ0eSBmb3JcbnRoZSBgUm1SYW5nZVNsaWRlckNvbXBvbmVudGAgY29tcG9uZW50IGluIEFuZ3VsYXIuIEluIHRoaXMgc3BlY2lmaWMgY2FzZSwgdGhlIGBnZXRNaW5NYXhgIHByb3BlcnR5XG5pcyBiZWluZyBkZWZpbmVkIGFzIGFuIG91dHB1dCBwcm9wZXJ0eSB3aXRoIHRoZSB0eXBlIG9mIGBFdmVudEVtaXR0ZXI8TUlOTUFYPmAuICovXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25WYWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE1JTk1BWD4oKTtcblxuICAvKipcbiAgICogVGhlIGBvblNsaWRlcklucHV0YCBmdW5jdGlvbiBzZXRzIHRoZSBgdmFsdWVgIG9iamVjdCB3aXRoIGBzdGFydFZhbHVlYCBhbmQgYGVuZFZhbHVlYCBwcm9wZXJ0aWVzIGFuZFxuICAgKiBjYWxscyB0aGUgYG9uU2xpZGVyQ2hhbmdlYCBmdW5jdGlvbiB3aXRoIHRoaXMgdmFsdWUuXG4gICAqL1xuICBvblNsaWRlcklucHV0KCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlOiBNSU5NQVggPSB7XG4gICAgICBmcm9tOiB0aGlzLnN0YXJ0VmFsdWUsXG4gICAgICB0bzogdGhpcy5lbmRWYWx1ZSxcbiAgICB9O1xuICAgIHRoaXMub25TbGlkZXJDaGFuZ2UodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBgZm9ybWF0TGFiZWxgIGZ1bmN0aW9uIGluIFR5cGVTY3JpcHQgZm9ybWF0cyBhIG51bWJlciB2YWx1ZSBieSByb3VuZGluZyBpdCB0byB0aGUgbmVhcmVzdFxuICAgKiBodW5kcmVkdGggYW5kIGFwcGVuZGluZyBhICdrJyBpZiB0aGUgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDEwMDAuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSBgdmFsdWVgIHBhcmFtZXRlciBpcyBhIG51bWJlciB0aGF0IHJlcHJlc2VudHMgYSBudW1lcmljYWwgdmFsdWUgd2hpY2hcbiAgICogbmVlZHMgdG8gYmUgZm9ybWF0dGVkLiBUaGUgYGZvcm1hdExhYmVsYCBmdW5jdGlvbiB0YWtlcyB0aGlzIG51bWJlciBhcyBpbnB1dCBhbmQgcmV0dXJucyBhIGZvcm1hdHRlZFxuICAgKiBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlci4gSWYgdGhlIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxMDAwLCBpdCB3aWxsIGJlXG4gICAqIHJvdW5kZWQgYW5kIGRpc3BsYXllZCBpblxuICAgKiBAcmV0dXJucyBJZiB0aGUgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMTAwMCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSB2YWx1ZSBkaXZpZGVkXG4gICAqIGJ5IDEwMCBhbmQgcm91bmRlZCwgZm9sbG93ZWQgYnkgdGhlIGxldHRlciAnaycuIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIHZhbHVlIGFzIGEgc3RyaW5nLlxuICAgKi9cblxuICBmb3JtYXRMYWJlbCh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPj0gMTAwMCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyAxMDApICsgJ2snO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dmFsdWV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYG9uU2xpZGVyQ2hhbmdlYCBmdW5jdGlvbiBpbiBUeXBlU2NyaXB0IHNldHMgdXAgYSBTdWJqZWN0IHRvIGVtaXQgc2xpZGVyIHZhbHVlIGNoYW5nZXMgd2l0aCBhXG4gICAqIHRocm90dGxlIHRpbWUgb2YgNTAwMCBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7TUlOTUFYfSB2YWx1ZSAtIFRoZSBgdmFsdWVgIHBhcmFtZXRlciBpbiB0aGUgYG9uU2xpZGVyQ2hhbmdlYCBtZXRob2QgcmVwcmVzZW50cyB0aGUgY3VycmVudFxuICAgKiB2YWx1ZSBvZiB0aGUgc2xpZGVyLCB3aGljaCBpcyBvZiB0eXBlIGBNSU5NQVhgLlxuICAgKi9cbiAgb25TbGlkZXJDaGFuZ2UodmFsdWU6IE1JTk1BWCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICBjb25zdCBzbGlkZXJWYWx1ZUNoYW5nZXMkID0gbmV3IFN1YmplY3Q8TUlOTUFYPigpO1xuICAgIHNsaWRlclZhbHVlQ2hhbmdlcyRcbiAgICAgIC5waXBlKHRocm90dGxlVGltZSg1MDAwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgobmV3VmFsdWU6IE1JTk1BWCkgPT4ge1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkLmVtaXQobmV3VmFsdWUpO1xuICAgICAgfSk7XG4gICAgc2xpZGVyVmFsdWVDaGFuZ2VzJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmdPbkRlc3Ryb3kgZnVuY3Rpb24gaW4gVHlwZVNjcmlwdCBpcyB1c2VkIHRvIGNsZWFuIHVwIHJlc291cmNlcyBhbmQgdW5zdWJzY3JpYmUgZnJvbVxuICAgKiBvYnNlcnZhYmxlcyBieSBjb21wbGV0aW5nIGEgc3ViamVjdC5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19