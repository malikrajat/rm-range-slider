# rm-range-slider

<p align="left">
  <img src="https://img.shields.io/npm/v/rm-range-slider.svg" alt="npm version">
  <img src="https://img.shields.io/badge/Stability-production--ready-success" alt="Production ready">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
  <img src="https://img.shields.io/badge/Angular-14%20to%2021-blue" alt="Angular support range">
  <img src="https://img.shields.io/badge/Ivy-compatible-blue" alt="Ivy compatible">
  <img src="https://img.shields.io/badge/Standalone-supported-success" alt="Standalone API">
  <img src="https://img.shields.io/badge/AOT-compatible-blue" alt="AOT compatible">
  <img src="https://img.shields.io/badge/SSR-compatible-success" alt="SSR compatible">
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="Strict TS">
  <img src="https://img.shields.io/badge/tree--shaking-supported-success" alt="Tree-shakable">
  <img src="https://img.shields.io/badge/Side%20Effects-none-blue" alt="No side effects">
  <img src="https://img.shields.io/badge/Linting-enabled-success" alt="Linting">
  <img src="https://img.shields.io/badge/Tests-covered-blue" alt="Tests">
  <img src="https://img.shields.io/badge/Coverage-90%25-success" alt="Coverage">
  <img src="https://img.shields.io/badge/A11y-WCAG%202.1-success" alt="Accessibility compliant">
  <img src="https://img.shields.io/badge/API-documented-blue" alt="API docs">
  <img src="https://img.shields.io/badge/Examples-available-success" alt="Examples">
  <!-- <img src="https://img.shields.io/bundlephobia/minzip/rm-range-slider" alt="minzipped size"> -->
  <img src="https://img.shields.io/badge/Dependencies-none-success" alt="No dependencies">
  <!-- <img src="https://img.shields.io/npm/dw/rm-range-slider" alt="weekly downloads"> -->
  <img src="https://img.shields.io/npm/dt/rm-range-slider" alt="total downloads">
  <img src="https://img.shields.io/npm/last-update/rm-range-slider" alt="Last update">
  <img src="https://img.shields.io/badge/Maintained-yes-success" alt="Maintained">
  <img src="https://img.shields.io/badge/SemVer-compliant-blue" alt="SemVer">
  <img src="https://img.shields.io/github/issues/malikrajat/rm-range-slider" alt="Open issues">
  <img src="https://img.shields.io/github/stars/malikrajat/rm-range-slider" alt="GitHub stars">
</p>

## See It In Action

<div align="center">

  <img src="https://github.com/malikrajat/rm-range-slider/blob/main/assets/demo.gif" alt="rm-range-slider Demo" width="800"/>

</div>

---

<p align="center">
A lightweight, highly optimized, and fully customizable pure Angular component for dual-range value selection. Built with performance in mind, using Angular's native animations to deliver smooth, native-like interactions.
</p>

---

## Table of Contents

- [Why This Library](./docs/WHY_THIS_LIBRARY.md)
- [Installation](./docs/INSTALLATION.md)
- [Quick Start / Usage](./docs/USAGE.md)
- [API Reference](./docs/API.md)
- [Advanced Configuration](./docs/ADVANCED_CONFIGURATION.md)
- [Peer Dependencies](./docs/PEER_DEPENDENCIES.md)
- [Best Practices](./docs/BEST_PRACTICES.md)
- [Performance Optimization](./docs/OPTIMIZATION.md)
- [Browser Support](./docs/BROWSER_SUPPORT.md)
- [Versioning & Angular Compatibility](./docs/VERSION_COMPATIBILITY.md)
- [Breaking Changes](./docs/BREAKING_CHANGES.md)
- [FAQ](./docs/FAQ.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Roadmap](./docs/ROADMAP.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
- [Examples](./examples/README.md)
- [Usage Examples](./docs/USAGE.md)


## Features

- **Dual Range Selection** - Two draggable thumbs for selecting minimum and maximum values
- **High Performance** - Component doesn't re-render while dragging thumbs, only labels update
- **Native-Like Experience** - Uses Angular's Animated library for smooth transformations
- **Fully Customizable** - Customize colors, sizes, and appearance to match your design
- **Type-Safe** - Full TypeScript support with comprehensive type definitions
- **Material Design Integration** - Seamlessly integrates with Angular Material
- **Tree-Shakable** - Optimized for modern build tools to minimize bundle size
- **Angular 14+ Support** - Compatible with modern Angular versions including standalone components
- **Zero Configuration** - Works out of the box with sensible defaults
- **Lightweight** - Minimal footprint with optimal performance
- **Production Ready** - Battle-tested in real-world applications


## Live Examples

Explore our comprehensive set of live examples to see the slider in action and learn how to implement various features:

| Example | Description | Link |
|---------|-------------|------|
| **Basic Usage** | Product price filter implementation | [View Example](./examples/basic-usage) |
| **Date Range** | Selecting dates with numeric slider | [View Example](./examples/advanced-configuration) |
| **UX & Theming** | Age range Selection with custom styles | [View Example](./examples/ux-best-practices) |
| **Performance** | Debounced search with large datasets | [View Example](./examples/performance-optimization) |
| **Reactive Forms**| Integration with Angular Reactive Forms | [View Example](./examples/reactive-forms) |
| **Validation** | Logic-based constraints and gap control | [View Example](./examples/error-handling) |




## Quick Start

Here's a minimal example to get you started:

```typescript
import { Component } from '@angular/core';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [RmRangeSliderComponent],
  template: `
    <div class="slider-container">
      <h2>Select Price Range</h2>
      <rm-range-slider
        [min]="0"
        [max]="1000"
        [startValue]="100"
        [endValue]="500"
        (onValueChanged)="onValueChanged($event)"
      ></rm-range-slider>
      <p>Selected Range: ${{currentRange.min}} - ${{currentRange.max}}</p>
    </div>
  `,
  styles: [`
    .slider-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  `]
})
export class ExampleComponent {
  currentRange: MINMAX = { min: 100, max: 500 };

  onValueChanged(range: MINMAX): void {
    this.currentRange = range;
    console.log('Range changed:', range);
  }
}
```


## Live Demo & Playground

#### Try it yourself! Interactive demos available now:

<div align="center">

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://stackblitz.com/edit/stackblitz-starters-ne1ykg6y" target="_blank">
        <img src="https://img.shields.io/badge/StackBlitz_Demo-1976D2?style=for-the-badge&logo=stackblitz&logoColor=white" alt="StackBlitz Demo"/>
      </a>
      <br/><br/>
      <sub><b>Interactive Playground</b></sub><br/>
      <sub>Try all features live in your browser</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-range-slider/tree/main/examples" target="_blank">
        <img src="https://img.shields.io/badge/Code_Examples-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Examples"/>
      </a>
      <br/><br/>
      <sub><b>Complete Examples</b></sub><br/>
      <sub>Copy-paste ready code samples</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://www.npmjs.com/package/rm-range-slider/" target="_blank">
        <img src="https://img.shields.io/badge/npm_Package-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm Package"/>
      </a>
      <br/><br/>
      <sub><b>npm Registry</b></sub><br/>
      <sub>Install and view package details</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-range-slider" target="_blank">
        <img src="https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository"/>
      </a>
      <br/><br/>
      <sub><b>Source Code</b></sub><br/>
      <sub>Star, fork, and contribute</sub>
    </td>
  </tr>
</table>

</div>


## Installation & Setup

For detailed installation instructions, see our [Installation Guide](./docs/INSTALLATION.md).

## Usage

For comprehensive usage examples and API documentation, see our [Usage Guide](./docs/USAGE.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## Support This Project

If **rm-range-slider** has helped you build better Angular applications, please consider:

### Star This Repository

A star helps other developers discover this library!

[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-range-slider?style=social)](https://github.com/malikrajat/rm-range-slider/stargazers)

### Why Your Star Matters

- Increases visibility in the Angular community
- Supports ongoing development and maintenance
- Encourages more open-source contributions
- Helps other developers find quality tools


## Statistics

[![npm downloads](https://img.shields.io/npm/dt/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider)
[![npm version](https://img.shields.io/npm/v/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider)
[![GitHub issues](https://img.shields.io/github/issues/malikrajat/rm-range-slider.svg)](https://github.com/malikrajat/rm-range-slider/issues)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-range-slider.svg?style=social)](https://github.com/malikrajat/rm-range-slider/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malikrajat/rm-range-slider/blob/main/LICENSE)


## Acknowledgments

This library wouldn't be possible without these amazing open-source projects:

- **[Angular Team](https://angular.io/)** - Amazing framework and ecosystem
- **[Angular Material](https://material.angular.io/)** - Material Design components
- **Contributors** - Thank you for making this library better

Special thanks to the Angular community for feedback and support!


## Support and Community

### Getting Help

Need assistance? We're here to help!

| Support Channel | Link | Best For |
|----------------|------|----------|
| Bug Reports | [Report Bug](https://github.com/malikrajat/rm-range-slider/issues/new?template=bug_report.md) | Technical issues |
| Feature Requests | [Request Feature](https://github.com/malikrajat/rm-range-slider/issues/new?template=feature_request.md) | New features |
| Discussions | [Join Discussion](https://github.com/malikrajat/rm-range-slider/discussions) | General questions |
| Email | [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com?subject=rm-range-slider%20Support) | Direct support |

### Documentation

- [GitHub Repository](https://github.com/malikrajat/rm-range-slider)
- [npm Package](https://www.npmjs.com/package/rm-range-slider)
- [Changelog](https://github.com/malikrajat/rm-range-slider/blob/main/CHANGELOG.md)

### Community

- Star the repository to show support
- Watch for updates and new releases
- Share your use cases and feedback
- Contribute code or documentation

### Stay Updated

- Follow the project on [GitHub](https://github.com/malikrajat/rm-range-slider)
- Star the repository for updates
- Watch for new releases

## Other Libraries

### UI Components

| Library                | Description                                                              | npm Link                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **rm-range-slider**    | Lightweight two-thumb range slider with tooltips and color customization | [![npm](https://img.shields.io/npm/v/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider)       |
| **rm-ng-range-slider** | Angular-specific version of the dual range slider                        | [![npm](https://img.shields.io/npm/v/rm-ng-range-slider.svg)](https://www.npmjs.com/package/rm-ng-range-slider) |
| **rm-carousel**        | Simple, responsive carousel component                                    | [![npm](https://img.shields.io/npm/v/rm-carousel.svg)](https://www.npmjs.com/package/rm-carousel)               |
| **rm-image-slider**    | Minimal image slider with smooth transitions                             | [![npm](https://img.shields.io/npm/v/rm-image-slider.svg)](https://www.npmjs.com/package/rm-image-slider)       |
| **rm-ng-star-rating**  | Configurable Angular star rating component with readonly mode            | [![npm](https://img.shields.io/npm/v/rm-ng-star-rating.svg)](https://www.npmjs.com/package/rm-ng-star-rating)   |

---

### PDF & Export Libraries

| Library                                | Description                                                  | npm Link                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-export-to-csv**                | Export JSON data to CSV with zero dependencies               | [![npm](https://img.shields.io/npm/v/rm-ng-export-to-csv.svg)](https://www.npmjs.com/package/rm-ng-export-to-csv)                               |
| **@codewithrajat/rm-ng-pdf-export**    | Image-based PDF export tool for Angular applications         | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)       |
| **@codewithrajat/rm-ng-structure-pdf** | Generate structured PDFs for reports, invoices, or documents | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-structure-pdf.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-structure-pdf) |

---

### Utility Libraries

| Library                        | Description                                             | npm Link                                                                                                                        |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-device-detection**     | Detect device type, OS, and browser in Angular          | [![npm](https://img.shields.io/npm/v/rm-ng-device-detection.svg)](https://www.npmjs.com/package/rm-ng-device-detection)         |
| **rm-colorful-console-logger** | Stylish multi-color console logger for better debugging | [![npm](https://img.shields.io/npm/v/rm-colorful-console-logger.svg)](https://www.npmjs.com/package/rm-colorful-console-logger) |

---

### Notifications

| Library           | Description                                       | npm Link                                                                                              |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **rm-pushnotify** | Lightweight push-style toast notification utility | [![npm](https://img.shields.io/npm/v/rm-pushnotify.svg)](https://www.npmjs.com/package/rm-pushnotify) |

---

### Meta & Personal Branding

| Library         | Description                                                      | npm Link                                                                                          |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **about-rajat** | Developer portfolio package for branding and quick personal info | [![npm](https://img.shields.io/npm/v/about-rajat.svg)](https://www.npmjs.com/package/about-rajat) |



### All Packages

Browse all my packages:
- [npm: @codewithrajat](https://www.npmjs.com/~codewithrajat)
- [npm: rajatmalik](https://www.npmjs.com/~rajatmalik)
- [GitHub: @malikrajat](https://github.com/malikrajat?tab=repositories)

## Author

**Rajat Malik**

Full-stack developer passionate about creating developer-friendly tools and libraries.

- Website: [rajatmalik.dev](https://rajatmalik.dev)
- Email: [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- LinkedIn: [errajatmalik](https://linkedin.com/in/errajatmalik)
- GitHub: [@malikrajat](https://github.com/malikrajat)
- npm: [@codewithrajat](https://www.npmjs.com/~codewithrajat)
- npm Other: [rajatmalik](https://www.npmjs.com/~rajatmalik)

---


<p align="center">
  <b>Built with care for the Angular community</b>
</p>

<p align="center">
  <a href="https://github.com/malikrajat/rm-range-slider/stargazers">Star on GitHub</a> •
  <a href="https://www.npmjs.com/package/rm-range-slider">View on npm</a> •
  <a href="https://github.com/malikrajat/rm-range-slider/issues">Report Issue</a>
</p>

<p align="center">
  Made with dedication by <a href="https://rajatmalik.dev">Rajat Malik</a>
</p>
