# Browser Support & Compatibility

`rm-range-slider` aims to support modern web standards and all evergreen browsers.

## Supported Desktop Browsers

| Browser | Support Level | Notes |
| :--- | :--- | :--- |
| **Google Chrome** | Full | Version 80+ recommended. |
| **Mozilla Firefox** | Full | Version 75+ recommended. |
| **Apple Safari** | Full | MacOS 10.15+ (Safari 13+). |
| **Microsoft Edge** | Full | Chromium-based versions (80+). |
| **Opera** | Full | Version 67+ recommended. |

## Mobile Support

The library is fully touch-enabled and optimized for mobile interactions.

*   **iOS Safari:** iOS 13 and newer.
*   **Android Chrome:** version 80 and newer.
*   **Samsung Internet:** Recent versions.
*   **WkWebView:** Fully supported for hybrid apps (Ionic/Capacitor).

> [!NOTE]
> The slider uses modern CSS transforms and Pointer Events. Devices that do not support Pointer Events will fall back to Touch Events.

## Known Limitations

### Not Supported
*   **Internet Explorer:** All versions (including IE 11) are NOT supported.
*   **Legacy Edge:** Versions prior to the Chromium migration (v18 and below).
*   **Opera Mini:** Due to limited JavaScript and transition support.

## Polyfills
If you are targeting browsers at the lower end of our support range, ensure you have the appropriate Angular polyfills for:
*   `ResizeObserver` (used for responsive track scaling)
*   `PointerEvents` (for touch/mouse unified handling)

Most modern Angular projects include these by default in the `polyfills.ts` or as part of the framework's core runtime.
