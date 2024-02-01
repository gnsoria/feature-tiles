import React from "react";

import "./default_tile.css"
import { MEDIA_TYPES } from "../constants";


export default function DefaultTile({
    header,
    description,
    renderTileText = (text) => <p>{text}</p>,
    mediaType = null,
    mediaPath = "",
    mediaVideoPoster = "",
    mediaAltText = "",
    className = "",
    style = null,
    colorScheme = {},
    useCallout = false,
    textFirst = false,
    isSpecial = false,
    SpecialIcon = null,
    linkHref = null,
    linkText = "Go there now!",
}) {
    const getVideoSourceType = (mediaPath) => `video/${mediaPath.split(".")[1]}`

    let HeaderComponent = typeof header === "string" ? () => <h3>{header}</h3> : header

    let MediaComponent;
    if ((mediaType && !mediaPath) || (mediaPath && !mediaType)) {
        throw new Error(`If you want to show media, you need to give both mediaType (${mediaType}) and mediaPath (${mediaPath})`)
    }

    if (mediaType == MEDIA_TYPES.image) {
        MediaComponent = () => <img src={mediaPath} alt={mediaAltText} />
    } else if (mediaType == MEDIA_TYPES.video) {
        MediaComponent = () => (
            // HTML-friendly video types: https://stackoverflow.com/a/5959893/3761310
            <video
                autoPlay
                loop
                // playsInline needed for iOS: https://stackoverflow.com/a/45402661/3761310
                playsInline
                // Tells the browser to download the video
                preload="auto"
                // Shows this until the video loads
                poster={mediaVideoPoster}
                // See notes about the class: https://getbootstrap.com/docs/4.6/utilities/embed/
                className="embed-responsive"
            >
                {typeof (mediaPath) == String
                    ? (
                        <source type={getVideoSourceType(mediaPath)} src={mediaPath} />
                    ) : (
                        <>
                            {mediaPath.map((path) =>
                                <source key={path} type={getVideoSourceType(path)} src={path} />
                            )}
                        </>
                    )}
                <p>Video not supported...</p>
            </video>
        )
    }

    const getStyleProps = () => {
        const styleProps = {
            className: `feature-tile ${className}`,
            style: {
                "--media-border-color": colorScheme.mediaBorderColor,
                ...style
            }
        }
        if (useCallout) {
            styleProps.className = `${styleProps.className} callout-tile`
            styleProps.style = {
                ...styleProps.style,
                "--callout-border-color": colorScheme.calloutBorderColor,
                "--callout-text-color": colorScheme.calloutTextColor,
                "--callout-bg-color": colorScheme.calloutBgColor,
                "--callout-text-order": textFirst ? 0 : 1,
            }
        }
        return styleProps
    }

    console.dir(SpecialIcon)
    return (
        <section
            role="region"
            aria-label={header}
            {...getStyleProps()}
        >
            {isSpecial && SpecialIcon &&
                <div className="feature-tile-premium-icon-wrapper"><SpecialIcon /></div>
            }

            <HeaderComponent />

            <div className="tile-content">
                {MediaComponent &&
                    <div className="tile-media">
                        <MediaComponent />
                    </div>
                }
                <div className="tile-text" >
                    {renderTileText(description)}
                </div>

                {linkHref && <a href={linkHref}>{linkText}</a>}
            </div>
        </section>
    )
}