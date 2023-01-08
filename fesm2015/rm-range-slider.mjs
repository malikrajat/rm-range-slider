import { __classPrivateFieldGet } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, interval, takeUntil } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

var _RmRangeSliderComponent_instances, _RmRangeSliderComponent_createFrom, _RmRangeSliderComponent_onFormValueChange, _RmRangeSliderComponent_controlFromSlider, _RmRangeSliderComponent_controlToSlider, _RmRangeSliderComponent_fillSlider, _RmRangeSliderComponent_getFormValue, _RmRangeSliderComponent_setToggleAccessible, _RmRangeSliderComponent_getParsed, _RmRangeSliderComponent_disabledSlider, _RmRangeSliderComponent_changeThumbColorOnDisabled;
class RmRangeSliderComponent {
    /**
     * The constructor function is a special function that is called when a new instance of the class is created
     * @param {FormBuilder} fb - FormBuilder - This is the FormBuilder service that we'll use to create our form.
     * @param {Renderer2} renderer - Renderer2 - This is the Angular Renderer2 service. It's used to manipulate the DOM.
     */
    constructor(fb, renderer) {
        this.fb = fb;
        this.renderer = renderer;
        _RmRangeSliderComponent_instances.add(this);
        this.min = 0;
        this.max = 100;
        this.setMinValue = 0;
        this.disabled = false;
        this.showToolTip = false;
        this.setMaxValue = 100;
        this.showScale = false;
        this.doubleSlider = true;
        this.toolTipColor = '#8a00e5';
        this.toolTipColorHover = '#8a00e5';
        this.toolTipColorHoverShadow = '#8a00e5';
        this.rangeColor = 'rgba(255,255,255,0.99)';
        this.sliderColor = 'rgba(255,255,255,0.47)';
        this.sliderColorRight = 'rgb(198, 198, 198)';
        this.onValueChanged = new EventEmitter();
        this.destroyed$ = new Subject();
    }
    /**
     * It creates a form.
     */
    ngOnInit() {
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_createFrom).call(this);
    }
    /**
     * A lifecycle hook that is called after a component's view has been fully initialized.
     */
    ngAfterViewInit() {
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_fillSlider).call(this, 'fromSlider', 'toSlider');
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_setToggleAccessible).call(this);
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_disabledSlider).call(this, this.disabled);
    }
    /**
     * When the component is destroyed, we want to complete the observable and let any subscribers know that the observable is
     * complete.
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /**
     * If the changes object has a property called disabled and it's not the first change and the current value is true, then
     * call the #disabledSlider function with the current value of the disabled property
     * @param {SimpleChanges} changes - SimpleChanges - this is the object that contains the changes that have been made to
     * the component.
     */
    ngOnChanges(changes) {
        if (changes && changes['disabled'] && !changes['disabled'].firstChange && changes['disabled'].currentValue) {
            __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_disabledSlider).call(this, changes['disabled'].currentValue);
        }
        if (changes &&
            changes['setMinValue'] &&
            !changes['setMinValue'].firstChange &&
            changes['setMinValue'].currentValue) {
            this.slider.patchValue({
                fromSlider: changes['setMinValue'].currentValue,
            });
        }
        if (changes &&
            changes['setMaxValue'] &&
            !changes['setMaxValue'].firstChange &&
            changes['setMaxValue'].currentValue) {
            this.slider.patchValue({
                toSlider: changes['setMaxValue'].currentValue,
            });
        }
    }
    /**
     * It's a function that takes a string as an argument and if the showToolTip property is true, it calls the
     * fromSliderToolTipPosition() or toSliderToolTipPosition() function depending on the value of the string argument
     * @param {string} slideType - string - This is the type of slider that is being moved. It can be either 'from' or 'to'.
     */
    fireEventOnInput(slideType) {
        if (this.showToolTip) {
            if (slideType === 'from') {
                this.fromSliderToolTipPosition();
            }
            if (slideType === 'to') {
                this.toSliderToolTipPosition();
            }
        }
    }
    /**
     * We're calculating the position of the tooltip based on the value of the slider
     */
    fromSliderToolTipPosition() {
        var _a;
        const val = (_a = this.slider.get('fromSlider')) === null || _a === void 0 ? void 0 : _a.value;
        const min = this.min ? this.min : 0;
        const max = this.max ? this.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        this.fromSliderToolTip.nativeElement.style.left = `calc(${newVal}% + (${-6 - newVal * 0.4}px))`;
    }
    /**
     * The function takes the value of the toSlider and converts it to a percentage value that is used to position the
     * toSliderToolTip
     */
    /**
     * The function takes the value of the toSlider and converts it to a percentage value that is used to position the
     * toSliderToolTip
     */
    toSliderToolTipPosition() {
        var _a;
        const toSlider = (_a = this.slider.get('toSlider')) === null || _a === void 0 ? void 0 : _a.value;
        const y = 0.8875 * toSlider + 3.985;
        this.toSliderToolTip.nativeElement.style.left = y + '%';
    }
    /**
     * We're getting the values of the two sliders, and then emitting an event with those values
     */
    fireEventOnChange() {
        var _a, _b;
        const toSlider = (_a = this.slider.get('toSlider')) === null || _a === void 0 ? void 0 : _a.value;
        const fromSlider = (_b = this.slider.get('fromSlider')) === null || _b === void 0 ? void 0 : _b.value;
        const maxMin = {
            min: fromSlider,
            max: toSlider,
        };
        this.onValueChanged.emit(maxMin);
    }
}
_RmRangeSliderComponent_instances = new WeakSet(), _RmRangeSliderComponent_createFrom = function _RmRangeSliderComponent_createFrom() {
    this.slider = this.fb.group({
        fromSlider: [this.setMinValue, [Validators.required, Validators.max(this.max), Validators.min(this.min)]],
        toSlider: [this.setMaxValue, [Validators.required, Validators.max(this.max), Validators.min(this.min)]],
    });
    __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_onFormValueChange).call(this);
}, _RmRangeSliderComponent_onFormValueChange = function _RmRangeSliderComponent_onFormValueChange() {
    var _a, _b;
    (_a = this.slider.get('fromSlider')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(() => {
        var _a;
        const fromSlider = (_a = this.slider.get('fromSlider')) === null || _a === void 0 ? void 0 : _a.value;
        if (this.fromSliderToolTip) {
            this.fromSliderToolTip.nativeElement.innerHTML = `<span>${fromSlider}</span>`;
        }
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_controlFromSlider).call(this, 'fromSlider', 'toSlider');
    });
    (_b = this.slider.get('toSlider')) === null || _b === void 0 ? void 0 : _b.valueChanges.subscribe(() => {
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_controlToSlider).call(this, 'fromSlider', 'toSlider');
    });
}, _RmRangeSliderComponent_controlFromSlider = function _RmRangeSliderComponent_controlFromSlider(fromSlider, toSlider) {
    const [from, to] = __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_getParsed).call(this, 'fromSlider', 'toSlider');
    __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_fillSlider).call(this, fromSlider, toSlider);
    if (from > to) {
        this.slider.patchValue({
            fromSlider: to,
        });
    }
}, _RmRangeSliderComponent_controlToSlider = function _RmRangeSliderComponent_controlToSlider(fromSlider, toSlider) {
    const [from, to] = __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_getParsed).call(this, 'fromSlider', 'toSlider');
    __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_fillSlider).call(this, fromSlider, toSlider);
    __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_setToggleAccessible).call(this);
    if (from <= to) {
        this.slider.patchValue({
            toSlider: to,
        });
    }
    else {
        /**
         * We're taking the values of the two inputs, calculating the percentage of the slider that should be filled, and then
         * setting the background of the slider to a gradient that fills the slider to the appropriate percentage
         * @param {string} fromC - string - the name of the form control for the left slider
         * @param {string} toC - string - the color of the slider
         */
        this.slider.patchValue({
            toSlider: from,
        });
    }
}, _RmRangeSliderComponent_fillSlider = function _RmRangeSliderComponent_fillSlider(fromC, toC) {
    const from = __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_getFormValue).call(this, fromC);
    const to = __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_getFormValue).call(this, toC);
    const sliderColor = this.sliderColor;
    const rangeColor = this.rangeColor;
    const rangeDistance = this.max - this.min;
    const fromPosition = this.doubleSlider ? from - this.min : this.min;
    const toPosition = to - this.min;
    this.gradient = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
 /**
	 * It returns the value of the form field that is passed in as a parameter
	 * @param {string} FormField - The name of the form field you want to get the value of.
	 * @returns The value of the form field.
	 */
	   ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
    ${this.sliderColorRight} ${(toPosition / rangeDistance) * 100}%,
    ${this.sliderColorRight} 100%)`;
    this.renderer.setStyle(this.toSliders.nativeElement, 'background', this.gradient);
}, _RmRangeSliderComponent_getFormValue = function _RmRangeSliderComponent_getFormValue(FormField) {
    var _a;
    return (_a = this.slider.get(FormField)) === null || _a === void 0 ? void 0 : _a.value;
}, _RmRangeSliderComponent_setToggleAccessible = function _RmRangeSliderComponent_setToggleAccessible() {
    var _a;
    const currentTarget = (_a = this.slider.get('toSlider')) === null || _a === void 0 ? void 0 : _a.value;
    if (Number(currentTarget.value) <= 0) {
        this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 2);
    }
    else {
        this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 0);
    }
}, _RmRangeSliderComponent_getParsed = function _RmRangeSliderComponent_getParsed(currentFrom, currentTo) {
    var _a, _b;
    const from = parseInt((_a = this.slider.get(currentFrom)) === null || _a === void 0 ? void 0 : _a.value, 10);
    const to = parseInt((_b = this.slider.get(currentTo)) === null || _b === void 0 ? void 0 : _b.value, 10);
    return [from, to];
}, _RmRangeSliderComponent_disabledSlider = function _RmRangeSliderComponent_disabledSlider(isDisabled) {
    interval(1)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
        if (this.doubleSlider) {
            this.fromSlider.nativeElement.disabled = isDisabled;
            this.fromSliderToolTipPosition();
        }
        this.toSliders.nativeElement.disabled = isDisabled;
        this.toSliderToolTipPosition();
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_changeThumbColorOnDisabled).call(this);
    });
}, _RmRangeSliderComponent_changeThumbColorOnDisabled = function _RmRangeSliderComponent_changeThumbColorOnDisabled() {
    if (this.disabled) {
        this.toolTipColor = '#dddddd';
        this.toolTipColorHover = '#dddddd';
        this.toolTipColorHoverShadow = 'none';
    }
    if (this.fromSliderToolTip) {
        this.renderer.setStyle(this.fromSliderToolTip.nativeElement, 'background-color', this.toolTipColor);
        this.fromSliderToolTip.nativeElement.style.setProperty('--tooltip-arrow', this.toolTipColor);
    }
    if (this.toSliderToolTip) {
        this.renderer.setStyle(this.toSliderToolTip.nativeElement, 'background-color', this.toolTipColor);
        this.toSliderToolTip.nativeElement.style.setProperty('--tooltip-arrow', this.toolTipColor);
    }
    if (this.fromSlider) {
        this.fromSlider.nativeElement.style.setProperty('--slider-thumb-color', this.toolTipColor);
        this.fromSlider.nativeElement.style.setProperty('--slider-thumb-color-hover', this.toolTipColorHover);
        this.fromSlider.nativeElement.style.setProperty('--slider-thumb-color-hover-shadow', this.toolTipColorHoverShadow);
    }
    if (this.toSliders) {
        this.toSliders.nativeElement.style.setProperty('--slider-thumb-color', this.toolTipColor);
        this.toSliders.nativeElement.style.setProperty('--slider-thumb-color-hover', this.toolTipColorHover);
        this.toSliders.nativeElement.style.setProperty('--slider-thumb-color-hover-shadow', this.toolTipColorHoverShadow);
    }
};
RmRangeSliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderComponent, deps: [{ token: i1.FormBuilder }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RmRangeSliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.4", type: RmRangeSliderComponent, selector: "rm-range-slider", inputs: { min: ["SliderMinRange", "min"], max: ["SliderMaxRange", "max"], setMinValue: "setMinValue", disabled: "disabled", showToolTip: "showToolTip", setMaxValue: "setMaxValue", showScale: "showScale", doubleSlider: "doubleSlider", toolTipColor: "toolTipColor", toolTipColorHover: "toolTipColorHover", toolTipColorHoverShadow: "toolTipColorHoverShadow", rangeColor: "rangeColor", sliderColor: "sliderColor", sliderColorRight: "sliderColorRight" }, outputs: { onValueChanged: "onValueChanged" }, viewQueries: [{ propertyName: "toSliders", first: true, predicate: ["toSliders"], descendants: true }, { propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSliderToolTip", first: true, predicate: ["toSliderToolTip"], descendants: true, read: ElementRef }, { propertyName: "fromSliderToolTip", first: true, predicate: ["fromSliderToolTip"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"slider\" novalidate>\r\n\t<div class=\"range_container\">\r\n\t\t<div class=\"sliders_control\">\r\n\t\t\t<input\r\n\t\t\t\t#fromSlider\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('from')\"\r\n\t\t\t\t*ngIf=\"doubleSlider\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"from-slider range\"\r\n\t\t\t\tformControlName=\"fromSlider\"\r\n\t\t\t\tid=\"fromSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\r\n\t\t\t<ng-container *ngIf=\"showToolTip\">\r\n\t\t\t\t<div #fromSliderToolTip *ngIf=\"doubleSlider\" class=\"tooltip\" id=\"rangeFrom\">\r\n\t\t\t\t\t{{ slider.get('fromSlider')?.value }}\r\n\t\t\t\t</div>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<input\r\n\t\t\t\t#toSliders\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('to')\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"toSlider range\"\r\n\t\t\t\tformControlName=\"toSlider\"\r\n\t\t\t\tid=\"toSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\t\t\t<div #toSliderToolTip *ngIf=\"showToolTip\" class=\"toSliderTooltip\" id=\"rangeTo\">\r\n\t\t\t\t{{ slider.get('toSlider')?.value }}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.form_control{position:relative;display:flex}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{-webkit-appearance:none;appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-range-slider', template: "<form [formGroup]=\"slider\" novalidate>\r\n\t<div class=\"range_container\">\r\n\t\t<div class=\"sliders_control\">\r\n\t\t\t<input\r\n\t\t\t\t#fromSlider\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('from')\"\r\n\t\t\t\t*ngIf=\"doubleSlider\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"from-slider range\"\r\n\t\t\t\tformControlName=\"fromSlider\"\r\n\t\t\t\tid=\"fromSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\r\n\t\t\t<ng-container *ngIf=\"showToolTip\">\r\n\t\t\t\t<div #fromSliderToolTip *ngIf=\"doubleSlider\" class=\"tooltip\" id=\"rangeFrom\">\r\n\t\t\t\t\t{{ slider.get('fromSlider')?.value }}\r\n\t\t\t\t</div>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<input\r\n\t\t\t\t#toSliders\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('to')\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"toSlider range\"\r\n\t\t\t\tformControlName=\"toSlider\"\r\n\t\t\t\tid=\"toSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\t\t\t<div #toSliderToolTip *ngIf=\"showToolTip\" class=\"toSliderTooltip\" id=\"rangeTo\">\r\n\t\t\t\t{{ slider.get('toSlider')?.value }}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.form_control{position:relative;display:flex}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{-webkit-appearance:none;appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i0.Renderer2 }]; }, propDecorators: { min: [{
                type: Input,
                args: ['SliderMinRange']
            }], max: [{
                type: Input,
                args: ['SliderMaxRange']
            }], setMinValue: [{
                type: Input,
                args: ['setMinValue']
            }], disabled: [{
                type: Input,
                args: ['disabled']
            }], showToolTip: [{
                type: Input,
                args: ['showToolTip']
            }], setMaxValue: [{
                type: Input,
                args: ['setMaxValue']
            }], showScale: [{
                type: Input,
                args: ['showScale']
            }], doubleSlider: [{
                type: Input,
                args: ['doubleSlider']
            }], toolTipColor: [{
                type: Input,
                args: ['toolTipColor']
            }], toolTipColorHover: [{
                type: Input,
                args: ['toolTipColorHover']
            }], toolTipColorHoverShadow: [{
                type: Input,
                args: ['toolTipColorHoverShadow']
            }], rangeColor: [{
                type: Input,
                args: ['rangeColor']
            }], sliderColor: [{
                type: Input,
                args: ['sliderColor']
            }], sliderColorRight: [{
                type: Input,
                args: ['sliderColorRight']
            }], onValueChanged: [{
                type: Output,
                args: ['onValueChanged']
            }], toSliders: [{
                type: ViewChild,
                args: ['toSliders', { static: false }]
            }], fromSlider: [{
                type: ViewChild,
                args: ['fromSlider', { static: false }]
            }], toSliderToolTip: [{
                type: ViewChild,
                args: ['toSliderToolTip', { read: ElementRef }]
            }], fromSliderToolTip: [{
                type: ViewChild,
                args: ['fromSliderToolTip', { read: ElementRef }]
            }] } });

class RmRangeSliderModule {
}
RmRangeSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RmRangeSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderModule, declarations: [RmRangeSliderComponent], imports: [ReactiveFormsModule, CommonModule], exports: [RmRangeSliderComponent] });
RmRangeSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderModule, imports: [ReactiveFormsModule, CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: RmRangeSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RmRangeSliderComponent],
                    imports: [ReactiveFormsModule, CommonModule],
                    exports: [RmRangeSliderComponent],
                }]
        }] });

/*
 * Public API Surface of rm-range-slider
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RmRangeSliderComponent, RmRangeSliderModule };
//# sourceMappingURL=rm-range-slider.mjs.map
