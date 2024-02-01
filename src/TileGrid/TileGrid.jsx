import React from "react";

import "./tile_grid.css"
import DefaultTile from "../DefaultTile";

export default function TileGrid({
    allTileData,
    className = "",
    colorScheme = {},
    renderTileText,
    SpecialIcon,
}) {
    return (
        <div className={`feature-tile-grid ${className}`} >
            {allTileData.map((tileData, index) =>
                <div key={index} className="feature-tile-wrapper">
                    <DefaultTile
                        colorScheme={colorScheme}
                        renderTileText={renderTileText}
                        SpecialIcon={SpecialIcon}
                        {...tileData}
                    />
                </div>
            )}
        </div>
    )
}