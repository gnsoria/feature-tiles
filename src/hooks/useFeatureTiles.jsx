import React from "react";
import TileGrid from "../TileGrid";
import DefaultTile from "../DefaultTile";
import "../typedefs"

/**
 * @typedef useFeatureTilesHook
 * @property {TileGrid} TileGrid
 * @property {DefaultTile} DefaultTile
 */

/**
 * @typedef ColorScheme
 * @property {string} mediaBorderColor
 * @property {string} calloutTextColor
 * @property {string} calloutBgColor
 * @property {string} calloutBorderColor
 */

/**
 * This hook sets up the tiles to be used with your custom settings.
 * 
 * @param {React.PropsWithoutRef} props
 * @param {ColorScheme} colorScheme
 * @param {React.Component} renderTileText
 * @param {React.Component} SpecialIcon
 * @returns {useFeatureTilesHook}
 */
export default function useFeatureTiles({
    colorScheme,
    renderTileText,
    SpecialIcon,
}) {

    /**
     * @param {React.PropsWithoutRef} props 
     * @param {typedefs.TileData[]} props.allTileData
     * @returns {TileGrid}
     */
    const CustomizedTileGrid = (props) => <TileGrid
        colorScheme={colorScheme}
        renderTileText={renderTileText}
        SpecialIcon={SpecialIcon}
        {...props}
    />
    const CustomizedDefaultTile = (props) => <DefaultTile
        colorScheme={colorScheme}
        renderTileText={renderTileText}
        SpecialIcon={SpecialIcon}
        {...props}
    />

    return { TileGrid: CustomizedTileGrid, DefaultTile: CustomizedDefaultTile }
}

