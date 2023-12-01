import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, interval } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class RmRangeSliderComponent {
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

class RmRangeSliderModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderModule, declarations: [RmRangeSliderComponent], imports: [ReactiveFormsModule, CommonModule], exports: [RmRangeSliderComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderModule, imports: [ReactiveFormsModule, CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RmRangeSliderModule, decorators: [{
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
