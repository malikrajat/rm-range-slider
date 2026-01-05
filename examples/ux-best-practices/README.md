# UX & Accessibility: Age Range Selection

This example focuses on creating a premium user experience while ensuring your application remains accessible to everyone.

## Best Practices Shown

1.  **Visual Prominence**: The current selected values are displayed prominently in high-contrast badges, reducing cognitive load.
2.  **Screen Reader Support**:
    - Use of `sr-only` class for labels that are visually redundant but necessary for assistive tech.
    - Application of `aria-labelledby` to link the slider to its description.
    - `aria-live="polite"` on the value display to announce changes to screen readers.
3.  **Instructional Context**: Providing brief instructions on how to interact with the component.

## Implementation Details

The styling is designed to be clean and modern, using a card-based layout that isolates the slider from the rest of the page content.

---

### Key Takeaway
A slider is only as good as its labels. Ensure users always know exactly what values they are selecting, and use ARIA attributes to tell that same story to non-visual users.
