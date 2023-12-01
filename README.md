
# Range-slider

A highly optimized and fully customizable pure angular component for value range selection.

The component is not re-rendered while user moves the thumb.
Even if there is a label, only the label component is re-rendered when values are changed.

RangeSlider uses angular Native's Animated library to transform thumbs / label / selected rail.
These optimizations help to achieve as much native look & feel as possible using only the JS layer.


## Installation

Install my-project with npm

```bash
  npm: npm install --save rm-range-slider
  yarn: yarn add rn-range-slider
```


## Usage

Dual Range Slider uses angular hooks, so this component doesn't work with angular below below version 2. 




```
...

import {RmRangeSliderModule} from "@rm-range-slider";

...

<rm-range-slider
	[SliderMinRange]="0"
	[showToolTip]="true"
	[doubleSlider]="true"
	[SliderMaxRange]="100"
	[disabled]="false"
	[setMinValue]="10"
	[setMaxValue]="60"
	[toolTipColor]="'#8a00e5'"
	[rangeColor]="'#8a00e5'"
	[sliderColor]="'#C6C6C6'"
	[toolTipColorHover]="'#b200e5ff'"
	[toolTipColorHoverShadow]="'rgba(108, 0, 119, 0.3)'"
	[sliderColorRight]="'rgba(239,7,65,0.98)'"
	(onValueChanged)="onValueChanged($event)"
></rm-range-slider>
... 

add root lavel style file
:root {
	--tooltip-arrow: red;
	--slider-thumb-color: blue;
	--slider-thumb-color-hover: blue;
	--slider-thumb-color-hover-shadow:  rgba(108, 0, 119, 0.3);
}
... 
```
### Version Mapping


| Slider | Ng   |
|--------|------|
| 0.0.1  | 14.x |
| 1.0.0  | 15.x |
| 2.0.0  | 16.x |
| 3.0.0  | 17.x |


### Properties

| Name                      | Description                                                          | Type    |                            Default Value                             |
|---------------------------|----------------------------------------------------------------------|---------|:--------------------------------------------------------------------:|
| `SliderMinRange`          | Minimum value of slider                                              | number  |        Initially `min` value will be set `0` if not provided         |
| `SliderMaxRange`          | Maximum value of slider                                              | number  |       Initially `max` value will be set `100` if not provided        |
| `showToolTip`             | Show or hide tool tip                                                | boolean |         Initially value will be set `false` if not provided          |
| `doubleSlider`            | Use like SIngle Slider or double slider                              | boolean |          Initially value will be set `true` if not provided          |
| `disabled`                | Disable or enable the slider moment                                  | boolean |         Initially value will be set `false` if not provided          |
| `setMinValue`             | Min value for slider's thumbnail to set on                           | number  |        Initially `min` value will be set `0` if not provided         |
| `setMaxValue`             | Max value for slider's thumbnail to set on                           | boolean |       Initially `max` value will be set `100` if not provided        |
| `toolTipColor`            | set color for tool tip                                               | string  |        Initially set default color for tool tip is `#8a00e5`         |
| `rangeColor`              | Set color for slider line between both min and max slider's thumnail | string  | Initially set default color for tool tip is `rgba(255,255,255,0.99)` |
| `sliderColor`             | Set color for slider line                                            | string  | Initially set default color for tool tip is `rgba(255,255,255,0.47)` |
| `toolTipColorHover`       | set color for tool tip on hover                                      | string  |        Initially set default color for tool tip is `#8a00e5'`        |
| `toolTipColorHoverShadow` | set shadow color for tool tip on hover                               | string  |        Initially set default color for tool tip is `#8a00e5'`        |
| `sliderColorRight`        | Set color for right side slider line                                 | string  |   Initially set default color for tool tip is `rgb(198, 198, 198)`   |
| `onValueChanged`          | Emit both value object of min and max                                | object  |              It do not return any value until changes                |

All the other props (e.g. style) will be passed to root container component.

