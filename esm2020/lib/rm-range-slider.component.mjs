var _RmRangeSliderComponent_instances, _RmRangeSliderComponent_createFrom, _RmRangeSliderComponent_onFormValueChange, _RmRangeSliderComponent_controlFromSlider, _RmRangeSliderComponent_controlToSlider, _RmRangeSliderComponent_fillSlider, _RmRangeSliderComponent_getFormValue, _RmRangeSliderComponent_setToggleAccessible, _RmRangeSliderComponent_getParsed, _RmRangeSliderComponent_disabledSlider, _RmRangeSliderComponent_changeThumbColorOnDisabled;
import { __classPrivateFieldGet } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Validators } from '@angular/forms';
import { interval, Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class RmRangeSliderComponent {
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
        const val = this.slider.get('fromSlider')?.value;
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
        const toSlider = this.slider.get('toSlider')?.value;
        const y = 0.8875 * toSlider + 3.985;
        this.toSliderToolTip.nativeElement.style.left = y + '%';
    }
    /**
     * We're getting the values of the two sliders, and then emitting an event with those values
     */
    fireEventOnChange() {
        const toSlider = this.slider.get('toSlider')?.value;
        const fromSlider = this.slider.get('fromSlider')?.value;
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
    this.slider.get('fromSlider')?.valueChanges.subscribe(() => {
        const fromSlider = this.slider.get('fromSlider')?.value;
        if (this.fromSliderToolTip) {
            this.fromSliderToolTip.nativeElement.innerHTML = `<span>${fromSlider}</span>`;
        }
        __classPrivateFieldGet(this, _RmRangeSliderComponent_instances, "m", _RmRangeSliderComponent_controlFromSlider).call(this, 'fromSlider', 'toSlider');
    });
    this.slider.get('toSlider')?.valueChanges.subscribe(() => {
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
    return this.slider.get(FormField)?.value;
}, _RmRangeSliderComponent_setToggleAccessible = function _RmRangeSliderComponent_setToggleAccessible() {
    const currentTarget = this.slider.get('toSlider')?.value;
    if (Number(currentTarget.value) <= 0) {
        this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 2);
    }
    else {
        this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 0);
    }
}, _RmRangeSliderComponent_getParsed = function _RmRangeSliderComponent_getParsed(currentFrom, currentTo) {
    const from = parseInt(this.slider.get(currentFrom)?.value, 10);
    const to = parseInt(this.slider.get(currentTo)?.value, 10);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JtLXJhbmdlLXNsaWRlci9zcmMvbGliL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9ybS1yYW5nZS1zbGlkZXIvc3JjL2xpYi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBRU4sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEdBQ1QsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUE7Ozs7QUFRbkQsTUFBTSxPQUFPLHNCQUFzQjtJQXdCbEM7Ozs7T0FJRztJQUNILFlBQTZCLEVBQWUsRUFBVSxRQUFtQjtRQUE1QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7UUEzQmhELFFBQUcsR0FBVyxDQUFDLENBQUE7UUFDZixRQUFHLEdBQVcsR0FBRyxDQUFBO1FBQ3BCLGdCQUFXLEdBQVcsQ0FBQyxDQUFBO1FBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUE7UUFDdEIsZ0JBQVcsR0FBWSxLQUFLLENBQUE7UUFDNUIsZ0JBQVcsR0FBVyxHQUFHLENBQUE7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFZLElBQUksQ0FBQTtRQUM1QixpQkFBWSxHQUFXLFNBQVMsQ0FBQTtRQUMzQixzQkFBaUIsR0FBVyxTQUFTLENBQUE7UUFDL0IsNEJBQXVCLEdBQVcsU0FBUyxDQUFBO1FBQ3hELGVBQVUsR0FBVyx3QkFBd0IsQ0FBQTtRQUM1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dUJBQUMsa0JBQWtCO2dCQUNDLGNBQWM7c0JBQXZDLE1BQU07dUJBQUMsZ0JBQWdCO2dCQUNtQixTQUFTO3NCQUFuRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0csVUFBVTtzQkFBckQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNVLGVBQWU7c0JBQWxFLFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUNJLGlCQUFpQjtzQkFBdEUsU0FBUzt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LFxuXHRDb21wb25lbnQsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5wdXQsXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7IGludGVydmFsLCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgTUlOTUFYIH0gZnJvbSAnLi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50LmludGVyZmFjZSdcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAncm0tcmFuZ2Utc2xpZGVyJyxcblx0dGVtcGxhdGVVcmw6ICcuL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBSbVJhbmdlU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblx0cHVibGljIHNsaWRlciE6IEZvcm1Hcm91cFxuXHRASW5wdXQoJ1NsaWRlck1pblJhbmdlJykgbWluOiBudW1iZXIgPSAwXG5cdEBJbnB1dCgnU2xpZGVyTWF4UmFuZ2UnKSBtYXg6IG51bWJlciA9IDEwMFxuXHRASW5wdXQoJ3NldE1pblZhbHVlJykgc2V0TWluVmFsdWU6IG51bWJlciA9IDBcblx0QElucHV0KCdkaXNhYmxlZCcpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2Vcblx0QElucHV0KCdzaG93VG9vbFRpcCcpIHNob3dUb29sVGlwOiBib29sZWFuID0gZmFsc2Vcblx0QElucHV0KCdzZXRNYXhWYWx1ZScpIHNldE1heFZhbHVlOiBudW1iZXIgPSAxMDBcblx0QElucHV0KCdzaG93U2NhbGUnKSBzaG93U2NhbGU6IGJvb2xlYW4gPSBmYWxzZVxuXHRASW5wdXQoJ2RvdWJsZVNsaWRlcicpIGRvdWJsZVNsaWRlcjogYm9vbGVhbiA9IHRydWVcblx0QElucHV0KCd0b29sVGlwQ29sb3InKSB0b29sVGlwQ29sb3I6IHN0cmluZyA9ICcjOGEwMGU1J1xuXHRASW5wdXQoJ3Rvb2xUaXBDb2xvckhvdmVyJykgdG9vbFRpcENvbG9ySG92ZXI6IHN0cmluZyA9ICcjOGEwMGU1J1xuXHRASW5wdXQoJ3Rvb2xUaXBDb2xvckhvdmVyU2hhZG93JykgdG9vbFRpcENvbG9ySG92ZXJTaGFkb3c6IHN0cmluZyA9ICcjOGEwMGU1J1xuXHRASW5wdXQoJ3JhbmdlQ29sb3InKSByYW5nZUNvbG9yOiBzdHJpbmcgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjk5KSdcblx0QElucHV0KCdzbGlkZXJDb2xvcicpIHNsaWRlckNvbG9yOiBzdHJpbmcgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjQ3KSdcblx0QElucHV0KCdzbGlkZXJDb2xvclJpZ2h0Jykgc2xpZGVyQ29sb3JSaWdodDogc3RyaW5nID0gJ3JnYigxOTgsIDE5OCwgMTk4KSdcblx0QE91dHB1dCgnb25WYWx1ZUNoYW5nZWQnKSBvblZhbHVlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE1JTk1BWD4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblx0QFZpZXdDaGlsZCgndG9TbGlkZXJzJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRvU2xpZGVycyE6IEVsZW1lbnRSZWZcblx0QFZpZXdDaGlsZCgnZnJvbVNsaWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBmcm9tU2xpZGVyITogRWxlbWVudFJlZlxuXHRAVmlld0NoaWxkKCd0b1NsaWRlclRvb2xUaXAnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgdG9TbGlkZXJUb29sVGlwITogRWxlbWVudFJlZlxuXHRAVmlld0NoaWxkKCdmcm9tU2xpZGVyVG9vbFRpcCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBmcm9tU2xpZGVyVG9vbFRpcCE6IEVsZW1lbnRSZWZcblx0cHJpdmF0ZSBncmFkaWVudCE6IHN0cmluZ1xuXHRwcml2YXRlIGRlc3Ryb3llZCQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpXG5cblx0LyoqXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpcyBhIHNwZWNpYWwgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgY2xhc3MgaXMgY3JlYXRlZFxuXHQgKiBAcGFyYW0ge0Zvcm1CdWlsZGVyfSBmYiAtIEZvcm1CdWlsZGVyIC0gVGhpcyBpcyB0aGUgRm9ybUJ1aWxkZXIgc2VydmljZSB0aGF0IHdlJ2xsIHVzZSB0byBjcmVhdGUgb3VyIGZvcm0uXG5cdCAqIEBwYXJhbSB7UmVuZGVyZXIyfSByZW5kZXJlciAtIFJlbmRlcmVyMiAtIFRoaXMgaXMgdGhlIEFuZ3VsYXIgUmVuZGVyZXIyIHNlcnZpY2UuIEl0J3MgdXNlZCB0byBtYW5pcHVsYXRlIHRoZSBET00uXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG5cdC8qKlxuXHQgKiBJdCBjcmVhdGVzIGEgZm9ybS5cblx0ICovXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuI2NyZWF0ZUZyb20oKVxuXHR9XG5cblx0LyoqXG5cdCAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQncyB2aWV3IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxuXHQgKi9cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuI2ZpbGxTbGlkZXIoJ2Zyb21TbGlkZXInLCAndG9TbGlkZXInKVxuXHRcdHRoaXMuI3NldFRvZ2dsZUFjY2Vzc2libGUoKVxuXHRcdHRoaXMuI2Rpc2FibGVkU2xpZGVyKHRoaXMuZGlzYWJsZWQpXG5cdH1cblxuXHQvKipcblx0ICogV2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZCwgd2Ugd2FudCB0byBjb21wbGV0ZSB0aGUgb2JzZXJ2YWJsZSBhbmQgbGV0IGFueSBzdWJzY3JpYmVycyBrbm93IHRoYXQgdGhlIG9ic2VydmFibGUgaXNcblx0ICogY29tcGxldGUuXG5cdCAqL1xuXHRuZ09uRGVzdHJveSgpOiB2b2lkIHtcblx0XHR0aGlzLmRlc3Ryb3llZCQubmV4dCgpXG5cdFx0dGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKClcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgY2hhbmdlcyBvYmplY3QgaGFzIGEgcHJvcGVydHkgY2FsbGVkIGRpc2FibGVkIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgY2hhbmdlIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBpcyB0cnVlLCB0aGVuXG5cdCAqIGNhbGwgdGhlICNkaXNhYmxlZFNsaWRlciBmdW5jdGlvbiB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eVxuXHQgKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBTaW1wbGVDaGFuZ2VzIC0gdGhpcyBpcyB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gbWFkZSB0b1xuXHQgKiB0aGUgY29tcG9uZW50LlxuXHQgKi9cblx0bmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXHRcdGlmIChjaGFuZ2VzICYmIGNoYW5nZXNbJ2Rpc2FibGVkJ10gJiYgIWNoYW5nZXNbJ2Rpc2FibGVkJ10uZmlyc3RDaGFuZ2UgJiYgY2hhbmdlc1snZGlzYWJsZWQnXS5jdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMuI2Rpc2FibGVkU2xpZGVyKGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKVxuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRjaGFuZ2VzICYmXG5cdFx0XHRjaGFuZ2VzWydzZXRNaW5WYWx1ZSddICYmXG5cdFx0XHQhY2hhbmdlc1snc2V0TWluVmFsdWUnXS5maXJzdENoYW5nZSAmJlxuXHRcdFx0Y2hhbmdlc1snc2V0TWluVmFsdWUnXS5jdXJyZW50VmFsdWVcblx0XHQpIHtcblx0XHRcdHRoaXMuc2xpZGVyLnBhdGNoVmFsdWUoe1xuXHRcdFx0XHRmcm9tU2xpZGVyOiBjaGFuZ2VzWydzZXRNaW5WYWx1ZSddLmN1cnJlbnRWYWx1ZSxcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGNoYW5nZXMgJiZcblx0XHRcdGNoYW5nZXNbJ3NldE1heFZhbHVlJ10gJiZcblx0XHRcdCFjaGFuZ2VzWydzZXRNYXhWYWx1ZSddLmZpcnN0Q2hhbmdlICYmXG5cdFx0XHRjaGFuZ2VzWydzZXRNYXhWYWx1ZSddLmN1cnJlbnRWYWx1ZVxuXHRcdCkge1xuXHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XG5cdFx0XHRcdHRvU2xpZGVyOiBjaGFuZ2VzWydzZXRNYXhWYWx1ZSddLmN1cnJlbnRWYWx1ZSxcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEl0J3MgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc3RyaW5nIGFzIGFuIGFyZ3VtZW50IGFuZCBpZiB0aGUgc2hvd1Rvb2xUaXAgcHJvcGVydHkgaXMgdHJ1ZSwgaXQgY2FsbHMgdGhlXG5cdCAqIGZyb21TbGlkZXJUb29sVGlwUG9zaXRpb24oKSBvciB0b1NsaWRlclRvb2xUaXBQb3NpdGlvbigpIGZ1bmN0aW9uIGRlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgdGhlIHN0cmluZyBhcmd1bWVudFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2xpZGVUeXBlIC0gc3RyaW5nIC0gVGhpcyBpcyB0aGUgdHlwZSBvZiBzbGlkZXIgdGhhdCBpcyBiZWluZyBtb3ZlZC4gSXQgY2FuIGJlIGVpdGhlciAnZnJvbScgb3IgJ3RvJy5cblx0ICovXG5cdGZpcmVFdmVudE9uSW5wdXQoc2xpZGVUeXBlOiBzdHJpbmcpIHtcblx0XHRpZiAodGhpcy5zaG93VG9vbFRpcCkge1xuXHRcdFx0aWYgKHNsaWRlVHlwZSA9PT0gJ2Zyb20nKSB7XG5cdFx0XHRcdHRoaXMuZnJvbVNsaWRlclRvb2xUaXBQb3NpdGlvbigpXG5cdFx0XHR9XG5cdFx0XHRpZiAoc2xpZGVUeXBlID09PSAndG8nKSB7XG5cdFx0XHRcdHRoaXMudG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBXZSdyZSBjYWxjdWxhdGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHRvb2x0aXAgYmFzZWQgb24gdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXJcblx0ICovXG5cdGZyb21TbGlkZXJUb29sVGlwUG9zaXRpb24oKSB7XG5cdFx0Y29uc3QgdmFsID0gdGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlXG5cdFx0Y29uc3QgbWluID0gdGhpcy5taW4gPyB0aGlzLm1pbiA6IDBcblx0XHRjb25zdCBtYXggPSB0aGlzLm1heCA/IHRoaXMubWF4IDogMTAwXG5cdFx0Y29uc3QgbmV3VmFsID0gTnVtYmVyKCgodmFsIC0gbWluKSAqIDEwMCkgLyAobWF4IC0gbWluKSlcblx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGBjYWxjKCR7bmV3VmFsfSUgKyAoJHstNiAtIG5ld1ZhbCAqIDAuNH1weCkpYFxuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgdmFsdWUgb2YgdGhlIHRvU2xpZGVyIGFuZCBjb252ZXJ0cyBpdCB0byBhIHBlcmNlbnRhZ2UgdmFsdWUgdGhhdCBpcyB1c2VkIHRvIHBvc2l0aW9uIHRoZVxuXHQgKiB0b1NsaWRlclRvb2xUaXBcblx0ICovXG5cdC8qKlxuXHQgKiBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIHZhbHVlIG9mIHRoZSB0b1NsaWRlciBhbmQgY29udmVydHMgaXQgdG8gYSBwZXJjZW50YWdlIHZhbHVlIHRoYXQgaXMgdXNlZCB0byBwb3NpdGlvbiB0aGVcblx0ICogdG9TbGlkZXJUb29sVGlwXG5cdCAqL1xuXHR0b1NsaWRlclRvb2xUaXBQb3NpdGlvbigpIHtcblx0XHRjb25zdCB0b1NsaWRlciA9IHRoaXMuc2xpZGVyLmdldCgndG9TbGlkZXInKT8udmFsdWVcblx0XHRjb25zdCB5ID0gMC44ODc1ICogdG9TbGlkZXIgKyAzLjk4NVxuXHRcdHRoaXMudG9TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IHkgKyAnJSdcblx0fVxuXG5cdC8qKlxuXHQgKiBXZSdyZSBnZXR0aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHR3byBzbGlkZXJzLCBhbmQgdGhlbiBlbWl0dGluZyBhbiBldmVudCB3aXRoIHRob3NlIHZhbHVlc1xuXHQgKi9cblx0ZmlyZUV2ZW50T25DaGFuZ2UoKSB7XG5cdFx0Y29uc3QgdG9TbGlkZXIgPSB0aGlzLnNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlXG5cdFx0Y29uc3QgZnJvbVNsaWRlciA9IHRoaXMuc2xpZGVyLmdldCgnZnJvbVNsaWRlcicpPy52YWx1ZVxuXHRcdGNvbnN0IG1heE1pbiA9IHtcblx0XHRcdG1pbjogZnJvbVNsaWRlcixcblx0XHRcdG1heDogdG9TbGlkZXIsXG5cdFx0fVxuXHRcdHRoaXMub25WYWx1ZUNoYW5nZWQuZW1pdChtYXhNaW4pXG5cdH1cblxuXHQvKipcblx0ICogVGhlIGZ1bmN0aW9uIGNyZWF0ZXMgYSBmb3JtIGdyb3VwIHdpdGggdHdvIGZvcm0gY29udHJvbHMsIG9uZSBmb3IgdGhlIG1pbmltdW0gdmFsdWUgYW5kIG9uZSBmb3IgdGhlIG1heGltdW0gdmFsdWVcblx0ICovXG5cdCNjcmVhdGVGcm9tKCkge1xuXHRcdHRoaXMuc2xpZGVyID0gdGhpcy5mYi5ncm91cCh7XG5cdFx0XHRmcm9tU2xpZGVyOiBbdGhpcy5zZXRNaW5WYWx1ZSwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMubWF4KHRoaXMubWF4KSwgVmFsaWRhdG9ycy5taW4odGhpcy5taW4pXV0sXG5cdFx0XHR0b1NsaWRlcjogW3RoaXMuc2V0TWF4VmFsdWUsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1heCh0aGlzLm1heCksIFZhbGlkYXRvcnMubWluKHRoaXMubWluKV1dLFxuXHRcdH0pXG5cdFx0dGhpcy4jb25Gb3JtVmFsdWVDaGFuZ2UoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBmdW5jdGlvbiBzdWJzY3JpYmVzIHRvIHRoZSB2YWx1ZUNoYW5nZXMgb2YgdGhlIGZyb21TbGlkZXIgYW5kIHRvU2xpZGVyLlxuXHQgKlxuXHQgKiBUaGUgZnJvbVNsaWRlciBpcyB0aGUgc2xpZGVyIG9uIHRoZSBsZWZ0IGFuZCB0aGUgdG9TbGlkZXIgaXMgdGhlIHNsaWRlciBvbiB0aGUgcmlnaHQuXG5cdCAqXG5cdCAqIFRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb25Gb3JtVmFsdWVDaGFuZ2UoKSBiZWNhdXNlIGl0IGlzIGNhbGxlZCBpbiB0aGUgbmdPbkluaXQoKSBmdW5jdGlvbi5cblx0ICpcblx0ICogVGhlIG5nT25Jbml0KCkgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZC5cblx0ICpcblx0ICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbkZvcm1WYWx1ZUNoYW5nZSgpIGJlY2F1c2UgaXQgaXMgY2FsbGVkIGluIHRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmdPbkluaXQoKSBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkLlxuXHQgKlxuXHQgKiBUaGUgZnVuY3Rpb24gaXMgY2FsbGVkIG9uRm9ybVZhbHVlQ2hhbmdlKCkgYmVjYXVzZSBpdCBpcyBjYWxsZWQgaW4gdGhlIG5nT25Jbml0KCkgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIFRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQuXG5cdCAqXG5cdCAqIFRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb25Gb3JtVmFsdWVDaGFuZ2UoKSBiZWNhdXNlIGl0IGlzIGNhbGxlZCBpbiB0aGUgbmdPbkluaXQoKSBmdW5jdGlvbi5cblx0ICpcblx0ICogVGhlIG5nT25Jbml0XG5cdCAqL1xuXHQjb25Gb3JtVmFsdWVDaGFuZ2UoKSB7XG5cdFx0dGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0Y29uc3QgZnJvbVNsaWRlciA9IHRoaXMuc2xpZGVyLmdldCgnZnJvbVNsaWRlcicpPy52YWx1ZVxuXHRcdFx0aWYgKHRoaXMuZnJvbVNsaWRlclRvb2xUaXApIHtcblx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IGA8c3Bhbj4ke2Zyb21TbGlkZXJ9PC9zcGFuPmBcblx0XHRcdH1cblx0XHRcdHRoaXMuI2NvbnRyb2xGcm9tU2xpZGVyKCdmcm9tU2xpZGVyJywgJ3RvU2xpZGVyJylcblx0XHR9KVxuXHRcdHRoaXMuc2xpZGVyLmdldCgndG9TbGlkZXInKT8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLiNjb250cm9sVG9TbGlkZXIoJ2Zyb21TbGlkZXInLCAndG9TbGlkZXInKVxuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIHZhbHVlIG9mIHRoZSBmcm9tU2xpZGVyIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgdGhlIHRvU2xpZGVyLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgZnJvbVNsaWRlciBpcyBzZXQgdG9cblx0ICogdGhlIHZhbHVlIG9mIHRoZSB0b1NsaWRlclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVNsaWRlciAtIHRoZSBuYW1lIG9mIHRoZSBmcm9tIHNsaWRlclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdG9TbGlkZXIgLSBzdHJpbmcgLSB0aGUgbmFtZSBvZiB0aGUgdG9TbGlkZXIgY29udHJvbFxuXHQgKi9cblx0I2NvbnRyb2xGcm9tU2xpZGVyKGZyb21TbGlkZXI6IHN0cmluZywgdG9TbGlkZXI6IHN0cmluZykge1xuXHRcdGNvbnN0IFtmcm9tLCB0b10gPSB0aGlzLiNnZXRQYXJzZWQoJ2Zyb21TbGlkZXInLCAndG9TbGlkZXInKVxuXHRcdHRoaXMuI2ZpbGxTbGlkZXIoZnJvbVNsaWRlciwgdG9TbGlkZXIpXG5cdFx0aWYgKGZyb20gPiB0bykge1xuXHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XG5cdFx0XHRcdGZyb21TbGlkZXI6IHRvLFxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogPiBJZiB0aGUgdmFsdWUgb2YgdGhlIGBmcm9tU2xpZGVyYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZSBgdG9TbGlkZXJgLCB0aGVuIHNldCB0aGUgdmFsdWUgb2YgdGhlXG5cdCAqIGB0b1NsaWRlcmAgdG8gdGhlIHZhbHVlIG9mIHRoZSBgdG9TbGlkZXJgLiBPdGhlcndpc2UsIHNldCB0aGUgdmFsdWUgb2YgdGhlIGB0b1NsaWRlcmAgdG8gdGhlIHZhbHVlIG9mIHRoZSBgZnJvbVNsaWRlcmBcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZyb21TbGlkZXIgLSBUaGUgbmFtZSBvZiB0aGUgc2xpZGVyIHRoYXQgaXMgYmVpbmcgY2hhbmdlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRvU2xpZGVyIC0gVGhlIG5hbWUgb2YgdGhlIHNsaWRlciB0aGF0IGlzIGJlaW5nIGNoYW5nZWQuXG5cdCAqL1xuXHQjY29udHJvbFRvU2xpZGVyKGZyb21TbGlkZXI6IHN0cmluZywgdG9TbGlkZXI6IHN0cmluZykge1xuXHRcdGNvbnN0IFtmcm9tLCB0b10gPSB0aGlzLiNnZXRQYXJzZWQoJ2Zyb21TbGlkZXInLCAndG9TbGlkZXInKVxuXHRcdHRoaXMuI2ZpbGxTbGlkZXIoZnJvbVNsaWRlciwgdG9TbGlkZXIpXG5cdFx0dGhpcy4jc2V0VG9nZ2xlQWNjZXNzaWJsZSgpXG5cdFx0aWYgKGZyb20gPD0gdG8pIHtcblx0XHRcdHRoaXMuc2xpZGVyLnBhdGNoVmFsdWUoe1xuXHRcdFx0XHR0b1NsaWRlcjogdG8sXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFdlJ3JlIHRha2luZyB0aGUgdmFsdWVzIG9mIHRoZSB0d28gaW5wdXRzLCBjYWxjdWxhdGluZyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgc2xpZGVyIHRoYXQgc2hvdWxkIGJlIGZpbGxlZCwgYW5kIHRoZW5cblx0XHRcdCAqIHNldHRpbmcgdGhlIGJhY2tncm91bmQgb2YgdGhlIHNsaWRlciB0byBhIGdyYWRpZW50IHRoYXQgZmlsbHMgdGhlIHNsaWRlciB0byB0aGUgYXBwcm9wcmlhdGUgcGVyY2VudGFnZVxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGZyb21DIC0gc3RyaW5nIC0gdGhlIG5hbWUgb2YgdGhlIGZvcm0gY29udHJvbCBmb3IgdGhlIGxlZnQgc2xpZGVyXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdG9DIC0gc3RyaW5nIC0gdGhlIGNvbG9yIG9mIHRoZSBzbGlkZXJcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XG5cdFx0XHRcdHRvU2xpZGVyOiBmcm9tLFxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSXQgcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBpcyBwYXNzZWQgaW4gYXMgYSBwYXJhbWV0ZXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZyb21DIC0gVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBjb250YWlucyB0aGUgdmFsdWUgb2YgdGhlIGxlZnQgc2xpZGVyLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdG9DIC0gVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBjb250YWlucyB0aGUgdmFsdWUgb2YgdGhlIHJpZ2h0IHNsaWRlci5cblx0ICovXG5cdCNmaWxsU2xpZGVyKGZyb21DOiBzdHJpbmcsIHRvQzogc3RyaW5nKSB7XG5cdFx0Y29uc3QgZnJvbSA9IHRoaXMuI2dldEZvcm1WYWx1ZShmcm9tQylcblx0XHRjb25zdCB0byA9IHRoaXMuI2dldEZvcm1WYWx1ZSh0b0MpXG5cdFx0Y29uc3Qgc2xpZGVyQ29sb3IgPSB0aGlzLnNsaWRlckNvbG9yXG5cdFx0Y29uc3QgcmFuZ2VDb2xvciA9IHRoaXMucmFuZ2VDb2xvclxuXHRcdGNvbnN0IHJhbmdlRGlzdGFuY2UgPSB0aGlzLm1heCAtIHRoaXMubWluXG5cdFx0Y29uc3QgZnJvbVBvc2l0aW9uID0gdGhpcy5kb3VibGVTbGlkZXIgPyBmcm9tIC0gdGhpcy5taW4gOiB0aGlzLm1pblxuXHRcdGNvbnN0IHRvUG9zaXRpb24gPSB0byAtIHRoaXMubWluXG5cdFx0dGhpcy5ncmFkaWVudCA9IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgJHtzbGlkZXJDb2xvcn0gMCUsXG4gICAgJHtzbGlkZXJDb2xvcn0gJHsoZnJvbVBvc2l0aW9uIC8gcmFuZ2VEaXN0YW5jZSkgKiAxMDB9JSxcbiAgICAke3JhbmdlQ29sb3J9ICR7KGZyb21Qb3NpdGlvbiAvIHJhbmdlRGlzdGFuY2UpICogMTAwfSUsXG4gLyoqXG5cdCAqIEl0IHJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGZpZWxkIHRoYXQgaXMgcGFzc2VkIGluIGFzIGEgcGFyYW1ldGVyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBGb3JtRmllbGQgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB5b3Ugd2FudCB0byBnZXQgdGhlIHZhbHVlIG9mLlxuXHQgKiBAcmV0dXJucyBUaGUgdmFsdWUgb2YgdGhlIGZvcm0gZmllbGQuXG5cdCAqL1xuXHQgICAke3JhbmdlQ29sb3J9ICR7KHRvUG9zaXRpb24gLyByYW5nZURpc3RhbmNlKSAqIDEwMH0lLFxuICAgICR7dGhpcy5zbGlkZXJDb2xvclJpZ2h0fSAkeyh0b1Bvc2l0aW9uIC8gcmFuZ2VEaXN0YW5jZSkgKiAxMDB9JSxcbiAgICAke3RoaXMuc2xpZGVyQ29sb3JSaWdodH0gMTAwJSlgXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZ3JhZGllbnQpXG5cdH1cblxuXHQvKipcblx0ICogSXQgcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBpcyBwYXNzZWQgaW4gYXMgYSBwYXJhbWV0ZXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IEZvcm1GaWVsZCAtIFRoZSBuYW1lIG9mIHRoZSBmb3JtIGZpZWxkIHlvdSB3YW50IHRvIGdldCB0aGUgdmFsdWUgb2YuXG5cdCAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZC5cblx0ICovXG5cdCNnZXRGb3JtVmFsdWUoRm9ybUZpZWxkOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gdGhpcy5zbGlkZXIuZ2V0KEZvcm1GaWVsZCk/LnZhbHVlXG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIHZhbHVlIG9mIHRoZSBzbGlkZXIgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDAsIHRoZW4gc2V0IHRoZSB6LWluZGV4IG9mIHRoZSBzbGlkZXIgdG8gMiwgb3RoZXJ3aXNlIHNldCBpdCB0byAwXG5cdCAqL1xuXHQjc2V0VG9nZ2xlQWNjZXNzaWJsZSgpIHtcblx0XHRjb25zdCBjdXJyZW50VGFyZ2V0ID0gdGhpcy5zbGlkZXIuZ2V0KCd0b1NsaWRlcicpPy52YWx1ZVxuXHRcdGlmIChOdW1iZXIoY3VycmVudFRhcmdldC52YWx1ZSkgPD0gMCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgMilcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgMClcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSXQgdGFrZXMgdHdvIHN0cmluZ3MsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHR3byBudW1iZXJzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50RnJvbSAtIHN0cmluZyAtIFRoZSBuYW1lIG9mIHRoZSBpbnB1dCB0aGF0IGhvbGRzIHRoZSBcImZyb21cIiB2YWx1ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRvIC0gc3RyaW5nIC0gdGhlIG5hbWUgb2YgdGhlIGlucHV0IHRoYXQgaG9sZHMgdGhlIHZhbHVlIG9mIHRoZSByaWdodCBzbGlkZXJcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2YgdHdvIG51bWJlcnMuXG5cdCAqL1xuXHQjZ2V0UGFyc2VkKGN1cnJlbnRGcm9tOiBzdHJpbmcsIGN1cnJlbnRUbzogc3RyaW5nKTogYW55IHtcblx0XHRjb25zdCBmcm9tID0gcGFyc2VJbnQodGhpcy5zbGlkZXIuZ2V0KGN1cnJlbnRGcm9tKT8udmFsdWUsIDEwKVxuXHRcdGNvbnN0IHRvID0gcGFyc2VJbnQodGhpcy5zbGlkZXIuZ2V0KGN1cnJlbnRUbyk/LnZhbHVlLCAxMClcblx0XHRyZXR1cm4gW2Zyb20sIHRvXVxuXHR9XG5cblx0LyoqXG5cdCAqIEl0IGRpc2FibGVzIHRoZSBzbGlkZXIgYW5kIGNoYW5nZXMgdGhlIGNvbG9yIG9mIHRoZSB0aHVtYiB0byBncmF5XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEaXNhYmxlZCAtIGJvb2xlYW4gLSB0cnVlIGlmIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQsIGZhbHNlIGlmIGl0J3MgZW5hYmxlZFxuXHQgKi9cblx0I2Rpc2FibGVkU2xpZGVyKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcblx0XHRpbnRlcnZhbCgxKVxuXHRcdFx0LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpXG5cdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuZG91YmxlU2xpZGVyKSB7XG5cdFx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkXG5cdFx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyVG9vbFRpcFBvc2l0aW9uKClcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZFxuXHRcdFx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcFBvc2l0aW9uKClcblx0XHRcdFx0dGhpcy4jY2hhbmdlVGh1bWJDb2xvck9uRGlzYWJsZWQoKVxuXHRcdFx0fSlcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLCBzZXQgdGhlIHRvb2x0aXAgY29sb3IgdG8gI2RkZGRkZCBhbmQgdGhlIHRvb2x0aXAgaG92ZXIgY29sb3IgdG8gI2RkZGRkZCBhbmQgdGhlIHRvb2x0aXBcblx0ICogaG92ZXIgc2hhZG93IHRvIG5vbmVcblx0ICovXG5cdCNjaGFuZ2VUaHVtYkNvbG9yT25EaXNhYmxlZCgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0dGhpcy50b29sVGlwQ29sb3IgPSAnI2RkZGRkZCdcblx0XHRcdHRoaXMudG9vbFRpcENvbG9ySG92ZXIgPSAnI2RkZGRkZCdcblx0XHRcdHRoaXMudG9vbFRpcENvbG9ySG92ZXJTaGFkb3cgPSAnbm9uZSdcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mcm9tU2xpZGVyVG9vbFRpcCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy50b29sVGlwQ29sb3IpXG5cdFx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdG9vbHRpcC1hcnJvdycsIHRoaXMudG9vbFRpcENvbG9yKVxuXHRcdH1cblx0XHRpZiAodGhpcy50b1NsaWRlclRvb2xUaXApIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b1NsaWRlclRvb2xUaXAubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtY29sb3InLCB0aGlzLnRvb2xUaXBDb2xvcilcblx0XHRcdHRoaXMudG9TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdG9vbHRpcC1hcnJvdycsIHRoaXMudG9vbFRpcENvbG9yKVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZyb21TbGlkZXIpIHtcblx0XHRcdHRoaXMuZnJvbVNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNsaWRlci10aHVtYi1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxuXHRcdFx0dGhpcy5mcm9tU2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2xpZGVyLXRodW1iLWNvbG9yLWhvdmVyJywgdGhpcy50b29sVGlwQ29sb3JIb3Zlcilcblx0XHRcdHRoaXMuZnJvbVNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuXHRcdFx0XHQnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXItc2hhZG93Jyxcblx0XHRcdFx0dGhpcy50b29sVGlwQ29sb3JIb3ZlclNoYWRvdyxcblx0XHRcdClcblx0XHR9XG5cdFx0aWYgKHRoaXMudG9TbGlkZXJzKSB7XG5cdFx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNsaWRlci10aHVtYi1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXInLCB0aGlzLnRvb2xUaXBDb2xvckhvdmVyKVxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcblx0XHRcdFx0Jy0tc2xpZGVyLXRodW1iLWNvbG9yLWhvdmVyLXNoYWRvdycsXG5cdFx0XHRcdHRoaXMudG9vbFRpcENvbG9ySG92ZXJTaGFkb3csXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cInNsaWRlclwiIG5vdmFsaWRhdGU+XHJcblx0PGRpdiBjbGFzcz1cInJhbmdlX2NvbnRhaW5lclwiPlxyXG5cdFx0PGRpdiBjbGFzcz1cInNsaWRlcnNfY29udHJvbFwiPlxyXG5cdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHQjZnJvbVNsaWRlclxyXG5cdFx0XHRcdChjaGFuZ2UpPVwiZmlyZUV2ZW50T25DaGFuZ2UoKVwiXHJcblx0XHRcdFx0KGlucHV0KT1cImZpcmVFdmVudE9uSW5wdXQoJ2Zyb20nKVwiXHJcblx0XHRcdFx0Km5nSWY9XCJkb3VibGVTbGlkZXJcIlxyXG5cdFx0XHRcdFttYXhdPVwibWF4XCJcclxuXHRcdFx0XHRbbWluXT1cIm1pblwiXHJcblx0XHRcdFx0Y2xhc3M9XCJmcm9tLXNsaWRlciByYW5nZVwiXHJcblx0XHRcdFx0Zm9ybUNvbnRyb2xOYW1lPVwiZnJvbVNsaWRlclwiXHJcblx0XHRcdFx0aWQ9XCJmcm9tU2xpZGVyXCJcclxuXHRcdFx0XHRzdGVwPVwiMVwiXHJcblx0XHRcdFx0dHlwZT1cInJhbmdlXCJcclxuXHRcdFx0Lz5cclxuXHJcblx0XHRcdDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93VG9vbFRpcFwiPlxyXG5cdFx0XHRcdDxkaXYgI2Zyb21TbGlkZXJUb29sVGlwICpuZ0lmPVwiZG91YmxlU2xpZGVyXCIgY2xhc3M9XCJ0b29sdGlwXCIgaWQ9XCJyYW5nZUZyb21cIj5cclxuXHRcdFx0XHRcdHt7IHNsaWRlci5nZXQoJ2Zyb21TbGlkZXInKT8udmFsdWUgfX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9uZy1jb250YWluZXI+XHJcblxyXG5cdFx0XHQ8aW5wdXRcclxuXHRcdFx0XHQjdG9TbGlkZXJzXHJcblx0XHRcdFx0KGNoYW5nZSk9XCJmaXJlRXZlbnRPbkNoYW5nZSgpXCJcclxuXHRcdFx0XHQoaW5wdXQpPVwiZmlyZUV2ZW50T25JbnB1dCgndG8nKVwiXHJcblx0XHRcdFx0W21heF09XCJtYXhcIlxyXG5cdFx0XHRcdFttaW5dPVwibWluXCJcclxuXHRcdFx0XHRjbGFzcz1cInRvU2xpZGVyIHJhbmdlXCJcclxuXHRcdFx0XHRmb3JtQ29udHJvbE5hbWU9XCJ0b1NsaWRlclwiXHJcblx0XHRcdFx0aWQ9XCJ0b1NsaWRlclwiXHJcblx0XHRcdFx0c3RlcD1cIjFcIlxyXG5cdFx0XHRcdHR5cGU9XCJyYW5nZVwiXHJcblx0XHRcdC8+XHJcblx0XHRcdDxkaXYgI3RvU2xpZGVyVG9vbFRpcCAqbmdJZj1cInNob3dUb29sVGlwXCIgY2xhc3M9XCJ0b1NsaWRlclRvb2x0aXBcIiBpZD1cInJhbmdlVG9cIj5cclxuXHRcdFx0XHR7eyBzbGlkZXIuZ2V0KCd0b1NsaWRlcicpPy52YWx1ZSB9fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdDwvZGl2PlxyXG48L2Zvcm0+XHJcbiJdfQ==