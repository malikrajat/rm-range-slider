import { AfterViewInit, ElementRef, EventEmitter, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MINMAX } from './rm-range-slider.component.interface';
import * as i0 from "@angular/core";
export declare class RmRangeSliderComponent implements OnInit, AfterViewInit {
    #private;
    private readonly fb;
    private renderer;
    slider: FormGroup;
    min: number;
    max: number;
    setMinValue: number;
    disabled: boolean;
    showToolTip: boolean;
    setMaxValue: number;
    showScale: boolean;
    doubleSlider: boolean;
    toolTipColor: string;
    toolTipColorHover: string;
    toolTipColorHoverShadow: string;
    rangeColor: string;
    sliderColor: string;
    sliderColorRight: string;
    onValueChanged: EventEmitter<MINMAX>;
    toSliders: ElementRef;
    fromSlider: ElementRef;
    toSliderToolTip: ElementRef;
    fromSliderToolTip: ElementRef;
    private gradient;
    private destroyed$;
    /**
     * The constructor function is a special function that is called when a new instance of the class is created
     * @param {FormBuilder} fb - FormBuilder - This is the FormBuilder service that we'll use to create our form.
     * @param {Renderer2} renderer - Renderer2 - This is the Angular Renderer2 service. It's used to manipulate the DOM.
     */
    constructor(fb: FormBuilder, renderer: Renderer2);
    /**
     * It creates a form.
     */
    ngOnInit(): void;
    /**
     * A lifecycle hook that is called after a component's view has been fully initialized.
     */
    ngAfterViewInit(): void;
    /**
     * When the component is destroyed, we want to complete the observable and let any subscribers know that the observable is
     * complete.
     */
    ngOnDestroy(): void;
    /**
     * If the changes object has a property called disabled and it's not the first change and the current value is true, then
     * call the #disabledSlider function with the current value of the disabled property
     * @param {SimpleChanges} changes - SimpleChanges - this is the object that contains the changes that have been made to
     * the component.
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * It's a function that takes a string as an argument and if the showToolTip property is true, it calls the
     * fromSliderToolTipPosition() or toSliderToolTipPosition() function depending on the value of the string argument
     * @param {string} slideType - string - This is the type of slider that is being moved. It can be either 'from' or 'to'.
     */
    fireEventOnInput(slideType: string): void;
    /**
     * We're calculating the position of the tooltip based on the value of the slider
     */
    fromSliderToolTipPosition(): void;
    /**
     * The function takes the value of the toSlider and converts it to a percentage value that is used to position the
     * toSliderToolTip
     */
    /**
     * The function takes the value of the toSlider and converts it to a percentage value that is used to position the
     * toSliderToolTip
     */
    toSliderToolTipPosition(): void;
    /**
     * We're getting the values of the two sliders, and then emitting an event with those values
     */
    fireEventOnChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RmRangeSliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RmRangeSliderComponent, "rm-range-slider", never, { "min": { "alias": "SliderMinRange"; "required": false; }; "max": { "alias": "SliderMaxRange"; "required": false; }; "setMinValue": { "alias": "setMinValue"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "showToolTip": { "alias": "showToolTip"; "required": false; }; "setMaxValue": { "alias": "setMaxValue"; "required": false; }; "showScale": { "alias": "showScale"; "required": false; }; "doubleSlider": { "alias": "doubleSlider"; "required": false; }; "toolTipColor": { "alias": "toolTipColor"; "required": false; }; "toolTipColorHover": { "alias": "toolTipColorHover"; "required": false; }; "toolTipColorHoverShadow": { "alias": "toolTipColorHoverShadow"; "required": false; }; "rangeColor": { "alias": "rangeColor"; "required": false; }; "sliderColor": { "alias": "sliderColor"; "required": false; }; "sliderColorRight": { "alias": "sliderColorRight"; "required": false; }; }, { "onValueChanged": "onValueChanged"; }, never, never, false, never>;
}
