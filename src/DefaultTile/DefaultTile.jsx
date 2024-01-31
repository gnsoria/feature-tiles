import React from "react";

import "./default_tile.css"
import { MEDIA_TYPES } from "../constants";


export default function DefaultTile({
    header,
    description,
    mediaType = null,
    mediaPath = "",
    mediaVideoPoster = "",
    mediaAltText = "",
    className = "",
    style = null,
    colorScheme = {},
    renderTileText = (text) => <p>{text}</p>,
}) {
    const getVideoSourceType = (mediaPath) => `video/${mediaPath.split(".")[1]}`

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

    return (
        <section
            role="region"
            aria-label={header}
            className={`feature-tile ${className}`}
            style={{ ...style, "--media-border-color": colorScheme.mediaBorderColor }}
        >
            <h3>{header}</h3>
            <div className="tile-content">
                {MediaComponent &&
                    <div className="tile-media">
                        <MediaComponent />
                    </div>
                }
                <div className="tile-text" >
                    {renderTileText(description)}
                </div>
            </div>
        </section>
    )
}