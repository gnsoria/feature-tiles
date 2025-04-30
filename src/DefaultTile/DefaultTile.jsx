import React from "react";

import "./default_tile.css"
import Media from "../Media"
import { getColorSchemeStyleProps } from "../color_scheme"


export default function DefaultTile({
    header,
    description,
    renderTileText = (text) => <p>{text}</p>,
    // Media args
    mediaType,
    mediaPath,
    mediaVideoPoster,
    mediaAltText,
    mediaLazyLoad,
    // Styling
    className = "",
    style = null,
    colorScheme = {},
    // Modifications to the tile
    useCallout = false,
    textFirst = false,
    isSpecial = false,
    SpecialIcon = null,
    linkHref = null,
    linkText = "Go there now!",
}) {
    let HeaderComponent = typeof header === "string" ? () => <h3>{header}</h3> : header

    const getStyleProps = () => {
        const styleProps = {
            className: `feature-tile ${className}`,
            style: {
                "--tile-text-order": textFirst ? 0 : 1,
                ...getColorSchemeStyleProps(colorScheme),
                ...style
            }
        }
        if (useCallout) {
            styleProps.className = `${styleProps.className} callout-tile`
        }
        return styleProps
    }

    return (
        <section
            role="region"
            aria-label={header}
            {...getStyleProps()}
        >
            {isSpecial && SpecialIcon &&
                <div className="feature-tile-special-icon-wrapper"><SpecialIcon /></div>
            }

            <HeaderComponent />

            <div className="tile-content">
                <Media {...{
                    mediaType,
                    mediaPath,
                    mediaVideoPoster,
                    mediaAltText,
                    mediaLazyLoad
                }} />
                <div className="tile-text" >
                    {renderTileText(description)}
                    {linkHref && <a className="tile-link" href={linkHref}>{linkText}</a>}
                </div>

            </div>
        </section>
    )
}