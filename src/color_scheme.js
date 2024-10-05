

/**
 * Pass in a colorScheme object, get back the styles to apply to an element that uses the scheme.
 * @param {Object} colorScheme 
 * @returns {Object}
 */
export function getColorSchemeStyleProps(colorScheme) {
    return {
        "--media-border-color": colorScheme.mediaBorderColor,
        "--callout-border-color": colorScheme.calloutBorderColor,
        "--callout-text-color": colorScheme.calloutTextColor,
        "--callout-bg-color": colorScheme.calloutBgColor,
    }
}