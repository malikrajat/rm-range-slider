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
        this.#createFrom();
    }
    /**
     * A lifecycle hook that is called after a component's view has been fully initialized.
     */
    ngAfterViewInit() {
        this.#fillSlider('fromSlider', 'toSlider');
        this.#setToggleAccessible();
        this.#disabledSlider(this.disabled);
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
            this.#disabledSlider(changes['disabled'].currentValue);
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
    /**
     * The function creates a form group with two form controls, one for the minimum value and one for the maximum value
     */
    #createFrom() {
        this.slider = this.fb.group({
            fromSlider: [this.setMinValue, [Validators.required, Validators.max(this.max), Validators.min(this.min)]],
            toSlider: [this.setMaxValue, [Validators.required, Validators.max(this.max), Validators.min(this.min)]],
        });
        this.#onFormValueChange();
    }
    /**
     * The function subscribes to the valueChanges of the fromSlider and toSlider.
     *
     * The fromSlider is the slider on the left and the toSlider is the slider on the right.
     *
     * The function is called onFormValueChange() because it is called in the ngOnInit() function.
     *
     * The ngOnInit() function is called when the component is initialized.
     *
     * The function is called onFormValueChange() because it is called in the ngOnInit() function.
     *
     * The ngOnInit() function is called when the component is initialized.
     *
     * The function is called onFormValueChange() because it is called in the ngOnInit() function.
     *
     * The ngOnInit() function is called when the component is initialized.
     *
     * The function is called onFormValueChange() because it is called in the ngOnInit() function.
     *
     * The ngOnInit
     */
    #onFormValueChange() {
        this.slider.get('fromSlider')?.valueChanges.subscribe(() => {
            const fromSlider = this.slider.get('fromSlider')?.value;
            if (this.fromSliderToolTip) {
                this.fromSliderToolTip.nativeElement.innerHTML = `<span>${fromSlider}</span>`;
            }
            this.#controlFromSlider('fromSlider', 'toSlider');
        });
        this.slider.get('toSlider')?.valueChanges.subscribe(() => {
            this.#controlToSlider('fromSlider', 'toSlider');
        });
    }
    /**
     * If the value of the fromSlider is greater than the value of the toSlider, then the value of the fromSlider is set to
     * the value of the toSlider
     * @param {string} fromSlider - the name of the from slider
     * @param {string} toSlider - string - the name of the toSlider control
     */
    #controlFromSlider(fromSlider, toSlider) {
        const [from, to] = this.#getParsed('fromSlider', 'toSlider');
        this.#fillSlider(fromSlider, toSlider);
        if (from > to) {
            this.slider.patchValue({
                fromSlider: to,
            });
        }
    }
    /**
     * > If the value of the `fromSlider` is less than or equal to the value of the `toSlider`, then set the value of the
     * `toSlider` to the value of the `toSlider`. Otherwise, set the value of the `toSlider` to the value of the `fromSlider`
     * @param {string} fromSlider - The name of the slider that is being changed.
     * @param {string} toSlider - The name of the slider that is being changed.
     */
    #controlToSlider(fromSlider, toSlider) {
        const [from, to] = this.#getParsed('fromSlider', 'toSlider');
        this.#fillSlider(fromSlider, toSlider);
        this.#setToggleAccessible();
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
    }
    /**
     * It returns the value of the form field that is passed in as a parameter
     * @param {string} fromC - The name of the form field that contains the value of the left slider.
     * @param {string} toC - The name of the form field that contains the value of the right slider.
     */
    #fillSlider(fromC, toC) {
        const from = this.#getFormValue(fromC);
        const to = this.#getFormValue(toC);
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
    }
    /**
     * It returns the value of the form field that is passed in as a parameter
     * @param {string} FormField - The name of the form field you want to get the value of.
     * @returns The value of the form field.
     */
    #getFormValue(FormField) {
        return this.slider.get(FormField)?.value;
    }
    /**
     * If the value of the slider is less than or equal to 0, then set the z-index of the slider to 2, otherwise set it to 0
     */
    #setToggleAccessible() {
        const currentTarget = this.slider.get('toSlider')?.value;
        if (Number(currentTarget.value) <= 0) {
            this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 2);
        }
        else {
            this.renderer.setStyle(this.toSliders.nativeElement, 'zIndex', 0);
        }
    }
    /**
     * It takes two strings, and returns an array of two numbers
     * @param {string} currentFrom - string - The name of the input that holds the "from" value
     * @param {string} currentTo - string - the name of the input that holds the value of the right slider
     * @returns An array of two numbers.
     */
    #getParsed(currentFrom, currentTo) {
        const from = parseInt(this.slider.get(currentFrom)?.value, 10);
        const to = parseInt(this.slider.get(currentTo)?.value, 10);
        return [from, to];
    }
    /**
     * It disables the slider and changes the color of the thumb to gray
     * @param {boolean} isDisabled - boolean - true if the slider is disabled, false if it's enabled
     */
    #disabledSlider(isDisabled) {
        interval(1)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            if (this.doubleSlider) {
                this.fromSlider.nativeElement.disabled = isDisabled;
                this.fromSliderToolTipPosition();
            }
            this.toSliders.nativeElement.disabled = isDisabled;
            this.toSliderToolTipPosition();
            this.#changeThumbColorOnDisabled();
        });
    }
    /**
     * If the slider is disabled, set the tooltip color to #dddddd and the tooltip hover color to #dddddd and the tooltip
     * hover shadow to none
     */
    #changeThumbColorOnDisabled() {
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
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderComponent, deps: [{ token: i1.FormBuilder }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: RmRangeSliderComponent, selector: "rm-range-slider", inputs: { min: ["SliderMinRange", "min"], max: ["SliderMaxRange", "max"], setMinValue: "setMinValue", disabled: "disabled", showToolTip: "showToolTip", setMaxValue: "setMaxValue", showScale: "showScale", doubleSlider: "doubleSlider", toolTipColor: "toolTipColor", toolTipColorHover: "toolTipColorHover", toolTipColorHoverShadow: "toolTipColorHoverShadow", rangeColor: "rangeColor", sliderColor: "sliderColor", sliderColorRight: "sliderColorRight" }, outputs: { onValueChanged: "onValueChanged" }, viewQueries: [{ propertyName: "toSliders", first: true, predicate: ["toSliders"], descendants: true }, { propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSliderToolTip", first: true, predicate: ["toSliderToolTip"], descendants: true, read: ElementRef }, { propertyName: "fromSliderToolTip", first: true, predicate: ["fromSliderToolTip"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"slider\" novalidate>\r\n\t<div class=\"range_container\">\r\n\t\t<div class=\"sliders_control\">\r\n\t\t\t<input\r\n\t\t\t\t#fromSlider\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('from')\"\r\n\t\t\t\t*ngIf=\"doubleSlider\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"from-slider range\"\r\n\t\t\t\tformControlName=\"fromSlider\"\r\n\t\t\t\tid=\"fromSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\r\n\t\t\t<ng-container *ngIf=\"showToolTip\">\r\n\t\t\t\t<div #fromSliderToolTip *ngIf=\"doubleSlider\" class=\"tooltip\" id=\"rangeFrom\">\r\n\t\t\t\t\t{{ slider.get('fromSlider')?.value }}\r\n\t\t\t\t</div>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<input\r\n\t\t\t\t#toSliders\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('to')\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"toSlider range\"\r\n\t\t\t\tformControlName=\"toSlider\"\r\n\t\t\t\tid=\"toSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\t\t\t<div #toSliderToolTip *ngIf=\"showToolTip\" class=\"toSliderTooltip\" id=\"rangeTo\">\r\n\t\t\t\t{{ slider.get('toSlider')?.value }}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.form_control{position:relative;display:flex}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-range-slider', template: "<form [formGroup]=\"slider\" novalidate>\r\n\t<div class=\"range_container\">\r\n\t\t<div class=\"sliders_control\">\r\n\t\t\t<input\r\n\t\t\t\t#fromSlider\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('from')\"\r\n\t\t\t\t*ngIf=\"doubleSlider\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"from-slider range\"\r\n\t\t\t\tformControlName=\"fromSlider\"\r\n\t\t\t\tid=\"fromSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\r\n\t\t\t<ng-container *ngIf=\"showToolTip\">\r\n\t\t\t\t<div #fromSliderToolTip *ngIf=\"doubleSlider\" class=\"tooltip\" id=\"rangeFrom\">\r\n\t\t\t\t\t{{ slider.get('fromSlider')?.value }}\r\n\t\t\t\t</div>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<input\r\n\t\t\t\t#toSliders\r\n\t\t\t\t(change)=\"fireEventOnChange()\"\r\n\t\t\t\t(input)=\"fireEventOnInput('to')\"\r\n\t\t\t\t[max]=\"max\"\r\n\t\t\t\t[min]=\"min\"\r\n\t\t\t\tclass=\"toSlider range\"\r\n\t\t\t\tformControlName=\"toSlider\"\r\n\t\t\t\tid=\"toSlider\"\r\n\t\t\t\tstep=\"1\"\r\n\t\t\t\ttype=\"range\"\r\n\t\t\t/>\r\n\t\t\t<div #toSliderToolTip *ngIf=\"showToolTip\" class=\"toSliderTooltip\" id=\"rangeTo\">\r\n\t\t\t\t{{ slider.get('toSlider')?.value }}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.form_control{position:relative;display:flex}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:-moz-fit-content;width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;border:solid transparent;content:\" \";position:absolute;border-top-color:var(--tooltip-arrow);border-width:10px;margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i0.Renderer2 }], propDecorators: { min: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JtLXJhbmdlLXNsaWRlci9zcmMvbGliL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9ybS1yYW5nZS1zbGlkZXIvc3JjL2xpYi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBR04sU0FBUyxHQUNULE1BQU0sZUFBZSxDQUFBO0FBQ3RCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFBOzs7O0FBUW5ELE1BQU0sT0FBTyxzQkFBc0I7SUF3QmxDOzs7O09BSUc7SUFDSCxZQUE2QixFQUFlLEVBQVUsUUFBbUI7UUFBNUMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUEzQmhELFFBQUcsR0FBVyxDQUFDLENBQUE7UUFDZixRQUFHLEdBQVcsR0FBRyxDQUFBO1FBQ3BCLGdCQUFXLEdBQVcsQ0FBQyxDQUFBO1FBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUE7UUFDdEIsZ0JBQVcsR0FBWSxLQUFLLENBQUE7UUFDNUIsZ0JBQVcsR0FBVyxHQUFHLENBQUE7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFZLElBQUksQ0FBQTtRQUM1QixpQkFBWSxHQUFXLFNBQVMsQ0FBQTtRQUMzQixzQkFBaUIsR0FBVyxTQUFTLENBQUE7UUFDL0IsNEJBQXVCLEdBQVcsU0FBUyxDQUFBO1FBQ3hELGVBQVUsR0FBVyx3QkFBd0IsQ0FBQTtRQUM1Qyxn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QUFLO3VCQUFDLGFBQWE7Z0JBQ08sZ0JBQWdCO3NCQUExQyxLQUFLO3VCQUFDLGtCQUFrQjtnQkFDQyxjQUFjO3NCQUF2QyxNQUFNO3VCQUFDLGdCQUFnQjtnQkFDbUIsU0FBUztzQkFBbkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNHLFVBQVU7c0JBQXJELFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDVSxlQUFlO3NCQUFsRSxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDSSxpQkFBaUI7c0JBQXRFLFNBQVM7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHRBZnRlclZpZXdJbml0LFxyXG5cdENvbXBvbmVudCxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRJbnB1dCxcclxuXHRPbkluaXQsXHJcblx0T3V0cHV0LFxyXG5cdFJlbmRlcmVyMixcclxuXHRTaW1wbGVDaGFuZ2VzLFxyXG5cdFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXHJcbmltcG9ydCB7IGludGVydmFsLCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJ1xyXG5pbXBvcnQgeyBNSU5NQVggfSBmcm9tICcuL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQuaW50ZXJmYWNlJ1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdybS1yYW5nZS1zbGlkZXInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUm1SYW5nZVNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblx0cHVibGljIHNsaWRlciE6IEZvcm1Hcm91cFxyXG5cdEBJbnB1dCgnU2xpZGVyTWluUmFuZ2UnKSBtaW46IG51bWJlciA9IDBcclxuXHRASW5wdXQoJ1NsaWRlck1heFJhbmdlJykgbWF4OiBudW1iZXIgPSAxMDBcclxuXHRASW5wdXQoJ3NldE1pblZhbHVlJykgc2V0TWluVmFsdWU6IG51bWJlciA9IDBcclxuXHRASW5wdXQoJ2Rpc2FibGVkJykgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cdEBJbnB1dCgnc2hvd1Rvb2xUaXAnKSBzaG93VG9vbFRpcDogYm9vbGVhbiA9IGZhbHNlXHJcblx0QElucHV0KCdzZXRNYXhWYWx1ZScpIHNldE1heFZhbHVlOiBudW1iZXIgPSAxMDBcclxuXHRASW5wdXQoJ3Nob3dTY2FsZScpIHNob3dTY2FsZTogYm9vbGVhbiA9IGZhbHNlXHJcblx0QElucHV0KCdkb3VibGVTbGlkZXInKSBkb3VibGVTbGlkZXI6IGJvb2xlYW4gPSB0cnVlXHJcblx0QElucHV0KCd0b29sVGlwQ29sb3InKSB0b29sVGlwQ29sb3I6IHN0cmluZyA9ICcjOGEwMGU1J1xyXG5cdEBJbnB1dCgndG9vbFRpcENvbG9ySG92ZXInKSB0b29sVGlwQ29sb3JIb3Zlcjogc3RyaW5nID0gJyM4YTAwZTUnXHJcblx0QElucHV0KCd0b29sVGlwQ29sb3JIb3ZlclNoYWRvdycpIHRvb2xUaXBDb2xvckhvdmVyU2hhZG93OiBzdHJpbmcgPSAnIzhhMDBlNSdcclxuXHRASW5wdXQoJ3JhbmdlQ29sb3InKSByYW5nZUNvbG9yOiBzdHJpbmcgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjk5KSdcclxuXHRASW5wdXQoJ3NsaWRlckNvbG9yJykgc2xpZGVyQ29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNDcpJ1xyXG5cdEBJbnB1dCgnc2xpZGVyQ29sb3JSaWdodCcpIHNsaWRlckNvbG9yUmlnaHQ6IHN0cmluZyA9ICdyZ2IoMTk4LCAxOTgsIDE5OCknXHJcblx0QE91dHB1dCgnb25WYWx1ZUNoYW5nZWQnKSBvblZhbHVlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE1JTk1BWD4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHRAVmlld0NoaWxkKCd0b1NsaWRlcnMnLCB7IHN0YXRpYzogZmFsc2UgfSkgdG9TbGlkZXJzITogRWxlbWVudFJlZlxyXG5cdEBWaWV3Q2hpbGQoJ2Zyb21TbGlkZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgZnJvbVNsaWRlciE6IEVsZW1lbnRSZWZcclxuXHRAVmlld0NoaWxkKCd0b1NsaWRlclRvb2xUaXAnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgdG9TbGlkZXJUb29sVGlwITogRWxlbWVudFJlZlxyXG5cdEBWaWV3Q2hpbGQoJ2Zyb21TbGlkZXJUb29sVGlwJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGZyb21TbGlkZXJUb29sVGlwITogRWxlbWVudFJlZlxyXG5cdHByaXZhdGUgZ3JhZGllbnQhOiBzdHJpbmdcclxuXHRwcml2YXRlIGRlc3Ryb3llZCQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpcyBhIHNwZWNpYWwgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgY2xhc3MgaXMgY3JlYXRlZFxyXG5cdCAqIEBwYXJhbSB7Rm9ybUJ1aWxkZXJ9IGZiIC0gRm9ybUJ1aWxkZXIgLSBUaGlzIGlzIHRoZSBGb3JtQnVpbGRlciBzZXJ2aWNlIHRoYXQgd2UnbGwgdXNlIHRvIGNyZWF0ZSBvdXIgZm9ybS5cclxuXHQgKiBAcGFyYW0ge1JlbmRlcmVyMn0gcmVuZGVyZXIgLSBSZW5kZXJlcjIgLSBUaGlzIGlzIHRoZSBBbmd1bGFyIFJlbmRlcmVyMiBzZXJ2aWNlLiBJdCdzIHVzZWQgdG8gbWFuaXB1bGF0ZSB0aGUgRE9NLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEl0IGNyZWF0ZXMgYSBmb3JtLlxyXG5cdCAqL1xyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy4jY3JlYXRlRnJvbSgpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3MgdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cclxuXHQgKi9cclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHR0aGlzLiNmaWxsU2xpZGVyKCdmcm9tU2xpZGVyJywgJ3RvU2xpZGVyJylcclxuXHRcdHRoaXMuI3NldFRvZ2dsZUFjY2Vzc2libGUoKVxyXG5cdFx0dGhpcy4jZGlzYWJsZWRTbGlkZXIodGhpcy5kaXNhYmxlZClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQsIHdlIHdhbnQgdG8gY29tcGxldGUgdGhlIG9ic2VydmFibGUgYW5kIGxldCBhbnkgc3Vic2NyaWJlcnMga25vdyB0aGF0IHRoZSBvYnNlcnZhYmxlIGlzXHJcblx0ICogY29tcGxldGUuXHJcblx0ICovXHJcblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcblx0XHR0aGlzLmRlc3Ryb3llZCQubmV4dCgpXHJcblx0XHR0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGNoYW5nZXMgb2JqZWN0IGhhcyBhIHByb3BlcnR5IGNhbGxlZCBkaXNhYmxlZCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYW5nZSBhbmQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgdHJ1ZSwgdGhlblxyXG5cdCAqIGNhbGwgdGhlICNkaXNhYmxlZFNsaWRlciBmdW5jdGlvbiB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eVxyXG5cdCAqIEBwYXJhbSB7U2ltcGxlQ2hhbmdlc30gY2hhbmdlcyAtIFNpbXBsZUNoYW5nZXMgLSB0aGlzIGlzIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBtYWRlIHRvXHJcblx0ICogdGhlIGNvbXBvbmVudC5cclxuXHQgKi9cclxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcblx0XHRpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzWydkaXNhYmxlZCddICYmICFjaGFuZ2VzWydkaXNhYmxlZCddLmZpcnN0Q2hhbmdlICYmIGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKSB7XHJcblx0XHRcdHRoaXMuI2Rpc2FibGVkU2xpZGVyKGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKVxyXG5cdFx0fVxyXG5cdFx0aWYgKFxyXG5cdFx0XHRjaGFuZ2VzICYmXHJcblx0XHRcdGNoYW5nZXNbJ3NldE1pblZhbHVlJ10gJiZcclxuXHRcdFx0IWNoYW5nZXNbJ3NldE1pblZhbHVlJ10uZmlyc3RDaGFuZ2UgJiZcclxuXHRcdFx0Y2hhbmdlc1snc2V0TWluVmFsdWUnXS5jdXJyZW50VmFsdWVcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnNsaWRlci5wYXRjaFZhbHVlKHtcclxuXHRcdFx0XHRmcm9tU2xpZGVyOiBjaGFuZ2VzWydzZXRNaW5WYWx1ZSddLmN1cnJlbnRWYWx1ZSxcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdGlmIChcclxuXHRcdFx0Y2hhbmdlcyAmJlxyXG5cdFx0XHRjaGFuZ2VzWydzZXRNYXhWYWx1ZSddICYmXHJcblx0XHRcdCFjaGFuZ2VzWydzZXRNYXhWYWx1ZSddLmZpcnN0Q2hhbmdlICYmXHJcblx0XHRcdGNoYW5nZXNbJ3NldE1heFZhbHVlJ10uY3VycmVudFZhbHVlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XHJcblx0XHRcdFx0dG9TbGlkZXI6IGNoYW5nZXNbJ3NldE1heFZhbHVlJ10uY3VycmVudFZhbHVlLFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXQncyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdHJpbmcgYXMgYW4gYXJndW1lbnQgYW5kIGlmIHRoZSBzaG93VG9vbFRpcCBwcm9wZXJ0eSBpcyB0cnVlLCBpdCBjYWxscyB0aGVcclxuXHQgKiBmcm9tU2xpZGVyVG9vbFRpcFBvc2l0aW9uKCkgb3IgdG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKSBmdW5jdGlvbiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIHRoZSBzdHJpbmcgYXJndW1lbnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2xpZGVUeXBlIC0gc3RyaW5nIC0gVGhpcyBpcyB0aGUgdHlwZSBvZiBzbGlkZXIgdGhhdCBpcyBiZWluZyBtb3ZlZC4gSXQgY2FuIGJlIGVpdGhlciAnZnJvbScgb3IgJ3RvJy5cclxuXHQgKi9cclxuXHRmaXJlRXZlbnRPbklucHV0KHNsaWRlVHlwZTogc3RyaW5nKSB7XHJcblx0XHRpZiAodGhpcy5zaG93VG9vbFRpcCkge1xyXG5cdFx0XHRpZiAoc2xpZGVUeXBlID09PSAnZnJvbScpIHtcclxuXHRcdFx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwUG9zaXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChzbGlkZVR5cGUgPT09ICd0bycpIHtcclxuXHRcdFx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcFBvc2l0aW9uKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2UncmUgY2FsY3VsYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyXHJcblx0ICovXHJcblx0ZnJvbVNsaWRlclRvb2xUaXBQb3NpdGlvbigpIHtcclxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuc2xpZGVyLmdldCgnZnJvbVNsaWRlcicpPy52YWx1ZVxyXG5cdFx0Y29uc3QgbWluID0gdGhpcy5taW4gPyB0aGlzLm1pbiA6IDBcclxuXHRcdGNvbnN0IG1heCA9IHRoaXMubWF4ID8gdGhpcy5tYXggOiAxMDBcclxuXHRcdGNvbnN0IG5ld1ZhbCA9IE51bWJlcigoKHZhbCAtIG1pbikgKiAxMDApIC8gKG1heCAtIG1pbikpXHJcblx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGBjYWxjKCR7bmV3VmFsfSUgKyAoJHstNiAtIG5ld1ZhbCAqIDAuNH1weCkpYFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIgYW5kIGNvbnZlcnRzIGl0IHRvIGEgcGVyY2VudGFnZSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlXHJcblx0ICogdG9TbGlkZXJUb29sVGlwXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIgYW5kIGNvbnZlcnRzIGl0IHRvIGEgcGVyY2VudGFnZSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlXHJcblx0ICogdG9TbGlkZXJUb29sVGlwXHJcblx0ICovXHJcblx0dG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKSB7XHJcblx0XHRjb25zdCB0b1NsaWRlciA9IHRoaXMuc2xpZGVyLmdldCgndG9TbGlkZXInKT8udmFsdWVcclxuXHRcdGNvbnN0IHkgPSAwLjg4NzUgKiB0b1NsaWRlciArIDMuOTg1XHJcblx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB5ICsgJyUnXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXZSdyZSBnZXR0aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHR3byBzbGlkZXJzLCBhbmQgdGhlbiBlbWl0dGluZyBhbiBldmVudCB3aXRoIHRob3NlIHZhbHVlc1xyXG5cdCAqL1xyXG5cdGZpcmVFdmVudE9uQ2hhbmdlKCkge1xyXG5cdFx0Y29uc3QgdG9TbGlkZXIgPSB0aGlzLnNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRjb25zdCBmcm9tU2xpZGVyID0gdGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRjb25zdCBtYXhNaW4gPSB7XHJcblx0XHRcdG1pbjogZnJvbVNsaWRlcixcclxuXHRcdFx0bWF4OiB0b1NsaWRlcixcclxuXHRcdH1cclxuXHRcdHRoaXMub25WYWx1ZUNoYW5nZWQuZW1pdChtYXhNaW4pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZnVuY3Rpb24gY3JlYXRlcyBhIGZvcm0gZ3JvdXAgd2l0aCB0d28gZm9ybSBjb250cm9scywgb25lIGZvciB0aGUgbWluaW11bSB2YWx1ZSBhbmQgb25lIGZvciB0aGUgbWF4aW11bSB2YWx1ZVxyXG5cdCAqL1xyXG5cdCNjcmVhdGVGcm9tKCkge1xyXG5cdFx0dGhpcy5zbGlkZXIgPSB0aGlzLmZiLmdyb3VwKHtcclxuXHRcdFx0ZnJvbVNsaWRlcjogW3RoaXMuc2V0TWluVmFsdWUsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1heCh0aGlzLm1heCksIFZhbGlkYXRvcnMubWluKHRoaXMubWluKV1dLFxyXG5cdFx0XHR0b1NsaWRlcjogW3RoaXMuc2V0TWF4VmFsdWUsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1heCh0aGlzLm1heCksIFZhbGlkYXRvcnMubWluKHRoaXMubWluKV1dLFxyXG5cdFx0fSlcclxuXHRcdHRoaXMuI29uRm9ybVZhbHVlQ2hhbmdlKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiBzdWJzY3JpYmVzIHRvIHRoZSB2YWx1ZUNoYW5nZXMgb2YgdGhlIGZyb21TbGlkZXIgYW5kIHRvU2xpZGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGZyb21TbGlkZXIgaXMgdGhlIHNsaWRlciBvbiB0aGUgbGVmdCBhbmQgdGhlIHRvU2xpZGVyIGlzIHRoZSBzbGlkZXIgb24gdGhlIHJpZ2h0LlxyXG5cdCAqXHJcblx0ICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbkZvcm1WYWx1ZUNoYW5nZSgpIGJlY2F1c2UgaXQgaXMgY2FsbGVkIGluIHRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIG5nT25Jbml0KCkgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZC5cclxuXHQgKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb25Gb3JtVmFsdWVDaGFuZ2UoKSBiZWNhdXNlIGl0IGlzIGNhbGxlZCBpbiB0aGUgbmdPbkluaXQoKSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIFRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQuXHJcblx0ICpcclxuXHQgKiBUaGUgZnVuY3Rpb24gaXMgY2FsbGVkIG9uRm9ybVZhbHVlQ2hhbmdlKCkgYmVjYXVzZSBpdCBpcyBjYWxsZWQgaW4gdGhlIG5nT25Jbml0KCkgZnVuY3Rpb24uXHJcblx0ICpcclxuXHQgKiBUaGUgbmdPbkluaXQoKSBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkLlxyXG5cdCAqXHJcblx0ICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbkZvcm1WYWx1ZUNoYW5nZSgpIGJlY2F1c2UgaXQgaXMgY2FsbGVkIGluIHRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIG5nT25Jbml0XHJcblx0ICovXHJcblx0I29uRm9ybVZhbHVlQ2hhbmdlKCkge1xyXG5cdFx0dGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBmcm9tU2xpZGVyID0gdGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRcdGlmICh0aGlzLmZyb21TbGlkZXJUb29sVGlwKSB7XHJcblx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IGA8c3Bhbj4ke2Zyb21TbGlkZXJ9PC9zcGFuPmBcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiNjb250cm9sRnJvbVNsaWRlcignZnJvbVNsaWRlcicsICd0b1NsaWRlcicpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5zbGlkZXIuZ2V0KCd0b1NsaWRlcicpPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0dGhpcy4jY29udHJvbFRvU2xpZGVyKCdmcm9tU2xpZGVyJywgJ3RvU2xpZGVyJylcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIGZyb21TbGlkZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIsIHRoZW4gdGhlIHZhbHVlIG9mIHRoZSBmcm9tU2xpZGVyIGlzIHNldCB0b1xyXG5cdCAqIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXJcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVNsaWRlciAtIHRoZSBuYW1lIG9mIHRoZSBmcm9tIHNsaWRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0b1NsaWRlciAtIHN0cmluZyAtIHRoZSBuYW1lIG9mIHRoZSB0b1NsaWRlciBjb250cm9sXHJcblx0ICovXHJcblx0I2NvbnRyb2xGcm9tU2xpZGVyKGZyb21TbGlkZXI6IHN0cmluZywgdG9TbGlkZXI6IHN0cmluZykge1xyXG5cdFx0Y29uc3QgW2Zyb20sIHRvXSA9IHRoaXMuI2dldFBhcnNlZCgnZnJvbVNsaWRlcicsICd0b1NsaWRlcicpXHJcblx0XHR0aGlzLiNmaWxsU2xpZGVyKGZyb21TbGlkZXIsIHRvU2xpZGVyKVxyXG5cdFx0aWYgKGZyb20gPiB0bykge1xyXG5cdFx0XHR0aGlzLnNsaWRlci5wYXRjaFZhbHVlKHtcclxuXHRcdFx0XHRmcm9tU2xpZGVyOiB0byxcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqID4gSWYgdGhlIHZhbHVlIG9mIHRoZSBgZnJvbVNsaWRlcmAgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiB0aGUgYHRvU2xpZGVyYCwgdGhlbiBzZXQgdGhlIHZhbHVlIG9mIHRoZVxyXG5cdCAqIGB0b1NsaWRlcmAgdG8gdGhlIHZhbHVlIG9mIHRoZSBgdG9TbGlkZXJgLiBPdGhlcndpc2UsIHNldCB0aGUgdmFsdWUgb2YgdGhlIGB0b1NsaWRlcmAgdG8gdGhlIHZhbHVlIG9mIHRoZSBgZnJvbVNsaWRlcmBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVNsaWRlciAtIFRoZSBuYW1lIG9mIHRoZSBzbGlkZXIgdGhhdCBpcyBiZWluZyBjaGFuZ2VkLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0b1NsaWRlciAtIFRoZSBuYW1lIG9mIHRoZSBzbGlkZXIgdGhhdCBpcyBiZWluZyBjaGFuZ2VkLlxyXG5cdCAqL1xyXG5cdCNjb250cm9sVG9TbGlkZXIoZnJvbVNsaWRlcjogc3RyaW5nLCB0b1NsaWRlcjogc3RyaW5nKSB7XHJcblx0XHRjb25zdCBbZnJvbSwgdG9dID0gdGhpcy4jZ2V0UGFyc2VkKCdmcm9tU2xpZGVyJywgJ3RvU2xpZGVyJylcclxuXHRcdHRoaXMuI2ZpbGxTbGlkZXIoZnJvbVNsaWRlciwgdG9TbGlkZXIpXHJcblx0XHR0aGlzLiNzZXRUb2dnbGVBY2Nlc3NpYmxlKClcclxuXHRcdGlmIChmcm9tIDw9IHRvKSB7XHJcblx0XHRcdHRoaXMuc2xpZGVyLnBhdGNoVmFsdWUoe1xyXG5cdFx0XHRcdHRvU2xpZGVyOiB0byxcclxuXHRcdFx0fSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBXZSdyZSB0YWtpbmcgdGhlIHZhbHVlcyBvZiB0aGUgdHdvIGlucHV0cywgY2FsY3VsYXRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHNsaWRlciB0aGF0IHNob3VsZCBiZSBmaWxsZWQsIGFuZCB0aGVuXHJcblx0XHRcdCAqIHNldHRpbmcgdGhlIGJhY2tncm91bmQgb2YgdGhlIHNsaWRlciB0byBhIGdyYWRpZW50IHRoYXQgZmlsbHMgdGhlIHNsaWRlciB0byB0aGUgYXBwcm9wcmlhdGUgcGVyY2VudGFnZVxyXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gZnJvbUMgLSBzdHJpbmcgLSB0aGUgbmFtZSBvZiB0aGUgZm9ybSBjb250cm9sIGZvciB0aGUgbGVmdCBzbGlkZXJcclxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRvQyAtIHN0cmluZyAtIHRoZSBjb2xvciBvZiB0aGUgc2xpZGVyXHJcblx0XHRcdCAqL1xyXG5cdFx0XHR0aGlzLnNsaWRlci5wYXRjaFZhbHVlKHtcclxuXHRcdFx0XHR0b1NsaWRlcjogZnJvbSxcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEl0IHJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGZpZWxkIHRoYXQgaXMgcGFzc2VkIGluIGFzIGEgcGFyYW1ldGVyXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZyb21DIC0gVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBjb250YWlucyB0aGUgdmFsdWUgb2YgdGhlIGxlZnQgc2xpZGVyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0b0MgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGNvbnRhaW5zIHRoZSB2YWx1ZSBvZiB0aGUgcmlnaHQgc2xpZGVyLlxyXG5cdCAqL1xyXG5cdCNmaWxsU2xpZGVyKGZyb21DOiBzdHJpbmcsIHRvQzogc3RyaW5nKSB7XHJcblx0XHRjb25zdCBmcm9tID0gdGhpcy4jZ2V0Rm9ybVZhbHVlKGZyb21DKVxyXG5cdFx0Y29uc3QgdG8gPSB0aGlzLiNnZXRGb3JtVmFsdWUodG9DKVxyXG5cdFx0Y29uc3Qgc2xpZGVyQ29sb3IgPSB0aGlzLnNsaWRlckNvbG9yXHJcblx0XHRjb25zdCByYW5nZUNvbG9yID0gdGhpcy5yYW5nZUNvbG9yXHJcblx0XHRjb25zdCByYW5nZURpc3RhbmNlID0gdGhpcy5tYXggLSB0aGlzLm1pblxyXG5cdFx0Y29uc3QgZnJvbVBvc2l0aW9uID0gdGhpcy5kb3VibGVTbGlkZXIgPyBmcm9tIC0gdGhpcy5taW4gOiB0aGlzLm1pblxyXG5cdFx0Y29uc3QgdG9Qb3NpdGlvbiA9IHRvIC0gdGhpcy5taW5cclxuXHRcdHRoaXMuZ3JhZGllbnQgPSBgbGluZWFyLWdyYWRpZW50KFxyXG4gICAgdG8gcmlnaHQsXHJcbiAgICAke3NsaWRlckNvbG9yfSAwJSxcclxuICAgICR7c2xpZGVyQ29sb3J9ICR7KGZyb21Qb3NpdGlvbiAvIHJhbmdlRGlzdGFuY2UpICogMTAwfSUsXHJcbiAgICAke3JhbmdlQ29sb3J9ICR7KGZyb21Qb3NpdGlvbiAvIHJhbmdlRGlzdGFuY2UpICogMTAwfSUsXHJcbiAvKipcclxuXHQgKiBJdCByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGlzIHBhc3NlZCBpbiBhcyBhIHBhcmFtZXRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBGb3JtRmllbGQgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB5b3Ugd2FudCB0byBnZXQgdGhlIHZhbHVlIG9mLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZC5cclxuXHQgKi9cclxuXHQgICAke3JhbmdlQ29sb3J9ICR7KHRvUG9zaXRpb24gLyByYW5nZURpc3RhbmNlKSAqIDEwMH0lLFxyXG4gICAgJHt0aGlzLnNsaWRlckNvbG9yUmlnaHR9ICR7KHRvUG9zaXRpb24gLyByYW5nZURpc3RhbmNlKSAqIDEwMH0lLFxyXG4gICAgJHt0aGlzLnNsaWRlckNvbG9yUmlnaHR9IDEwMCUpYFxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZ3JhZGllbnQpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGlzIHBhc3NlZCBpbiBhcyBhIHBhcmFtZXRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBGb3JtRmllbGQgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB5b3Ugd2FudCB0byBnZXQgdGhlIHZhbHVlIG9mLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZC5cclxuXHQgKi9cclxuXHQjZ2V0Rm9ybVZhbHVlKEZvcm1GaWVsZDogc3RyaW5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zbGlkZXIuZ2V0KEZvcm1GaWVsZCk/LnZhbHVlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMCwgdGhlbiBzZXQgdGhlIHotaW5kZXggb2YgdGhlIHNsaWRlciB0byAyLCBvdGhlcndpc2Ugc2V0IGl0IHRvIDBcclxuXHQgKi9cclxuXHQjc2V0VG9nZ2xlQWNjZXNzaWJsZSgpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRUYXJnZXQgPSB0aGlzLnNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRpZiAoTnVtYmVyKGN1cnJlbnRUYXJnZXQudmFsdWUpIDw9IDApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgMilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudCwgJ3pJbmRleCcsIDApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCB0YWtlcyB0d28gc3RyaW5ncywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdHdvIG51bWJlcnNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEZyb20gLSBzdHJpbmcgLSBUaGUgbmFtZSBvZiB0aGUgaW5wdXQgdGhhdCBob2xkcyB0aGUgXCJmcm9tXCIgdmFsdWVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRvIC0gc3RyaW5nIC0gdGhlIG5hbWUgb2YgdGhlIGlucHV0IHRoYXQgaG9sZHMgdGhlIHZhbHVlIG9mIHRoZSByaWdodCBzbGlkZXJcclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB0d28gbnVtYmVycy5cclxuXHQgKi9cclxuXHQjZ2V0UGFyc2VkKGN1cnJlbnRGcm9tOiBzdHJpbmcsIGN1cnJlbnRUbzogc3RyaW5nKTogYW55IHtcclxuXHRcdGNvbnN0IGZyb20gPSBwYXJzZUludCh0aGlzLnNsaWRlci5nZXQoY3VycmVudEZyb20pPy52YWx1ZSwgMTApXHJcblx0XHRjb25zdCB0byA9IHBhcnNlSW50KHRoaXMuc2xpZGVyLmdldChjdXJyZW50VG8pPy52YWx1ZSwgMTApXHJcblx0XHRyZXR1cm4gW2Zyb20sIHRvXVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXQgZGlzYWJsZXMgdGhlIHNsaWRlciBhbmQgY2hhbmdlcyB0aGUgY29sb3Igb2YgdGhlIHRodW1iIHRvIGdyYXlcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWQgLSBib29sZWFuIC0gdHJ1ZSBpZiB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLCBmYWxzZSBpZiBpdCdzIGVuYWJsZWRcclxuXHQgKi9cclxuXHQjZGlzYWJsZWRTbGlkZXIoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0aW50ZXJ2YWwoMSlcclxuXHRcdFx0LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpXHJcblx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmRvdWJsZVNsaWRlcikge1xyXG5cdFx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkXHJcblx0XHRcdFx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwUG9zaXRpb24oKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZFxyXG5cdFx0XHRcdHRoaXMudG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKVxyXG5cdFx0XHRcdHRoaXMuI2NoYW5nZVRodW1iQ29sb3JPbkRpc2FibGVkKClcclxuXHRcdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQsIHNldCB0aGUgdG9vbHRpcCBjb2xvciB0byAjZGRkZGRkIGFuZCB0aGUgdG9vbHRpcCBob3ZlciBjb2xvciB0byAjZGRkZGRkIGFuZCB0aGUgdG9vbHRpcFxyXG5cdCAqIGhvdmVyIHNoYWRvdyB0byBub25lXHJcblx0ICovXHJcblx0I2NoYW5nZVRodW1iQ29sb3JPbkRpc2FibGVkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuXHRcdFx0dGhpcy50b29sVGlwQ29sb3IgPSAnI2RkZGRkZCdcclxuXHRcdFx0dGhpcy50b29sVGlwQ29sb3JIb3ZlciA9ICcjZGRkZGRkJ1xyXG5cdFx0XHR0aGlzLnRvb2xUaXBDb2xvckhvdmVyU2hhZG93ID0gJ25vbmUnXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZnJvbVNsaWRlclRvb2xUaXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy50b29sVGlwQ29sb3IpXHJcblx0XHRcdHRoaXMuZnJvbVNsaWRlclRvb2xUaXAubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10b29sdGlwLWFycm93JywgdGhpcy50b29sVGlwQ29sb3IpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b1NsaWRlclRvb2xUaXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxyXG5cdFx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXRvb2x0aXAtYXJyb3cnLCB0aGlzLnRvb2xUaXBDb2xvcilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mcm9tU2xpZGVyKSB7XHJcblx0XHRcdHRoaXMuZnJvbVNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNsaWRlci10aHVtYi1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxyXG5cdFx0XHR0aGlzLmZyb21TbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXInLCB0aGlzLnRvb2xUaXBDb2xvckhvdmVyKVxyXG5cdFx0XHR0aGlzLmZyb21TbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuXHRcdFx0XHQnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXItc2hhZG93JyxcclxuXHRcdFx0XHR0aGlzLnRvb2xUaXBDb2xvckhvdmVyU2hhZG93LFxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b1NsaWRlcnMpIHtcclxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3InLCB0aGlzLnRvb2xUaXBDb2xvcilcclxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXInLCB0aGlzLnRvb2xUaXBDb2xvckhvdmVyKVxyXG5cdFx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxyXG5cdFx0XHRcdCctLXNsaWRlci10aHVtYi1jb2xvci1ob3Zlci1zaGFkb3cnLFxyXG5cdFx0XHRcdHRoaXMudG9vbFRpcENvbG9ySG92ZXJTaGFkb3csXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJzbGlkZXJcIiBub3ZhbGlkYXRlPlxyXG5cdDxkaXYgY2xhc3M9XCJyYW5nZV9jb250YWluZXJcIj5cclxuXHRcdDxkaXYgY2xhc3M9XCJzbGlkZXJzX2NvbnRyb2xcIj5cclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0I2Zyb21TbGlkZXJcclxuXHRcdFx0XHQoY2hhbmdlKT1cImZpcmVFdmVudE9uQ2hhbmdlKClcIlxyXG5cdFx0XHRcdChpbnB1dCk9XCJmaXJlRXZlbnRPbklucHV0KCdmcm9tJylcIlxyXG5cdFx0XHRcdCpuZ0lmPVwiZG91YmxlU2xpZGVyXCJcclxuXHRcdFx0XHRbbWF4XT1cIm1heFwiXHJcblx0XHRcdFx0W21pbl09XCJtaW5cIlxyXG5cdFx0XHRcdGNsYXNzPVwiZnJvbS1zbGlkZXIgcmFuZ2VcIlxyXG5cdFx0XHRcdGZvcm1Db250cm9sTmFtZT1cImZyb21TbGlkZXJcIlxyXG5cdFx0XHRcdGlkPVwiZnJvbVNsaWRlclwiXHJcblx0XHRcdFx0c3RlcD1cIjFcIlxyXG5cdFx0XHRcdHR5cGU9XCJyYW5nZVwiXHJcblx0XHRcdC8+XHJcblxyXG5cdFx0XHQ8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd1Rvb2xUaXBcIj5cclxuXHRcdFx0XHQ8ZGl2ICNmcm9tU2xpZGVyVG9vbFRpcCAqbmdJZj1cImRvdWJsZVNsaWRlclwiIGNsYXNzPVwidG9vbHRpcFwiIGlkPVwicmFuZ2VGcm9tXCI+XHJcblx0XHRcdFx0XHR7eyBzbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlIH19XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvbmctY29udGFpbmVyPlxyXG5cclxuXHRcdFx0PGlucHV0XHJcblx0XHRcdFx0I3RvU2xpZGVyc1xyXG5cdFx0XHRcdChjaGFuZ2UpPVwiZmlyZUV2ZW50T25DaGFuZ2UoKVwiXHJcblx0XHRcdFx0KGlucHV0KT1cImZpcmVFdmVudE9uSW5wdXQoJ3RvJylcIlxyXG5cdFx0XHRcdFttYXhdPVwibWF4XCJcclxuXHRcdFx0XHRbbWluXT1cIm1pblwiXHJcblx0XHRcdFx0Y2xhc3M9XCJ0b1NsaWRlciByYW5nZVwiXHJcblx0XHRcdFx0Zm9ybUNvbnRyb2xOYW1lPVwidG9TbGlkZXJcIlxyXG5cdFx0XHRcdGlkPVwidG9TbGlkZXJcIlxyXG5cdFx0XHRcdHN0ZXA9XCIxXCJcclxuXHRcdFx0XHR0eXBlPVwicmFuZ2VcIlxyXG5cdFx0XHQvPlxyXG5cdFx0XHQ8ZGl2ICN0b1NsaWRlclRvb2xUaXAgKm5nSWY9XCJzaG93VG9vbFRpcFwiIGNsYXNzPVwidG9TbGlkZXJUb29sdGlwXCIgaWQ9XCJyYW5nZVRvXCI+XHJcblx0XHRcdFx0e3sgc2xpZGVyLmdldCgndG9TbGlkZXInKT8udmFsdWUgfX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L2Rpdj5cclxuPC9mb3JtPlxyXG4iXX0=