# Peer Dependencies

To keep the library as lightweight as possible and to avoid version conflicts, `rm-range-slider` relies on several peer dependencies that should be provided by your host application.

## Core Requirements

These dependencies are essential for the library to function correctly:

| Package | Version Range | Purpose |
| :--- | :--- | :--- |
| `@angular/core` | `^14.0.0` to `^21.0.0` | Provides the base Angular framework functionality. |
| `@angular/common` | `^14.0.0` to `^21.0.0` | Common Angular directives and pipes. |
| `@angular/material` | `^14.0.0` to `^21.0.0` | Used for core UI interactions, theming, and styling. |
| `rxjs` | `^6.5.0` or `^7.4.0` | Reactive programming support used for event streams. |

## Recommended Dependencies

While not strictly required for the slider to render, these are often used in conjunction with the library:

| Package | Purpose |
| :--- | :--- |
| `@angular/forms` | Required if you plan to integrate the slider with Reactive Forms or Template-driven forms. |
| `@angular/animations` | Required for smooth thumb transitions and visual feedback. |

## Why use Peer Dependencies?

1.  **Bundle Optimization:** Prevents multiple versions of the same library (like Angular core) from being bundled in your final application.
2.  **Compatibility:** Ensures the library uses the same version of UI frameworks that your main application is using.
3.  **Flexibility:** Allows the host application to decide when to upgrade major versions of core dependencies.

## Version Conflicts

If you encounter `npm install` warnings about mismatched peer dependencies, ensure that your project's version of Angular and Angular Material fall within the supported ranges (v14 - v21).

If you are upgrading an existing project to a new major version of Angular, please refer to our [Migration Guide](./BREAKING_CHANGES.md) for version-specific instructions.
