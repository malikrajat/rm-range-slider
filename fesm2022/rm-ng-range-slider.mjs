import * as i0 from '@angular/core';
import { input, viewChild, output, signal, Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

class RmNgRangeSliderComponent {
    min = input(0);
    max = input(100);
    leftColor = input('#3498db'); // Default left color
    rightColor = input('#e74c3c'); // Default right color
    leftTooltipColor = input('#333'); // Default tooltip color for the left
    rightTooltipColor = input('#e74c3c'); // Default tooltip color for the right
    lowSlider = viewChild.required('lowSlider');
    rangeChanged = output();
    lowValue = signal(25); // Default value for the left thumb
    highValue = signal(75); // Default value for the right thumb
    rangeChangedSubject = new Subject();
    ngAfterViewInit() {
        this.updateSliderColors();
        // Subscribe to the debounced range change subject
        this.rangeChangedSubject.pipe(debounceTime(300) // Adjust debounce time as needed
        ).subscribe((range) => {
            this.rangeChanged.emit(range);
        });
    }
    onLowThumbChange(event) {
        let value = event.target.valueAsNumber;
        // Ensure the new low value does not exceed the high value
        if (value > this.highValue()) {
            value = this.highValue();
        }
        this.lowValue.set(value);
        this.emitRange();
        this.updateSliderColors();
    }
    onHighThumbChange(event) {
        let value = event.target.valueAsNumber;
        // Ensure the new high value does not go below the low value
        if (value < this.lowValue()) {
            value = this.lowValue();
        }
        this.highValue.set(value);
        this.emitRange();
        this.updateSliderColors();
    }
    emitRange() {
        this.rangeChangedSubject.next({ low: this.lowValue(), high: this.highValue() });
    }
    updateSliderColors() {
        const lowSlider = this.lowSlider().nativeElement;
        const percentLow = ((this.lowValue() - this.min()) / (this.max() - this.min())) * 100;
        const percentHigh = ((this.highValue() - this.min()) / (this.max() - this.min())) * 100;
        lowSlider.style.background = `linear-gradient(to right, ${this.leftColor()} ${percentLow}%, ${this.rightColor()} ${percentHigh}%)`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: RmNgRangeSliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.0.0", type: RmNgRangeSliderComponent, isStandalone: true, selector: "rm-ng-range-slider", inputs: { min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, leftColor: { classPropertyName: "leftColor", publicName: "leftColor", isSignal: true, isRequired: false, transformFunction: null }, rightColor: { classPropertyName: "rightColor", publicName: "rightColor", isSignal: true, isRequired: false, transformFunction: null }, leftTooltipColor: { classPropertyName: "leftTooltipColor", publicName: "leftTooltipColor", isSignal: true, isRequired: false, transformFunction: null }, rightTooltipColor: { classPropertyName: "rightTooltipColor", publicName: "rightTooltipColor", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { rangeChanged: "rangeChanged" }, viewQueries: [{ propertyName: "lowSlider", first: true, predicate: ["lowSlider"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"slider-container\">\n  <input\n    #lowSlider\n    id=\"lowSlider\"\n    type=\"range\"\n    [min]=\"min()\"\n    [max]=\"max()\"\n    [value]=\"lowValue()\"\n    (input)=\"onLowThumbChange($event)\"\n    class=\"thumb low low-thumb\"\n  />\n  <input\n    id=\"highSlider\"\n    type=\"range\"\n    [min]=\"min()\"\n    [max]=\"max()\"\n    [value]=\"highValue()\"\n    (input)=\"onHighThumbChange($event)\"\n    class=\"thumb high high-thumb\"\n  />\n\n  <!-- Tooltip for the left thumb -->\n  <div\n    class=\"tooltip low-tooltip\"\n    [style.left.%]=\"(lowValue() - min()) / (max() - min()) * 100\"\n    [style.background]=\"leftTooltipColor()\">\n    {{ lowValue() }}\n  </div>\n\n  <!-- Tooltip for the right thumb -->\n  <div\n    class=\"tooltip high-tooltip\"\n    [style.left.%]=\"(highValue() - min()) / (max() - min()) * 100\"\n    [style.background]=\"rightTooltipColor()\">\n    {{ highValue() }}\n  </div>\n</div>\n", styles: [".slider-container{position:relative;width:100%}input[type=range]{-webkit-appearance:none;width:100%;height:6px;background:transparent;position:absolute;top:0;pointer-events:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}input[type=range]::-moz-range-thumb{width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}input[type=range]::-ms-thumb{width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}.tooltip{position:absolute;top:-40px;padding:5px;color:#fff;border-radius:3px;font-size:12px;white-space:nowrap;transform:translate(-50%)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: RmNgRangeSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-ng-range-slider', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"slider-container\">\n  <input\n    #lowSlider\n    id=\"lowSlider\"\n    type=\"range\"\n    [min]=\"min()\"\n    [max]=\"max()\"\n    [value]=\"lowValue()\"\n    (input)=\"onLowThumbChange($event)\"\n    class=\"thumb low low-thumb\"\n  />\n  <input\n    id=\"highSlider\"\n    type=\"range\"\n    [min]=\"min()\"\n    [max]=\"max()\"\n    [value]=\"highValue()\"\n    (input)=\"onHighThumbChange($event)\"\n    class=\"thumb high high-thumb\"\n  />\n\n  <!-- Tooltip for the left thumb -->\n  <div\n    class=\"tooltip low-tooltip\"\n    [style.left.%]=\"(lowValue() - min()) / (max() - min()) * 100\"\n    [style.background]=\"leftTooltipColor()\">\n    {{ lowValue() }}\n  </div>\n\n  <!-- Tooltip for the right thumb -->\n  <div\n    class=\"tooltip high-tooltip\"\n    [style.left.%]=\"(highValue() - min()) / (max() - min()) * 100\"\n    [style.background]=\"rightTooltipColor()\">\n    {{ highValue() }}\n  </div>\n</div>\n", styles: [".slider-container{position:relative;width:100%}input[type=range]{-webkit-appearance:none;width:100%;height:6px;background:transparent;position:absolute;top:0;pointer-events:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}input[type=range]::-moz-range-thumb{width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}input[type=range]::-ms-thumb{width:20px;height:20px;background-color:#fff;border:2px solid #000;border-radius:50%;cursor:pointer;position:relative;z-index:2;pointer-events:auto}.tooltip{position:absolute;top:-40px;padding:5px;color:#fff;border-radius:3px;font-size:12px;white-space:nowrap;transform:translate(-50%)}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RmNgRangeSliderComponent };
//# sourceMappingURL=rm-ng-range-slider.mjs.map
