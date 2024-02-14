import React from "react";

import "./tile_grid.css"
import DefaultTile from "../DefaultTile";

export default function TileGrid({
    allTileData,
    className = "",
    colorScheme = {},
    renderTileText,
    SpecialIcon,
    mediaLazyLoad,
}) {

    const getWrapperClass = (tileData) => {
        let tileWrapperClass = "feature-tile-wrapper"
        if (tileData.useDoubleWide) {
            tileWrapperClass = `${tileWrapperClass} double-wide-tile`
        } else if (tileData.useDoubleTall) {
            tileWrapperClass = `${tileWrapperClass} double-tall-tile`
        } else if (tileData.useShowcase) {
            tileWrapperClass = `${tileWrapperClass} showcase-tile`
        }
        return tileWrapperClass
    }


    return (
        <div className={`feature-tile-grid ${className}`} >
            {allTileData.map((tileData, index) =>
                <div key={index} className={getWrapperClass(tileData)} >
                    <DefaultTile
                        colorScheme={colorScheme}
                        renderTileText={renderTileText}
                        SpecialIcon={SpecialIcon}
                        mediaLazyLoad={mediaLazyLoad}
                        {...tileData}
                    />
                </div>
            )}
        </div>
    )
}