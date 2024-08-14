# Range-slider

A highly optimized and fully customizable pure angular component for value range selection.

The component is not re-rendered while user moves the thumb.
Even if there is a label, only the label component is re-rendered when values are changed.

RangeSlider uses angular Native's Animated library to transform thumbs / label / selected rail.
These optimizations help to achieve as much native look & feel as possible using only the JS layer.

## Installation

Install rm-range-slider with npm or yarn

```bash
  npm: npm install --save rm-range-slider
  yarn: yarn add rm-range-slider
              AND
  npm: ng add @angular/material
  yarn: yarn add @angular/material
```

## Usage

Dual Range Slider uses angular hooks, so this component doesn't work with angular below below version 2.

```

 <rm-range-slider
    min="0"
    max="100"
    startValue="0"
    endValue="10"
    (onValueChanged)="onValueChanged($event)"
    ></rm-range-slider>

```

1. Add `RmRangeSliderComponent` to imports array of component decorater meta
2. Define Function onValueChanged `onValueChanged` in component like this

```
import {RmRangeSliderModule} from "rm-range-slider";

@Component({
  imports: [RmRangeSliderComponent],
})
  public onValueChanged(currentAmount: MINMAX): void {
    console.log(currentAmount);
  }

```

### Version Mapping

| Slider | Ng   |
|--------|------|
| 0.0.1  | 14.x |
| 1.0.0  | 15.x |
| 2.0.0  | 16.x |
| 3.0.0  | 17.x |
| 4.0.0  | 18.x |

### Properties

| Name             | Description                                                                      | Type   |                        Default Value                         |
|------------------|----------------------------------------------------------------------------------|--------|:------------------------------------------------------------:|
| `min`            | Minimum value of slider                                                          | number |    Initially `min` value will be set `0` if not provided     |
| `max`            | Maximum value of slider                                                          | number |   Initially `max` value will be set `100` if not provided    |
| `startValue`     | deafult value for first slider                                                   | number | Initially `startValue` value will be set `0` if not provided |
| `endValue`       | deafult value for second slider                                                  | number | Initially `endValue` value will be set `10` if not provided  |
| `onValueChanged` | On change function `onValueChanged` will send both value min and max to compoent | MINMAX |           It do not return any value until changes           |

## Author services

Are you interested in this library but lacks features? Write to the author, he can do it for you.

## Roadmap

`rangeColor` - Set color for slider line between both min and max slider's thumnail.
`sliderColor` - Set color for slider line.
`sliderColorRight` - Set color for right side slider line
