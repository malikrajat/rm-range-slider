import { Component, ElementRef, EventEmitter, inject, Input, Output, Renderer2, ViewChild, } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class RmRangeSliderComponent {
    constructor() {
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
        this.fb = inject(FormBuilder);
        this.renderer = inject(Renderer2);
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
        const [from, to] = this.#getParsed(fromSlider, toSlider);
        this.#fillSlider(fromSlider, toSlider);
        if (from > to) {
            const currentValue = this.slider.get(fromSlider)?.value;
            if (currentValue !== to) {
                this.slider.patchValue({
                    fromSlider: to,
                });
            }
        }
    }
    /**
     * > If the value of the `fromSlider` is less than or equal to the value of the `toSlider`, then set the value of the
     * `toSlider` to the value of the `toSlider`. Otherwise, set the value of the `toSlider` to the value of the `fromSlider`
     * @param {string} fromSlider - The name of the slider that is being changed.
     * @param {string} toSlider - The name of the slider that is being changed.
     */
    #controlToSlider(fromSlider, toSlider) {
        const [from, to] = this.#getParsed(fromSlider, toSlider);
        this.#fillSlider(fromSlider, toSlider);
        this.#setToggleAccessible();
        if (from <= to) {
            const currentValue = this.slider.get(toSlider)?.value;
            if (currentValue !== to) {
                this.slider.patchValue({
                    toSlider: to,
                });
            }
        }
        else {
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
        if (this.doubleSlider) {
            this.fromSlider.nativeElement.disabled = isDisabled;
            this.fromSliderToolTipPosition();
        }
        this.toSliders.nativeElement.disabled = isDisabled;
        this.toSliderToolTipPosition();
        this.#changeThumbColorOnDisabled();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.4", ngImport: i0, type: RmRangeSliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.4", type: RmRangeSliderComponent, isStandalone: true, selector: "rm-range-slider", inputs: { min: ["SliderMinRange", "min"], max: ["SliderMaxRange", "max"], setMinValue: "setMinValue", disabled: "disabled", showToolTip: "showToolTip", setMaxValue: "setMaxValue", showScale: "showScale", doubleSlider: "doubleSlider", toolTipColor: "toolTipColor", toolTipColorHover: "toolTipColorHover", toolTipColorHoverShadow: "toolTipColorHoverShadow", rangeColor: "rangeColor", sliderColor: "sliderColor", sliderColorRight: "sliderColorRight" }, outputs: { onValueChanged: "onValueChanged" }, viewQueries: [{ propertyName: "toSliders", first: true, predicate: ["toSliders"], descendants: true }, { propertyName: "fromSlider", first: true, predicate: ["fromSlider"], descendants: true }, { propertyName: "toSliderToolTip", first: true, predicate: ["toSliderToolTip"], descendants: true, read: ElementRef }, { propertyName: "fromSliderToolTip", first: true, predicate: ["fromSliderToolTip"], descendants: true, read: ElementRef }], ngImport: i0, template: "<form [formGroup]=\"slider\" novalidate>\r\n  <div class=\"range_container\">\r\n    <div class=\"sliders_control\">\r\n      @if (doubleSlider) {\r\n        <input\r\n          #fromSlider\r\n          (change)=\"fireEventOnChange()\"\r\n          (input)=\"fireEventOnInput('from')\"\r\n          [max]=\"max\"\r\n          [min]=\"min\"\r\n          class=\"from-slider range\"\r\n          formControlName=\"fromSlider\"\r\n          id=\"fromSlider\"\r\n          step=\"1\"\r\n          type=\"range\"\r\n          />\r\n      }\r\n\r\n      @if (showToolTip) {\r\n        @if (doubleSlider) {\r\n          <div #fromSliderToolTip class=\"tooltip\" id=\"rangeFrom\">\r\n            {{ slider.get('fromSlider')?.value }}\r\n          </div>\r\n        }\r\n      }\r\n\r\n      <input\r\n        #toSliders\r\n        (change)=\"fireEventOnChange()\"\r\n        (input)=\"fireEventOnInput('to')\"\r\n        [max]=\"max\"\r\n        [min]=\"min\"\r\n        class=\"toSlider range\"\r\n        formControlName=\"toSlider\"\r\n        id=\"toSlider\"\r\n        step=\"1\"\r\n        type=\"range\"\r\n        />\r\n        @if (showToolTip) {\r\n          <div #toSliderToolTip class=\"toSliderTooltip\" id=\"rangeTo\">\r\n            {{ slider.get('toSlider')?.value }}\r\n          </div>\r\n        }\r\n      </div>\r\n    </div>\r\n  </form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{-webkit-appearance:none;appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;content:\" \";position:absolute;border:10px solid transparent;border-top-color:var(--tooltip-arrow);margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;content:\" \";position:absolute;border:10px solid transparent;border-top-color:var(--tooltip-arrow);margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.RangeValueAccessor, selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.4", ngImport: i0, type: RmRangeSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-range-slider', standalone: true, imports: [ReactiveFormsModule], template: "<form [formGroup]=\"slider\" novalidate>\r\n  <div class=\"range_container\">\r\n    <div class=\"sliders_control\">\r\n      @if (doubleSlider) {\r\n        <input\r\n          #fromSlider\r\n          (change)=\"fireEventOnChange()\"\r\n          (input)=\"fireEventOnInput('from')\"\r\n          [max]=\"max\"\r\n          [min]=\"min\"\r\n          class=\"from-slider range\"\r\n          formControlName=\"fromSlider\"\r\n          id=\"fromSlider\"\r\n          step=\"1\"\r\n          type=\"range\"\r\n          />\r\n      }\r\n\r\n      @if (showToolTip) {\r\n        @if (doubleSlider) {\r\n          <div #fromSliderToolTip class=\"tooltip\" id=\"rangeFrom\">\r\n            {{ slider.get('fromSlider')?.value }}\r\n          </div>\r\n        }\r\n      }\r\n\r\n      <input\r\n        #toSliders\r\n        (change)=\"fireEventOnChange()\"\r\n        (input)=\"fireEventOnInput('to')\"\r\n        [max]=\"max\"\r\n        [min]=\"min\"\r\n        class=\"toSlider range\"\r\n        formControlName=\"toSlider\"\r\n        id=\"toSlider\"\r\n        step=\"1\"\r\n        type=\"range\"\r\n        />\r\n        @if (showToolTip) {\r\n          <div #toSliderToolTip class=\"toSliderTooltip\" id=\"rangeTo\">\r\n            {{ slider.get('toSlider')?.value }}\r\n          </div>\r\n        }\r\n      </div>\r\n    </div>\r\n  </form>\r\n", styles: [".range_container{display:flex;justify-content:space-around;align-items:center;flex-direction:row}.sliders_control{width:92%}.range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-moz-range-thumb{-webkit-appearance:none;pointer-events:all;width:18px;height:18px;background-color:var(--slider-thumb-color);border-radius:50%;cursor:pointer}.range::-webkit-slider-thumb:hover{background:var(--slider-thumb-color-hover);width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 10px var(--slider-thumb-color-hover-shadow)}.range:disabled{pointer-events:none;cursor:not-allowed}.range{-webkit-appearance:none;appearance:none;height:5px;width:90%;position:absolute;pointer-events:none;border-radius:8px;margin-top:19px}#fromSlider{height:0;z-index:1}.from-slider{margin-top:50px}.tooltip{width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;position:relative}.toSliderTooltip{width:fit-content;color:#fff;border-radius:6px;padding:5px;min-width:28px;text-align:center;align-items:end;right:5%;position:absolute;top:6px}.tooltip:after{top:28px;left:46.6%;content:\" \";position:absolute;border:10px solid transparent;border-top-color:var(--tooltip-arrow);margin-left:-10px}.toSliderTooltip:after{top:28px;left:20.2px;content:\" \";position:absolute;border:10px solid transparent;border-top-color:var(--tooltip-arrow);margin-left:-10px}.sliders_control:not(:has(.tooltip)) .from-slider{margin-top:22px}.sliders_control:not(:has(.tooltip)):has(.toSliderTooltip) .range{margin-top:43px}\n"] }]
        }], propDecorators: { min: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JtLXJhbmdlLXNsaWRlci9zcmMvbGliL3JtLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9ybS1yYW5nZS1zbGlkZXIvc3JjL2xpYi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUFFLE1BQU0sRUFDcEIsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUNULE1BQU0sZUFBZSxDQUFBO0FBQ3RCLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDeEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQTs7O0FBVTlCLE1BQU0sT0FBTyxzQkFBc0I7SUFQbkM7UUFTMEIsUUFBRyxHQUFXLENBQUMsQ0FBQTtRQUNmLFFBQUcsR0FBVyxHQUFHLENBQUE7UUFDcEIsZ0JBQVcsR0FBVyxDQUFDLENBQUE7UUFDMUIsYUFBUSxHQUFZLEtBQUssQ0FBQTtRQUN0QixnQkFBVyxHQUFZLEtBQUssQ0FBQTtRQUM1QixnQkFBVyxHQUFXLEdBQUcsQ0FBQTtRQUMzQixjQUFTLEdBQVksS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQVksSUFBSSxDQUFBO1FBQzVCLGlCQUFZLEdBQVcsU0FBUyxDQUFBO1FBQzNCLHNCQUFpQixHQUFXLFNBQVMsQ0FBQTtRQUMvQiw0QkFBdUIsR0FBVyxTQUFTLENBQUE7UUFDeEQsZUFBVSxHQUFXLHdCQUF3QixDQUFBO1FBQzVDLGdCQUFXLEdBQVcsd0JBQXdCLENBQUE7UUFDekMscUJBQWdCLEdBQVcsb0JBQW9CLENBQUE7UUFDaEQsbUJBQWMsR0FB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clxuXHRBZnRlclZpZXdJbml0LFxyXG5cdENvbXBvbmVudCxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEV2ZW50RW1pdHRlciwgaW5qZWN0LFxyXG5cdElucHV0LCBPbkRlc3Ryb3ksXHJcblx0T25Jbml0LFxyXG5cdE91dHB1dCxcclxuXHRSZW5kZXJlcjIsXHJcblx0Vmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3JtcydcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnXHJcbmltcG9ydCB7IE1JTk1BWCB9IGZyb20gJy4vcm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5pbnRlcmZhY2UnXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncm0tcmFuZ2Utc2xpZGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ybS1yYW5nZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcm0tcmFuZ2Utc2xpZGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gICAgaW1wb3J0czogW1JlYWN0aXZlRm9ybXNNb2R1bGVdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUm1SYW5nZVNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHRwdWJsaWMgc2xpZGVyITogRm9ybUdyb3VwXHJcblx0QElucHV0KCdTbGlkZXJNaW5SYW5nZScpIG1pbjogbnVtYmVyID0gMFxyXG5cdEBJbnB1dCgnU2xpZGVyTWF4UmFuZ2UnKSBtYXg6IG51bWJlciA9IDEwMFxyXG5cdEBJbnB1dCgnc2V0TWluVmFsdWUnKSBzZXRNaW5WYWx1ZTogbnVtYmVyID0gMFxyXG5cdEBJbnB1dCgnZGlzYWJsZWQnKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlXHJcblx0QElucHV0KCdzaG93VG9vbFRpcCcpIHNob3dUb29sVGlwOiBib29sZWFuID0gZmFsc2VcclxuXHRASW5wdXQoJ3NldE1heFZhbHVlJykgc2V0TWF4VmFsdWU6IG51bWJlciA9IDEwMFxyXG5cdEBJbnB1dCgnc2hvd1NjYWxlJykgc2hvd1NjYWxlOiBib29sZWFuID0gZmFsc2VcclxuXHRASW5wdXQoJ2RvdWJsZVNsaWRlcicpIGRvdWJsZVNsaWRlcjogYm9vbGVhbiA9IHRydWVcclxuXHRASW5wdXQoJ3Rvb2xUaXBDb2xvcicpIHRvb2xUaXBDb2xvcjogc3RyaW5nID0gJyM4YTAwZTUnXHJcblx0QElucHV0KCd0b29sVGlwQ29sb3JIb3ZlcicpIHRvb2xUaXBDb2xvckhvdmVyOiBzdHJpbmcgPSAnIzhhMDBlNSdcclxuXHRASW5wdXQoJ3Rvb2xUaXBDb2xvckhvdmVyU2hhZG93JykgdG9vbFRpcENvbG9ySG92ZXJTaGFkb3c6IHN0cmluZyA9ICcjOGEwMGU1J1xyXG5cdEBJbnB1dCgncmFuZ2VDb2xvcicpIHJhbmdlQ29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTkpJ1xyXG5cdEBJbnB1dCgnc2xpZGVyQ29sb3InKSBzbGlkZXJDb2xvcjogc3RyaW5nID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC40NyknXHJcblx0QElucHV0KCdzbGlkZXJDb2xvclJpZ2h0Jykgc2xpZGVyQ29sb3JSaWdodDogc3RyaW5nID0gJ3JnYigxOTgsIDE5OCwgMTk4KSdcclxuXHRAT3V0cHV0KCdvblZhbHVlQ2hhbmdlZCcpIG9uVmFsdWVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TUlOTUFYPiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cdEBWaWV3Q2hpbGQoJ3RvU2xpZGVycycsIHsgc3RhdGljOiBmYWxzZSB9KSB0b1NsaWRlcnMhOiBFbGVtZW50UmVmXHJcblx0QFZpZXdDaGlsZCgnZnJvbVNsaWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBmcm9tU2xpZGVyITogRWxlbWVudFJlZlxyXG5cdEBWaWV3Q2hpbGQoJ3RvU2xpZGVyVG9vbFRpcCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSB0b1NsaWRlclRvb2xUaXAhOiBFbGVtZW50UmVmXHJcblx0QFZpZXdDaGlsZCgnZnJvbVNsaWRlclRvb2xUaXAnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgZnJvbVNsaWRlclRvb2xUaXAhOiBFbGVtZW50UmVmXHJcblx0cHJpdmF0ZSBncmFkaWVudCE6IHN0cmluZ1xyXG5cdHByaXZhdGUgZGVzdHJveWVkJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KClcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBmYjogRm9ybUJ1aWxkZXIgPSBpbmplY3QoRm9ybUJ1aWxkZXIpO1xyXG5cdHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiA9IGluamVjdChSZW5kZXJlcjIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBJdCBjcmVhdGVzIGEgZm9ybS5cclxuXHQgKi9cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuI2NyZWF0ZUZyb20oKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBsaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXHJcblx0ICovXHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0dGhpcy4jZmlsbFNsaWRlcignZnJvbVNsaWRlcicsICd0b1NsaWRlcicpXHJcblx0XHR0aGlzLiNzZXRUb2dnbGVBY2Nlc3NpYmxlKClcclxuXHRcdHRoaXMuI2Rpc2FibGVkU2xpZGVyKHRoaXMuZGlzYWJsZWQpXHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogSXQncyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdHJpbmcgYXMgYW4gYXJndW1lbnQgYW5kIGlmIHRoZSBzaG93VG9vbFRpcCBwcm9wZXJ0eSBpcyB0cnVlLCBpdCBjYWxscyB0aGVcclxuXHQgKiBmcm9tU2xpZGVyVG9vbFRpcFBvc2l0aW9uKCkgb3IgdG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKSBmdW5jdGlvbiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIHRoZSBzdHJpbmcgYXJndW1lbnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2xpZGVUeXBlIC0gc3RyaW5nIC0gVGhpcyBpcyB0aGUgdHlwZSBvZiBzbGlkZXIgdGhhdCBpcyBiZWluZyBtb3ZlZC4gSXQgY2FuIGJlIGVpdGhlciAnZnJvbScgb3IgJ3RvJy5cclxuXHQgKi9cclxuXHRmaXJlRXZlbnRPbklucHV0KHNsaWRlVHlwZTogc3RyaW5nKSB7XHJcblx0XHRpZiAodGhpcy5zaG93VG9vbFRpcCkge1xyXG5cdFx0XHRpZiAoc2xpZGVUeXBlID09PSAnZnJvbScpIHtcclxuXHRcdFx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwUG9zaXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChzbGlkZVR5cGUgPT09ICd0bycpIHtcclxuXHRcdFx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcFBvc2l0aW9uKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2UncmUgY2FsY3VsYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyXHJcblx0ICovXHJcblx0ZnJvbVNsaWRlclRvb2xUaXBQb3NpdGlvbigpIHtcclxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuc2xpZGVyLmdldCgnZnJvbVNsaWRlcicpPy52YWx1ZVxyXG5cdFx0Y29uc3QgbWluID0gdGhpcy5taW4gPyB0aGlzLm1pbiA6IDBcclxuXHRcdGNvbnN0IG1heCA9IHRoaXMubWF4ID8gdGhpcy5tYXggOiAxMDBcclxuXHRcdGNvbnN0IG5ld1ZhbCA9IE51bWJlcigoKHZhbCAtIG1pbikgKiAxMDApIC8gKG1heCAtIG1pbikpXHJcblx0XHR0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGBjYWxjKCR7bmV3VmFsfSUgKyAoJHstNiAtIG5ld1ZhbCAqIDAuNH1weCkpYFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIgYW5kIGNvbnZlcnRzIGl0IHRvIGEgcGVyY2VudGFnZSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlXHJcblx0ICogdG9TbGlkZXJUb29sVGlwXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIgYW5kIGNvbnZlcnRzIGl0IHRvIGEgcGVyY2VudGFnZSB2YWx1ZSB0aGF0IGlzIHVzZWQgdG8gcG9zaXRpb24gdGhlXHJcblx0ICogdG9TbGlkZXJUb29sVGlwXHJcblx0ICovXHJcblx0dG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKSB7XHJcblx0XHRjb25zdCB0b1NsaWRlciA9IHRoaXMuc2xpZGVyLmdldCgndG9TbGlkZXInKT8udmFsdWVcclxuXHRcdGNvbnN0IHkgPSAwLjg4NzUgKiB0b1NsaWRlciArIDMuOTg1XHJcblx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB5ICsgJyUnXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXZSdyZSBnZXR0aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIHR3byBzbGlkZXJzLCBhbmQgdGhlbiBlbWl0dGluZyBhbiBldmVudCB3aXRoIHRob3NlIHZhbHVlc1xyXG5cdCAqL1xyXG5cdGZpcmVFdmVudE9uQ2hhbmdlKCkge1xyXG5cdFx0Y29uc3QgdG9TbGlkZXIgPSB0aGlzLnNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRjb25zdCBmcm9tU2xpZGVyID0gdGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRjb25zdCBtYXhNaW4gPSB7XHJcblx0XHRcdG1pbjogZnJvbVNsaWRlcixcclxuXHRcdFx0bWF4OiB0b1NsaWRlcixcclxuXHRcdH1cclxuXHRcdHRoaXMub25WYWx1ZUNoYW5nZWQuZW1pdChtYXhNaW4pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZnVuY3Rpb24gY3JlYXRlcyBhIGZvcm0gZ3JvdXAgd2l0aCB0d28gZm9ybSBjb250cm9scywgb25lIGZvciB0aGUgbWluaW11bSB2YWx1ZSBhbmQgb25lIGZvciB0aGUgbWF4aW11bSB2YWx1ZVxyXG5cdCAqL1xyXG5cdCNjcmVhdGVGcm9tKCkge1xyXG5cdFx0dGhpcy5zbGlkZXIgPSB0aGlzLmZiLmdyb3VwKHtcclxuXHRcdFx0ZnJvbVNsaWRlcjogW3RoaXMuc2V0TWluVmFsdWUsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1heCh0aGlzLm1heCksIFZhbGlkYXRvcnMubWluKHRoaXMubWluKV1dLFxyXG5cdFx0XHR0b1NsaWRlcjogW3RoaXMuc2V0TWF4VmFsdWUsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1heCh0aGlzLm1heCksIFZhbGlkYXRvcnMubWluKHRoaXMubWluKV1dLFxyXG5cdFx0fSlcclxuXHRcdHRoaXMuI29uRm9ybVZhbHVlQ2hhbmdlKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiBzdWJzY3JpYmVzIHRvIHRoZSB2YWx1ZUNoYW5nZXMgb2YgdGhlIGZyb21TbGlkZXIgYW5kIHRvU2xpZGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGZyb21TbGlkZXIgaXMgdGhlIHNsaWRlciBvbiB0aGUgbGVmdCBhbmQgdGhlIHRvU2xpZGVyIGlzIHRoZSBzbGlkZXIgb24gdGhlIHJpZ2h0LlxyXG5cdCAqXHJcblx0ICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbkZvcm1WYWx1ZUNoYW5nZSgpIGJlY2F1c2UgaXQgaXMgY2FsbGVkIGluIHRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIG5nT25Jbml0KCkgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZC5cclxuXHQgKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb25Gb3JtVmFsdWVDaGFuZ2UoKSBiZWNhdXNlIGl0IGlzIGNhbGxlZCBpbiB0aGUgbmdPbkluaXQoKSBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIFRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQuXHJcblx0ICpcclxuXHQgKiBUaGUgZnVuY3Rpb24gaXMgY2FsbGVkIG9uRm9ybVZhbHVlQ2hhbmdlKCkgYmVjYXVzZSBpdCBpcyBjYWxsZWQgaW4gdGhlIG5nT25Jbml0KCkgZnVuY3Rpb24uXHJcblx0ICpcclxuXHQgKiBUaGUgbmdPbkluaXQoKSBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkLlxyXG5cdCAqXHJcblx0ICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbkZvcm1WYWx1ZUNoYW5nZSgpIGJlY2F1c2UgaXQgaXMgY2FsbGVkIGluIHRoZSBuZ09uSW5pdCgpIGZ1bmN0aW9uLlxyXG5cdCAqXHJcblx0ICogVGhlIG5nT25Jbml0XHJcblx0ICovXHJcblx0I29uRm9ybVZhbHVlQ2hhbmdlKCkge1xyXG5cdFx0dGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBmcm9tU2xpZGVyID0gdGhpcy5zbGlkZXIuZ2V0KCdmcm9tU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRcdGlmICh0aGlzLmZyb21TbGlkZXJUb29sVGlwKSB7XHJcblx0XHRcdFx0dGhpcy5mcm9tU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IGA8c3Bhbj4ke2Zyb21TbGlkZXJ9PC9zcGFuPmBcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiNjb250cm9sRnJvbVNsaWRlcignZnJvbVNsaWRlcicsICd0b1NsaWRlcicpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5zbGlkZXIuZ2V0KCd0b1NsaWRlcicpPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0dGhpcy4jY29udHJvbFRvU2xpZGVyKCdmcm9tU2xpZGVyJywgJ3RvU2xpZGVyJylcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIGZyb21TbGlkZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXIsIHRoZW4gdGhlIHZhbHVlIG9mIHRoZSBmcm9tU2xpZGVyIGlzIHNldCB0b1xyXG5cdCAqIHRoZSB2YWx1ZSBvZiB0aGUgdG9TbGlkZXJcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVNsaWRlciAtIHRoZSBuYW1lIG9mIHRoZSBmcm9tIHNsaWRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0b1NsaWRlciAtIHN0cmluZyAtIHRoZSBuYW1lIG9mIHRoZSB0b1NsaWRlciBjb250cm9sXHJcblx0ICovXHJcblx0I2NvbnRyb2xGcm9tU2xpZGVyKGZyb21TbGlkZXI6IHN0cmluZywgdG9TbGlkZXI6IHN0cmluZykge1xyXG5cdFx0Y29uc3QgW2Zyb20sIHRvXSA9IHRoaXMuI2dldFBhcnNlZChmcm9tU2xpZGVyLCB0b1NsaWRlcik7XHJcblx0XHR0aGlzLiNmaWxsU2xpZGVyKGZyb21TbGlkZXIsIHRvU2xpZGVyKTtcclxuXHJcblx0XHRpZiAoZnJvbSA+IHRvKSB7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc2xpZGVyLmdldChmcm9tU2xpZGVyKT8udmFsdWU7XHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT09IHRvKSB7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XHJcblx0XHRcdFx0XHRmcm9tU2xpZGVyOiB0byxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogPiBJZiB0aGUgdmFsdWUgb2YgdGhlIGBmcm9tU2xpZGVyYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZSBgdG9TbGlkZXJgLCB0aGVuIHNldCB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogYHRvU2xpZGVyYCB0byB0aGUgdmFsdWUgb2YgdGhlIGB0b1NsaWRlcmAuIE90aGVyd2lzZSwgc2V0IHRoZSB2YWx1ZSBvZiB0aGUgYHRvU2xpZGVyYCB0byB0aGUgdmFsdWUgb2YgdGhlIGBmcm9tU2xpZGVyYFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tU2xpZGVyIC0gVGhlIG5hbWUgb2YgdGhlIHNsaWRlciB0aGF0IGlzIGJlaW5nIGNoYW5nZWQuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRvU2xpZGVyIC0gVGhlIG5hbWUgb2YgdGhlIHNsaWRlciB0aGF0IGlzIGJlaW5nIGNoYW5nZWQuXHJcblx0ICovXHJcblx0I2NvbnRyb2xUb1NsaWRlcihmcm9tU2xpZGVyOiBzdHJpbmcsIHRvU2xpZGVyOiBzdHJpbmcpIHtcclxuXHRcdGNvbnN0IFtmcm9tLCB0b10gPSB0aGlzLiNnZXRQYXJzZWQoZnJvbVNsaWRlciwgdG9TbGlkZXIpO1xyXG5cdFx0dGhpcy4jZmlsbFNsaWRlcihmcm9tU2xpZGVyLCB0b1NsaWRlcik7XHJcblx0XHR0aGlzLiNzZXRUb2dnbGVBY2Nlc3NpYmxlKCk7XHJcblxyXG5cdFx0aWYgKGZyb20gPD0gdG8pIHtcclxuXHRcdFx0Y29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5zbGlkZXIuZ2V0KHRvU2xpZGVyKT8udmFsdWU7XHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgIT09IHRvKSB7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXIucGF0Y2hWYWx1ZSh7XHJcblx0XHRcdFx0XHR0b1NsaWRlcjogdG8sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2xpZGVyLnBhdGNoVmFsdWUoe1xyXG5cdFx0XHRcdHRvU2xpZGVyOiBmcm9tLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEl0IHJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGZpZWxkIHRoYXQgaXMgcGFzc2VkIGluIGFzIGEgcGFyYW1ldGVyXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZyb21DIC0gVGhlIG5hbWUgb2YgdGhlIGZvcm0gZmllbGQgdGhhdCBjb250YWlucyB0aGUgdmFsdWUgb2YgdGhlIGxlZnQgc2xpZGVyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0b0MgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGNvbnRhaW5zIHRoZSB2YWx1ZSBvZiB0aGUgcmlnaHQgc2xpZGVyLlxyXG5cdCAqL1xyXG5cdCNmaWxsU2xpZGVyKGZyb21DOiBzdHJpbmcsIHRvQzogc3RyaW5nKSB7XHJcblx0XHRjb25zdCBmcm9tID0gdGhpcy4jZ2V0Rm9ybVZhbHVlKGZyb21DKVxyXG5cdFx0Y29uc3QgdG8gPSB0aGlzLiNnZXRGb3JtVmFsdWUodG9DKVxyXG5cdFx0Y29uc3Qgc2xpZGVyQ29sb3IgPSB0aGlzLnNsaWRlckNvbG9yXHJcblx0XHRjb25zdCByYW5nZUNvbG9yID0gdGhpcy5yYW5nZUNvbG9yXHJcblx0XHRjb25zdCByYW5nZURpc3RhbmNlID0gdGhpcy5tYXggLSB0aGlzLm1pblxyXG5cdFx0Y29uc3QgZnJvbVBvc2l0aW9uID0gdGhpcy5kb3VibGVTbGlkZXIgPyBmcm9tIC0gdGhpcy5taW4gOiB0aGlzLm1pblxyXG5cdFx0Y29uc3QgdG9Qb3NpdGlvbiA9IHRvIC0gdGhpcy5taW5cclxuXHRcdHRoaXMuZ3JhZGllbnQgPSBgbGluZWFyLWdyYWRpZW50KFxyXG4gICAgdG8gcmlnaHQsXHJcbiAgICAke3NsaWRlckNvbG9yfSAwJSxcclxuICAgICR7c2xpZGVyQ29sb3J9ICR7KGZyb21Qb3NpdGlvbiAvIHJhbmdlRGlzdGFuY2UpICogMTAwfSUsXHJcbiAgICAke3JhbmdlQ29sb3J9ICR7KGZyb21Qb3NpdGlvbiAvIHJhbmdlRGlzdGFuY2UpICogMTAwfSUsXHJcbiAvKipcclxuXHQgKiBJdCByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGlzIHBhc3NlZCBpbiBhcyBhIHBhcmFtZXRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBGb3JtRmllbGQgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB5b3Ugd2FudCB0byBnZXQgdGhlIHZhbHVlIG9mLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZC5cclxuXHQgKi9cclxuXHQgICAke3JhbmdlQ29sb3J9ICR7KHRvUG9zaXRpb24gLyByYW5nZURpc3RhbmNlKSAqIDEwMH0lLFxyXG4gICAgJHt0aGlzLnNsaWRlckNvbG9yUmlnaHR9ICR7KHRvUG9zaXRpb24gLyByYW5nZURpc3RhbmNlKSAqIDEwMH0lLFxyXG4gICAgJHt0aGlzLnNsaWRlckNvbG9yUmlnaHR9IDEwMCUpYFxyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZ3JhZGllbnQpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZCB0aGF0IGlzIHBhc3NlZCBpbiBhcyBhIHBhcmFtZXRlclxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBGb3JtRmllbGQgLSBUaGUgbmFtZSBvZiB0aGUgZm9ybSBmaWVsZCB5b3Ugd2FudCB0byBnZXQgdGhlIHZhbHVlIG9mLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBmaWVsZC5cclxuXHQgKi9cclxuXHQjZ2V0Rm9ybVZhbHVlKEZvcm1GaWVsZDogc3RyaW5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zbGlkZXIuZ2V0KEZvcm1GaWVsZCk/LnZhbHVlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlciBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMCwgdGhlbiBzZXQgdGhlIHotaW5kZXggb2YgdGhlIHNsaWRlciB0byAyLCBvdGhlcndpc2Ugc2V0IGl0IHRvIDBcclxuXHQgKi9cclxuXHQjc2V0VG9nZ2xlQWNjZXNzaWJsZSgpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRUYXJnZXQgPSB0aGlzLnNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlXHJcblx0XHRpZiAoTnVtYmVyKGN1cnJlbnRUYXJnZXQudmFsdWUpIDw9IDApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LCAnekluZGV4JywgMilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudCwgJ3pJbmRleCcsIDApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCB0YWtlcyB0d28gc3RyaW5ncywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdHdvIG51bWJlcnNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEZyb20gLSBzdHJpbmcgLSBUaGUgbmFtZSBvZiB0aGUgaW5wdXQgdGhhdCBob2xkcyB0aGUgXCJmcm9tXCIgdmFsdWVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRvIC0gc3RyaW5nIC0gdGhlIG5hbWUgb2YgdGhlIGlucHV0IHRoYXQgaG9sZHMgdGhlIHZhbHVlIG9mIHRoZSByaWdodCBzbGlkZXJcclxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB0d28gbnVtYmVycy5cclxuXHQgKi9cclxuXHQjZ2V0UGFyc2VkKGN1cnJlbnRGcm9tOiBzdHJpbmcsIGN1cnJlbnRUbzogc3RyaW5nKTogYW55IHtcclxuXHRcdGNvbnN0IGZyb20gPSBwYXJzZUludCh0aGlzLnNsaWRlci5nZXQoY3VycmVudEZyb20pPy52YWx1ZSwgMTApXHJcblx0XHRjb25zdCB0byA9IHBhcnNlSW50KHRoaXMuc2xpZGVyLmdldChjdXJyZW50VG8pPy52YWx1ZSwgMTApXHJcblx0XHRyZXR1cm4gW2Zyb20sIHRvXVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSXQgZGlzYWJsZXMgdGhlIHNsaWRlciBhbmQgY2hhbmdlcyB0aGUgY29sb3Igb2YgdGhlIHRodW1iIHRvIGdyYXlcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWQgLSBib29sZWFuIC0gdHJ1ZSBpZiB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLCBmYWxzZSBpZiBpdCdzIGVuYWJsZWRcclxuXHQgKi9cclxuXHQjZGlzYWJsZWRTbGlkZXIoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZG91YmxlU2xpZGVyKSB7XHJcblx0XHRcdHRoaXMuZnJvbVNsaWRlci5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuXHRcdFx0dGhpcy5mcm9tU2xpZGVyVG9vbFRpcFBvc2l0aW9uKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuXHRcdHRoaXMudG9TbGlkZXJUb29sVGlwUG9zaXRpb24oKTtcclxuXHRcdHRoaXMuI2NoYW5nZVRodW1iQ29sb3JPbkRpc2FibGVkKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XHJcblx0XHR0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRoZSBzbGlkZXIgaXMgZGlzYWJsZWQsIHNldCB0aGUgdG9vbHRpcCBjb2xvciB0byAjZGRkZGRkIGFuZCB0aGUgdG9vbHRpcCBob3ZlciBjb2xvciB0byAjZGRkZGRkIGFuZCB0aGUgdG9vbHRpcFxyXG5cdCAqIGhvdmVyIHNoYWRvdyB0byBub25lXHJcblx0ICovXHJcblx0I2NoYW5nZVRodW1iQ29sb3JPbkRpc2FibGVkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuXHRcdFx0dGhpcy50b29sVGlwQ29sb3IgPSAnI2RkZGRkZCdcclxuXHRcdFx0dGhpcy50b29sVGlwQ29sb3JIb3ZlciA9ICcjZGRkZGRkJ1xyXG5cdFx0XHR0aGlzLnRvb2xUaXBDb2xvckhvdmVyU2hhZG93ID0gJ25vbmUnXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZnJvbVNsaWRlclRvb2xUaXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmZyb21TbGlkZXJUb29sVGlwLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy50b29sVGlwQ29sb3IpXHJcblx0XHRcdHRoaXMuZnJvbVNsaWRlclRvb2xUaXAubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10b29sdGlwLWFycm93JywgdGhpcy50b29sVGlwQ29sb3IpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b1NsaWRlclRvb2xUaXApIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxyXG5cdFx0XHR0aGlzLnRvU2xpZGVyVG9vbFRpcC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXRvb2x0aXAtYXJyb3cnLCB0aGlzLnRvb2xUaXBDb2xvcilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5mcm9tU2xpZGVyKSB7XHJcblx0XHRcdHRoaXMuZnJvbVNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNsaWRlci10aHVtYi1jb2xvcicsIHRoaXMudG9vbFRpcENvbG9yKVxyXG5cdFx0XHR0aGlzLmZyb21TbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXInLCB0aGlzLnRvb2xUaXBDb2xvckhvdmVyKVxyXG5cdFx0XHR0aGlzLmZyb21TbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuXHRcdFx0XHQnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXItc2hhZG93JyxcclxuXHRcdFx0XHR0aGlzLnRvb2xUaXBDb2xvckhvdmVyU2hhZG93LFxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b1NsaWRlcnMpIHtcclxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3InLCB0aGlzLnRvb2xUaXBDb2xvcilcclxuXHRcdFx0dGhpcy50b1NsaWRlcnMubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zbGlkZXItdGh1bWItY29sb3ItaG92ZXInLCB0aGlzLnRvb2xUaXBDb2xvckhvdmVyKVxyXG5cdFx0XHR0aGlzLnRvU2xpZGVycy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxyXG5cdFx0XHRcdCctLXNsaWRlci10aHVtYi1jb2xvci1ob3Zlci1zaGFkb3cnLFxyXG5cdFx0XHRcdHRoaXMudG9vbFRpcENvbG9ySG92ZXJTaGFkb3csXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJzbGlkZXJcIiBub3ZhbGlkYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJyYW5nZV9jb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJzbGlkZXJzX2NvbnRyb2xcIj5cclxuICAgICAgQGlmIChkb3VibGVTbGlkZXIpIHtcclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICNmcm9tU2xpZGVyXHJcbiAgICAgICAgICAoY2hhbmdlKT1cImZpcmVFdmVudE9uQ2hhbmdlKClcIlxyXG4gICAgICAgICAgKGlucHV0KT1cImZpcmVFdmVudE9uSW5wdXQoJ2Zyb20nKVwiXHJcbiAgICAgICAgICBbbWF4XT1cIm1heFwiXHJcbiAgICAgICAgICBbbWluXT1cIm1pblwiXHJcbiAgICAgICAgICBjbGFzcz1cImZyb20tc2xpZGVyIHJhbmdlXCJcclxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZyb21TbGlkZXJcIlxyXG4gICAgICAgICAgaWQ9XCJmcm9tU2xpZGVyXCJcclxuICAgICAgICAgIHN0ZXA9XCIxXCJcclxuICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICB9XHJcblxyXG4gICAgICBAaWYgKHNob3dUb29sVGlwKSB7XHJcbiAgICAgICAgQGlmIChkb3VibGVTbGlkZXIpIHtcclxuICAgICAgICAgIDxkaXYgI2Zyb21TbGlkZXJUb29sVGlwIGNsYXNzPVwidG9vbHRpcFwiIGlkPVwicmFuZ2VGcm9tXCI+XHJcbiAgICAgICAgICAgIHt7IHNsaWRlci5nZXQoJ2Zyb21TbGlkZXInKT8udmFsdWUgfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgI3RvU2xpZGVyc1xyXG4gICAgICAgIChjaGFuZ2UpPVwiZmlyZUV2ZW50T25DaGFuZ2UoKVwiXHJcbiAgICAgICAgKGlucHV0KT1cImZpcmVFdmVudE9uSW5wdXQoJ3RvJylcIlxyXG4gICAgICAgIFttYXhdPVwibWF4XCJcclxuICAgICAgICBbbWluXT1cIm1pblwiXHJcbiAgICAgICAgY2xhc3M9XCJ0b1NsaWRlciByYW5nZVwiXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9TbGlkZXJcIlxyXG4gICAgICAgIGlkPVwidG9TbGlkZXJcIlxyXG4gICAgICAgIHN0ZXA9XCIxXCJcclxuICAgICAgICB0eXBlPVwicmFuZ2VcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgQGlmIChzaG93VG9vbFRpcCkge1xyXG4gICAgICAgICAgPGRpdiAjdG9TbGlkZXJUb29sVGlwIGNsYXNzPVwidG9TbGlkZXJUb29sdGlwXCIgaWQ9XCJyYW5nZVRvXCI+XHJcbiAgICAgICAgICAgIHt7IHNsaWRlci5nZXQoJ3RvU2xpZGVyJyk/LnZhbHVlIH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9mb3JtPlxyXG4iXX0=