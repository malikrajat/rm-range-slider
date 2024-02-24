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
    min="0"
    max="100"
    startValue="0"
    endValue="10"
    (onValueChanged)="onValueChanged($event)"
    ></rm-range-slider>

```

### Version Mapping

| Slider | Ng   |
| ------ | ---- |
| 0.0.1  | 14.x |
| 1.0.0  | 15.x |
| 2.0.0  | 16.x |
| 3.0.0  | 17.x |

### Properties

| Name             | Description                           | Type   |                      Default Value                      |
| ---------------- | ------------------------------------- | ------ | :-----------------------------------------------------: |
| `min`            | Minimum value of slider               | number |  Initially `min` value will be set `0` if not provided  |
| `max`            | Maximum value of slider               | number | Initially `max` value will be set `100` if not provided |
| `startValue`     | Maximum value of slider               | number |  Initially `min` value will be set `0` if not provided  |
| `endValue`       | Maximum value of slider               | number | Initially `max` value will be set `100` if not provided |
| `onValueChanged` | Emit both value object of min and max | MINMAX |        It do not return any value until changes         |
