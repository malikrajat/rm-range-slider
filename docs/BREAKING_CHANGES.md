# Breaking Changes & Migration Guide

This document summarizes significant changes between major versions and provides instructions on how to upgrade your application.

## Version 7.0.0 (Angular 21)

### Major Changes
*   **Angular 21 Requirement:** The library now targets Angular 21. Minimum supported version is now `@angular/core@21.0.0`.
*   **Standalone Architecture:** The component is now exported as a standalone component.

### Migration Steps
1.  **Update Peer Dependencies:**
    Ensure your host application is running Angular 21.
    ```bash
    ng update @angular/core@21 @angular/cli@21
    ```
2.  **Import Strategy:**
    If you were using a module-based approach, you can still import `RmRangeSliderComponent` into your `NgModule`, but it is recommended to use it as a standalone component in your component metadata.

---

## Version 6.0.0 (Angular 20)

### Major Changes
*   **Angular 20 Requirement:** Dropped support for Angular versions below 20.
*   **New Control Flow:** Switched to Angular's `@if` and `@for` syntax internally.
*   **Dependency Injection:** Migrated to the `inject()` function.

### Migration Steps
1.  **Peer Dependencies:** Upgrade project to Angular 20.
2.  **Injection context:** If you were overriding internal services (uncommon), ensure they are compatible with the `inject()` pattern.

---

## Version 2.0.0 (Property Renames)

### Major Changes
To better align with standard HTML slider attributes and Angular Material conventions, several input properties were renamed.

| Old Property (v1.x) | New Property (v2.x+) |
| :--- | :--- |
| `minValue` | `min` |
| `maxValue` | `max` |
| `currentValue` | `value` (for single-thumb mode) |
| `startValue` | `startValue` (remains same) |

### Migration Steps
Update your templates to use the new property names:

```html
<!-- Before (1.x) -->
<rm-range-slider [minValue]="0" [maxValue]="500">

<!-- After (2.x+) -->
<rm-range-slider [min]="0" [max]="500">
```

---

## Evolution Summary

| Version | Main Theme | Breaking? |
| :--- | :--- | :---: |
| **7.x** | Angular 21 & Accessibility | Yes |
| **6.x** | Angular 20 & Control Flow | Yes |
| **5.x** | Angular 19 & Custom Steps | Yes |
| **4.x** | Angular 18 & Logarithmic Scale | Yes |
| **3.x** | Angular 17 & Dual-Handle Mode | Yes |
| **2.x** | API Normalization | Yes |
| **1.x** | Initial Release | No |

---

## Need Support?
If you encounter issues during an upgrade that aren't covered here, please refer to the [Troubleshooting Guide](./TROUBLESHOOTING.md) or open a [GitHub Issue](https://github.com/malikrajat/rm-range-slider/issues).
