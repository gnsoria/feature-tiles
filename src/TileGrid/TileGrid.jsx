import React from "react";

import "./tile_grid.css"
import DefaultTile from "../DefaultTile";

export default function TileGrid({ allTileData, colorScheme = {}, renderTileText }) {

    const getTileProps = (tileData) => {
        if (tileData.useCallout) {
            return {
                ...tileData,
                className: "callout-tile",
                style: {
                    "--callout-border-color": colorScheme.calloutBorderColor || null,
                    "--callout-bg-color": colorScheme.calloutBgColor || null,
                    "--callout-text-order": tileData.textFirst ? 0 : 1,
                }
            }
        }
        return tileData
    }

    return (
        <div className="feature-tile-grid" >
            {allTileData.map((tileData, index) =>
                <div key={index} className="feature-tile-wrapper">
                    <DefaultTile
                        {...getTileProps(tileData)}
                        colorScheme={colorScheme}
                        renderTileText={renderTileText}
                    />
                </div>
            )}
        </div>
    )
}