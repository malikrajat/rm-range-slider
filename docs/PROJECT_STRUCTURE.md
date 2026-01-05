# Project Structure

This document provides an overview of the repository's layout and the purpose of each directory. This is particularly useful for contributors or developers who want to understand how the library is built and tested.

## Directory Overview

```text
rm-range-slider/
├── projects/              # Source code for the library
│   └── rm-range-slider/   # Main library workspace
│       └── src/           # Library source files (components, services, interfaces)
├── src/                   # Source code for the demo/documentation app
│   └── app/               # Demo application logic
├── docs/                  # In-depth documentation files (where you are)
├── examples/              # Runnable code snippets and use cases
├── dist/                  # Compiled output (created after build)
│   └── rm-range-slider/   # Final npm package structure
├── angular.json           # Angular workspace configuration
├── package.json           # Root dependencies and scripts
├── tsconfig.json          # Main TypeScript configuration
└── README.md              # Main library overview and quick start
```

---

## Detailed Directory Descriptions

### `/projects/rm-range-slider`
This is the heart of the repository. It contains the actual source code that gets published to npm.
*   **`lib/`**: Contains the `RmRangeSliderComponent` logic, styling, and template.
*   **`public-api.ts`**: Defines the exports for the library. Only items exported here will be available to end-users.

### `/src`
Contains the default Angular application used for developing and testing the library locally. It serves as a living playground where new features are validated.

### `/docs`
Central location for organized, topic-specific documentation. This is intended to supplement the root `README.md` with deep dives into specific areas like performance, API reference, and troubleshooting.

### `/examples`
Standalone code samples. Each example is designed to be copy-pasteable and demonstrates a specific integration pattern (e.g., Reactive Forms, Price Filtering).

### `/dist`
This folder is only present after running `npm run build`. It contains the "production-ready" version of the library, formatted according to the Angular Package Format (APF).

---

## Key Files

*   **`angular.json`**: Manages the build targets for both the library and the demo app.
*   **`CHANGELOG.md`**: Provides a detailed history of all changes, versions, and bug fixes.
*   **`LICENSE`**: The MIT license terms for using this library.
