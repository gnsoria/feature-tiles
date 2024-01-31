import React from "react";
import TileGrid from "./TileGrid";
import DefaultTile from "./DefaultTile";
import "./typedefs"

/**
 * @typedef useFeatureTilesHook
 * @property {TileGrid} TileGrid
 * @property {DefaultTile} DefaultTile
 */

/**
 * @typedef ColorScheme
 * @property {string} mediaBorderColor
 * @property {string} calloutBgColor
 * @property {string} calloutBorderColor
 */

/**
 * This hook sets up the tiles to be used with your custom settings.
 * 
 * @param {React.PropsWithoutRef} props
 * @param {ColorScheme} colorScheme
 * @returns {useFeatureTilesHook}
 */
export default function useFeatureTiles({
    colorScheme,
    renderTileText,
}) {

    /**
     * @param {React.PropsWithoutRef} props 
     * @param {typedefs.TileData[]} props.allTileData
     * @returns {TileGrid}
     */
    const CustomizedTileGrid = (props) => <TileGrid
        colorScheme={colorScheme}
        renderTileText={renderTileText}
        {...props}
    />
    const CustomizedDefaultTile = (props) => <DefaultTile
        colorScheme={colorScheme}
        renderTileText={renderTileText}
        {...props}
    />

    return { TileGrid: CustomizedTileGrid, DefaultTile: CustomizedDefaultTile }
}

