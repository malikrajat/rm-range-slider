<a href="https://github.com/malikrajat/rm-ng-range-slider">
  <h1 align="center">Dual Value Range Selection</h1>
<p align="center">Advanced, customizable, Optimized ,Minimal, light-weight and fully customizable pure angular component for value range selection.</p>
</a>


[![npm](https://img.shields.io/npm/v/ngx-bar-rating.svg)](https://www.npmjs.com/package/rm-ng-range-slider)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malikrajat/rm-ng-range-slider)

___

# Rm Ng Range Slider for Angular

A highly optimized and fully customizable pure angular component for value range selection.

The component is not re-rendered while user moves the thumb.
Even if there is a label, only the label component is re-rendered when values are changed.

RangeSlider uses angular Native's Animated library to transform thumbs / label / selected rail.
These optimizations help to achieve as much native look & feel as possible using only the JS layer.


## Installation

Install rm-ng-range-slider with npm amd yarn

```bash
  npm: npm install rm-ng-range-slider --save 
  yarn: yarn add rm-ng-range-slider
```

## Live DEMO

[See the implementation here](https://stackblitz.com/edit/stackblitz-starters-82qcpd)

## Usage

Dual Range Slider uses angular hooks, so this component doesn't work with angular below below version 2.
In your component where you want to use the Device Service

```typescript
import {RmNgRangeSliderComponent} from "rm-ng-range-slider";

@Component({
  selector: 'app-root',
  imports: [RmNgRangeSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  handleRangeChanged(event: { low: number, high: number }) {
    console.log('Range changed:', event);
  }
}

```

```html

<rm-ng-range-slider
  [min]="0"
  [max]="100"
  [leftColor]="'#3498db'"
  [rightColor]="'#e74c3c'"
  [leftTooltipColor]="'#333'"
  [rightTooltipColor]="'#e74c3c'"
  (rangeChanged)="handleRangeChanged($event)"
></rm-ng-range-slider>
```

### Version Mapping

| Slider | Ng   |
|--------|------|
| 1.0.0  | 18.x |
| 2.0.0  | 19.x |

### Properties

| Name                | Description                           | Type   |                      Default Value                      |
|---------------------|---------------------------------------|--------|:-------------------------------------------------------:|
| `min`               | Minimum value of slider               | number |  Initially `min` value will be set `0` if not provided  |
| `max`               | Maximum value of slider               | number | Initially `max` value will be set `100` if not provided |
| `leftTooltipColor`  | set color for left tooltip            | string |   Initially set default color for tool tip is `#333`    |
| `rightTooltipColor` | set color for right tooltip           | string |  Initially set default color for tool tip is `#e74c3c`  |
| `leftColor`         | Set color for left side slider line   | string |    Initially set default color for tool is `#3498db`    |
| `rightColor`        | Set color for right side slider line  | string |    Initially set default color for tool is `#e74c3c`    |
| `rangeChanged`      | Emit both value object of min and max | object |        It do not return any value until changes         |


<a name="issues"/>

## Issues

If you identify any errors in this component, or have an idea for an improvement, please open
an [issue](https://github.com/malikrajat/rm-ng-device-detection/issues). I am excited to see what the community thinks of this
project, and I would love your input!

## Author services

Are you interested in this library but lacks features? Write to the author, he can do it for you.

<a name="author"/>

## Author

**Rajat Malik**

- [github/malikrajat](https://github.com/malikrajat)
