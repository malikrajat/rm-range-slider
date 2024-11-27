import { AfterViewInit, ElementRef, WritableSignal, Signal } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RmNgRangeSliderComponent implements AfterViewInit {
    readonly min: import("@angular/core").InputSignal<number>;
    readonly max: import("@angular/core").InputSignal<number>;
    readonly leftColor: import("@angular/core").InputSignal<string>;
    readonly rightColor: import("@angular/core").InputSignal<string>;
    readonly leftTooltipColor: import("@angular/core").InputSignal<string>;
    readonly rightTooltipColor: import("@angular/core").InputSignal<string>;
    readonly lowSlider: Signal<ElementRef<HTMLDivElement>>;
    readonly rangeChanged: import("@angular/core").OutputEmitterRef<{
        low: number;
        high: number;
    }>;
    lowValue: WritableSignal<number>;
    highValue: WritableSignal<number>;
    private rangeChangedSubject;
    ngAfterViewInit(): void;
    onLowThumbChange(event: Event): void;
    onHighThumbChange(event: Event): void;
    emitRange(): void;
    updateSliderColors(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RmNgRangeSliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RmNgRangeSliderComponent, "rm-ng-range-slider", never, { "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "leftColor": { "alias": "leftColor"; "required": false; "isSignal": true; }; "rightColor": { "alias": "rightColor"; "required": false; "isSignal": true; }; "leftTooltipColor": { "alias": "leftTooltipColor"; "required": false; "isSignal": true; }; "rightTooltipColor": { "alias": "rightTooltipColor"; "required": false; "isSignal": true; }; }, { "rangeChanged": "rangeChanged"; }, never, never, true, never>;
}
