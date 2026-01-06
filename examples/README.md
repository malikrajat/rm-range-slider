# rm-range-slider Code Examples

Welcome to the examples directory! Here you will find functional, copy-paste ready Angular components demonstrating various features and best practices for the `rm-range-slider` library.

These examples are designed to solve real-world problems and help you integrate the slider into your application seamlessly.

## Available Examples

### 1. [Basic Usage: Price Filter](./basic-usage)
The simplest way to get started. A clean implementation of a product price range filter.
- **Problem Solved**: Filtering a list of items based on a numeric range.
- **Key Concepts**: Basic Inputs, Outputs (`onValueChanged`), and Standalone components.

### 2. [Advanced: Date Range Selection](./advanced-configuration)
Learn how to use the numeric slider to select dates.
- **Problem Solved**: Selecting a date window (e.g., from 30 days ago to today).
- **Key Concepts**: Data mapping, dynamic labels, and computed properties.

### 3. [UX & Theming: Age range Selection](./ux-best-practices)
Focus on aesthetics and accessibility.
- **Problem Solved**: Providing a premium-feel slider for user profile details.
- **Key Concepts**: Custom styling, ARIA labels, and visual feedback.

### 4. [Performance: Debounced Search](./performance-optimization)
Essential for applications with large datasets or API-driven results.
- **Problem Solved**: Preventing excessive API calls or heavy computations during drags.
- **Key Concepts**: RxJS `debounceTime`, `Subject` integration, and efficient state updates.

### 5. [Forms: Reactive Integration](./reactive-forms) [NEW]
Professional-grade integration with Angular Reactive Forms.
- **Problem Solved**: Incorporating the slider into a larger form with validation.
- **Key Concepts**: `FormBuilder`, `patchValue`, and form synchronization patterns.

### 6. [Logic: Validation & Constraints](./error-handling)
Building robust sliders with business rules.
- **Problem Solved**: Enforcing a minimum gap between handles or restricting ranges.
- **Key Concepts**: Logic-based validation and user feedback.

---

## How to use these examples

1.  **Browse**: Navigate to any directory to view the code and its dedicated `README.md`.
2.  **Copy**: Each directory contains a `.ts` file that you can copy directly into your project.
3.  **Reference**: Ensure you have installed [Angular Material](https://material.angular.io/) as it is a peer dependency.

---

## Prerequisites
- Angular 14+ (Examples use 18+ syntax for modernity)
- Angular Material
- TypeScript 5.0+