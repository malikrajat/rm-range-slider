# Frequently Asked Questions (FAQ)

### What is the difference between `rm-range-slider` and `rm-ng-range-slider`?
Both packages provide the identical functionality and codebase. `rm-range-slider` is the original package name, while `rm-ng-range-slider` was created to follow Angular's package naming conventions. You can use either one, but we recommend `rm-range-slider` for the latest updates.

### Is this library production-ready?
Yes. The library has been battle-tested in several enterprise-level applications and follows Angular's best practices for performance and stability.

### Does it support Angular Material themes?
Absolutely. The slider is built to integrate seamlessly with Angular Material and will inherit primary, accent, and warn colors based on your active theme.

### Can I customize the slider colors?
Currently, the slider uses your Angular Material theme. Starting with version 6.0, we've introduced some CSS custom properties for basic color overrides. More advanced styling options are planned for version 8.0. See the [Roadmap](./ROADMAP.md) for details.

### Does it support vertical orientation?
Not yet. Vertical slider support is one of our most requested features and is prioritized for an upcoming minor release in the 7.x or 8.x branch.

### Can I add custom tooltips?
The slider currently displays standard labels. Highly customizable tooltips (with custom HTML/Templates) are on our long-term roadmap.

### Does it work with Server-Side Rendering (SSR)?
Yes, the component is compatible with Angular Universal and SSR. It correctly handles browser-only APIs by checking for the platform platform before accessing global objects like `window` or `document`.

### How many sliders can I have on one page?
There is no hard limit. Due to our optimized rendering strategy, you can have dozens of sliders on a single page without significant performance degradation, provided you use `OnPush` change detection and debounce expensive side effects.

### Does it support touch gestures?
Yes, it is fully touch-enabled. It supports dragging thumbs on mobile devices with smooth responsiveness and high precision.

### Can I use logarithmic scaling?
Logarithmic scaling is supported starting from version 4.0.0. This is useful for ranges that span multiple orders of magnitude (e.g., 10 to 1,000,000).

### How do I contribute a feature?
We love contributions! Please refer to the [Contributing Guide](../README.md#contributing) in the root of the repository for instructions on how to set up the project locally and submit a Pull Request.
