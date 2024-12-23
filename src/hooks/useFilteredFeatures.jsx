import React, { useMemo, useState } from "react";

const SPECIALTY_TYPES = {
    all: "All",
    regular: "Regular",
    special: "Special"
}


export default function useFilteredFeatures(features) {
    const [filterByText, setFilterByText] = useState("");
    const [filterBySpecialty, setFilterBySpecialty] = useState(SPECIALTY_TYPES.all);

    /**
     * This simply updates the hook state, which triggers a refresh of filteredFeatures
     * @param {object} props
     * @property {string} query
     * @property {string} specialty Must be SPECIALTY_TYPES value
     */
    function filter({ query, specialty }) {

        let _specialty = specialty
        if (!Object.values(SPECIALTY_TYPES).includes(specialty)) {
            _specialty = SPECIALTY_TYPES.all
        }
        setFilterByText(query)
        setFilterBySpecialty(_specialty)
    }


    /**
     * A simple wrapper to check whether the text string includes the filterByText, after
     * lowercasing both
     * @param {string} text
     * @returns {boolean}
     */
    function includesLC(text) {
        return (
            !!text
            && !!text.toLowerCase
            && text.toLowerCase().includes(filterByText.toLowerCase())
        )
    }

    /**
     * Given an array of tile data, filter out tiles that don't either match the filterByText or
     * the access level setting.
     * @param {Object[]} tileData 
     * @returns {Object[]}
     */
    function getFilteredTiles(tileData) {
        if (!filterByText && filterBySpecialty == SPECIALTY_TYPES.all) {
            return tileData
        }
        let tiles = {}
        for (const [name, data] of Object.entries(tileData)) {
            if (!!filterByText) {
                const includesQuery = includesLC(data.header) || includesLC(data.description)
                if (includesQuery) {
                    tiles[name] = data
                }
            }

            if (!!filterBySpecialty && filterBySpecialty != SPECIALTY_TYPES.all) {
                const includeIsSpecial = filterBySpecialty == filterBySpecialty.special
                const tileMatchesSpecialty = data.isSpecial == includeIsSpecial
                if (tileMatchesSpecialty) {
                    tiles[name] = data
                }
            }
        }
        return tiles
    }

    const filteredFeatures = useMemo(() => {
        const _filteredFeatures = []

        for (const feature of features) {
            // if the header or header description includes the text, include section with all tiles
            if (
                filterByText
                && (
                    includesLC(feature.headerText)
                    || includesLC(feature.description)
                )
            ) {
                _filteredFeatures.push(feature)
            } else {
                // else, filter the tiles and include the section if there are tiles to show
                const filteredTiles = getFilteredTiles(feature.tileData)
                const hasTiles = Object.values(filteredTiles).length > 0
                if (hasTiles) {
                    _filteredFeatures.push({ ...feature, tileData: filteredTiles })
                }
            }
        }

        return _filteredFeatures
    }, [filterByText, filterBySpecialty])

    return { filteredFeatures, filter, SPECIALTY_TYPES }
}

