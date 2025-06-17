import * as i0 from '@angular/core';
import { OnDestroy, EventEmitter } from '@angular/core';

interface MINMAX {
    from: number;
    to: number;
}
declare class RmRangeSliderComponent implements OnDestroy {
    private destroy$;
    startValue: number;
    endValue: number;
    min: number;
    max: number;
    onValueChanged: EventEmitter<MINMAX>;
    /**
     * The `onSliderInput` function sets the `value` object with `startValue` and `endValue` properties and
     * calls the `onSliderChange` function with this value.
     */
    onSliderInput(): void;
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
    formatLabel(value: number): string;
    /**
     * The `onSliderChange` function in TypeScript sets up a Subject to emit slider value changes with a
     * throttle time of 5000 milliseconds.
     * @param {MINMAX} value - The `value` parameter in the `onSliderChange` method represents the current
     * value of the slider, which is of type `MINMAX`.
     */
    onSliderChange(value: MINMAX): void;
    /**
     * The ngOnDestroy function in TypeScript is used to clean up resources and unsubscribe from
     * observables by completing a subject.
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RmRangeSliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RmRangeSliderComponent, "rm-range-slider", never, { "startValue": { "alias": "startValue"; "required": true; }; "endValue": { "alias": "endValue"; "required": true; }; "min": { "alias": "min"; "required": true; }; "max": { "alias": "max"; "required": true; }; }, { "onValueChanged": "onValueChanged"; }, never, never, true, never>;
    static ngAcceptInputType_startValue: unknown;
    static ngAcceptInputType_endValue: unknown;
    static ngAcceptInputType_min: unknown;
    static ngAcceptInputType_max: unknown;
}

export { RmRangeSliderComponent };
export type { MINMAX };
