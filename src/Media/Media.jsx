import React from "react";

import "./media.css"
import { MEDIA_TYPES } from "../constants";
import { getColorSchemeStyleProps } from "../color_scheme";


/**
 * A media component that can be either <img> or <video> based on mediaType.
 * 
 * @param {React.PropsWithoutRef} param0 
 * @returns {React.Component}
 */
export function Media({
    mediaType = null,
    mediaPath = "",
    mediaVideoPoster = "",
    mediaAltText = "",
    mediaLazyLoad = false,
    colorScheme = {},
}) {

    const getVideoSourceType = (mediaPath) => `video/${mediaPath.split(".")[1]}`

    let MediaComponent;
    if (!mediaPath && !mediaType) {
        return;
    }

    if ((mediaType && !mediaPath) || (mediaPath && !mediaType)) {
        throw new Error(`If you want to show media, you need to give both mediaType (${mediaType}) and mediaPath (${mediaPath})`)
    }

    if (mediaType == MEDIA_TYPES.image) {
        MediaComponent = () => (
            <img
                // `loading` first because https://stackoverflow.com/a/76253300/3761310
                loading={mediaLazyLoad ? "lazy" : null}
                src={mediaPath}
                alt={mediaAltText}
            />
        )
    } else if (mediaType == MEDIA_TYPES.video) {
        MediaComponent = () => (
            // HTML-friendly video types: https://stackoverflow.com/a/5959893/3761310
            <video
                autoPlay
                loop
                muted
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
        <div className="tile-media" style={getColorSchemeStyleProps(colorScheme)} >
            <MediaComponent />
        </div>
    )
}