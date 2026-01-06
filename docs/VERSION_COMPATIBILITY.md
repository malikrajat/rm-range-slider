# Version Compatibility

To ensure stability and access to the latest features, we maintain a specific mapping between Angular major versions and `rm-range-slider` package versions.

## Angular & Library Versions

| Angular Version | Supported | Recommended Library Version |
| :--- | :---: | :--- |
| **Angular 21.x** | ✅ | `7.0.0+` |
| **Angular 20.x** | ✅ | `6.0.0` |
| **Angular 19.x** | ✅ | `5.0.0` |
| **Angular 18.x** | ✅ | `4.0.0` |
| **Angular 17.x** | ✅ | `3.0.0` |
| **Angular 16.x** | ✅ | `2.0.0` |
| **Angular 15.x** | ✅ | `1.0.0` |
| **Angular 14.x** | ✅ | `0.0.1` |

## Node.js Requirements

The build process and development dependencies require modern Node.js environments.

*   **v1.0.0 to v3.0.0:** Node.js 16.x+
*   **v4.0.0 to v7.0.0:** Node.js 18.x+

## Semantic Versioning (SemVer)

`rm-range-slider` follows [Semantic Versioning](https://semver.org/):

*   **MAJOR:** Breaking changes that require migration steps. usually coincides with new Angular major versions.
*   **MINOR:** New features, UI enhancements, and new configuration options.
*   **PATCH:** Bug fixes, performance tweaks, and documentation updates.

## Upgrading

When upgrading your Angular project, we recommend checking the [Breaking Changes](./BREAKING_CHANGES.md) log to see if any API adjustments are required for the corresponding `rm-range-slider` version.
