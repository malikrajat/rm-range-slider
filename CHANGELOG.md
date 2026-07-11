# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [9.0.0] - 2026-07-11

### Added
- **Angular 22 Support**: Full compatibility with Angular 22
- Enhanced signal-based state management for improved reactivity
- New configuration options for enhanced customization

### Changed
- **BREAKING**: Updated peer dependencies to Angular 22
- Migrated to the new Angular 22 build system and application builder
- Updated build process to use Angular CLI 22

### Fixed
- Resolved issues with signal inputs and model inputs
- Improved handling of edge cases with min/max boundaries

### Performance
- Further reduced bundle size through optimization
- Improved rendering performance with Angular 22 deferrable views

### Documentation
- Updated README with Angular 22 migration guide
- Added more comprehensive API documentation

---

## [8.0.0] - 2024-12-26

### Added
- **Angular 21 Support**: Full compatibility with Angular 21
- Enhanced TypeScript strict mode compliance
- Improved accessibility features with better ARIA label support
- New configuration options for enhanced customization

### Changed
- **BREAKING**: Updated peer dependencies to Angular 21
- Migrated to standalone components architecture
- Optimized change detection strategy for better performance
- Refined touch event handling for mobile devices
- Updated build process to use Angular CLI 21

### Fixed
- Resolved memory leaks in event listener cleanup
- Fixed slider value synchronization issues in reactive forms
- Corrected visual glitches during rapid value changes
- Improved handling of edge cases with min/max boundaries

### Performance
- Reduced bundle size by ~15% through optimization
- Improved rendering performance with OnPush change detection
- Optimized event throttling for smoother interactions
- Enhanced initial load time

### Documentation
- Updated README with Angular 21 migration guide
- Added more comprehensive API documentation
- Included additional usage examples and best practices

---

## [7.0.0] - 2024-05-15

### Added
- **Angular 20 Support**: Full compatibility with Angular 20
- New theme customization options via CSS custom properties
- Support for RTL (Right-to-Left) layouts
- Added keyboard navigation improvements

### Changed
- **BREAKING**: Dropped support for Angular versions below 20
- Migrated to inject() function for dependency injection
- Updated to use new Angular control flow syntax (@if, @for)
- Improved reactive forms integration

### Fixed
- Fixed double value binding in template-driven forms
- Resolved issues with dynamic min/max value updates
- Corrected touch event handling on iOS devices

### Performance
- Optimized DOM manipulation for better performance
- Reduced unnecessary change detection cycles

---

## [5.0.0] - 2023-11-20

### Added
- **Angular 19 Support**: Full compatibility with Angular 19
- New `rangeChanged` event emitter for better event handling
- Support for custom step increments
- Added visual feedback for disabled state

### Changed
- **BREAKING**: Minimum Angular version is now 19
- Modernized component architecture
- Enhanced type safety with stricter TypeScript configuration
- Improved error messages and validation feedback

### Fixed
- Fixed slider thumb positioning on Firefox
- Resolved z-index issues with overlapping elements
- Corrected value rounding errors with decimal steps

### Deprecated
- Legacy API methods marked for removal in future versions

---

## [4.0.0] - 2023-05-10

### Added
- **Angular 18 Support**: Full compatibility with Angular 18
- New `valueFormat` option for custom value display
- Support for logarithmic scale
- Added animation configuration options

### Changed
- **BREAKING**: Updated minimum Node.js version to 18.x
- Refactored internal state management
- Improved component modularity
- Enhanced testing coverage

### Fixed
- Fixed slider initialization with null values
- Resolved issues with percentage calculations
- Corrected behavior when min and max values are equal

### Performance
- Optimized event listener registration
- Reduced component re-renders

---

## [3.0.0] - 2022-11-15

### Added
- **Angular 17 Support**: Full compatibility with Angular 17
- New dual-handle range slider mode
- Support for custom tick marks
- Added snap-to-step functionality
- New `disabled` input property

### Changed
- **BREAKING**: Restructured component API for better consistency
- Improved CSS architecture with BEM methodology
- Enhanced touch gesture support
- Updated documentation and examples

### Fixed
- Fixed value update race conditions
- Resolved slider handle overlap issues
- Corrected slider width calculation on resize

### Performance
- Implemented efficient resize observer
- Optimized render cycle

---

## [2.0.0] - 2022-05-20

### Added
- **Angular 16 Support**: Full compatibility with Angular 16
- New configuration options for appearance customization
- Support for vertical slider orientation
- Added tooltip display option
- New `onChange` callback function

### Changed
- **BREAKING**: Renamed several input properties for better clarity
  - `minValue` → `min`
  - `maxValue` → `max`
  - `currentValue` → `value`
- Improved reactive forms compatibility
- Enhanced mobile touch responsiveness
- Updated component styling structure

### Fixed
- Fixed value binding in ngModel
- Resolved slider positioning issues in flex containers
- Corrected initial value setting bug

### Performance
- Improved change detection efficiency
- Optimized style recalculation

---

## [1.0.0] - 2021-12-01

### Added
- Initial release of rm-range-slider
- **Angular 15 Support**: Compatible with Angular 15
- Basic range slider functionality
- Support for min, max, and step values
- Two-way data binding with ngModel
- Reactive forms integration (FormControl support)
- Basic styling and theming
- Touch and mouse event support
- Value change event emission
- Configurable slider appearance
- Comprehensive documentation and examples

### Features
- Clean, modern UI design
- Responsive and mobile-friendly
- Easy integration with Angular forms
- Customizable through CSS
- Accessibility support with ARIA attributes
- Cross-browser compatibility

---

## Migration Guides

### Migrating to 9.0.0 from 8.x
```bash
# Update Angular to version 22
ng update @angular/core@22 @angular/cli@22

# Update rm-range-slider
npm install rm-range-slider@9.0.0
```

**Breaking Changes:**
- Angular 22 is now required
- Ensure your project uses the Angular 22 application builder

### Migrating to 7.0.0 from 6.x
```bash
# Update Angular to version 21
ng update @angular/core@21 @angular/cli@21

# Update rm-range-slider
npm install rm-range-slider@7.0.0
```

**Breaking Changes:**
- Angular 21 is now required
- Ensure your project uses standalone components or proper module imports

### Migrating to 2.0.0 from 1.x
**Property Renames:**
```typescript
// Before (1.x)
<rm-range-slider [minValue]="0" [maxValue]="100" [currentValue]="50">

// After (2.x+)
<rm-range-slider [min]="0" [max]="100" [value]="50">
```

---

## Support

For issues, questions, or contributions, please visit:
- GitHub: https://github.com/malikrajat/rm-range-slider
- NPM: https://www.npmjs.com/package/rm-range-slider

---

## License

This project is licensed under the MIT License.