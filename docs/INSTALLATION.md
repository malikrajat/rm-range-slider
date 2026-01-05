# Installation Guide

Getting started with `rm-range-slider` is straightforward. This guide will walk you through the installation process and project setup.

## Prerequisites

Before installing, ensure your project meets the minimum requirements:

*   **Angular:** version 14.0.0 or higher
*   **Node.js:** version 18.x or higher
*   **Angular Material:** version 14.0.0 or higher (required as a peer dependency)

## Step 1: Install the Package

Choose your preferred package manager to install the library core:

```bash
# Using npm
npm install rm-range-slider --save

# Using yarn
yarn add rm-range-slider

# Using pnpm
pnpm add rm-range-slider
```

## Step 2: Install Peer Dependencies

The library relies on Angular Material for certain core UI interactions and styling. If you haven't already added Angular Material to your project, you'll need to do so:

```bash
# Recommended: Using Angular CLI (handles configuration automatically)
ng add @angular/material

# Or manual installation
npm install @angular/material @angular/cdk
```

> [!NOTE]
> Ensure that you have an Angular Material theme included in your `styles.css` or `angular.json`, as the slider inherits colors and spacing from your Material theme.

## Step 3: Register the Component

### For Standalone Components (Recommended)

If you are using Angular's modern standalone architecture, simply import the component directly into your module or component metadata:

```typescript
import { RmRangeSliderComponent } from 'rm-range-slider';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [RmRangeSliderComponent],
  template: `
    <rm-range-slider ...></rm-range-slider>
  `
})
export class MyFeatureComponent {}
```

### For Module-Based Applications

For traditional module-based setups, add `RmRangeSliderComponent` to the `imports` array of your `@NgModule`:

```typescript
import { RmRangeSliderComponent } from 'rm-range-slider';

@NgModule({
  declarations: [...],
  imports: [
    RmRangeSliderComponent,
    // ... other imports
  ],
  exports: [MyComponent]
})
export class MyFeatureModule {}
```

## Next Steps

Now that you've installed the library, check out the [Quick Start Guide](./USAGE.md) to see how to use it in your application.