import React from "react";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import "./feature_section.css"

/**
 * @typedef FeatureSectionProps
 * @param {string} headerId Required
 * @param {string} headerText Required
 * @param {React.Component} [HeaderSvg] An SVG to show before the header text
 * @param {string} [headerHref] Converts the header to a link. Useful for pointing to the page that
 *      the feature lives on.
 * @param {string} [description] Describes the feature section
 * @param {boolean} [lazyLoad = false] Whether you want the tiles to lazy-load. ONLY AFFECTS THE
 *      TILES (this allows you to still anchor to the section).
 * @param {string} [specialText] Sub-text to the header indicating that this section is special
 * @param {React.Component} [SpecialIcon] An icon related to your special theme
 * @param {React.Component} [SpecialDescription] An extra description below the section description
 *      describing how it is special
 * @param {string} [backToTopAnchor = "#top"] The anchor link for the top. Defaults to the top of
 *      the page
 * @param {React.ReactNode} children The tiles in this section.
 */

/**
 * This component allows you to group feature tiles together into a cohesive section. Sections
 * allow you to describe related features, anchor to them using the URL, and indicate whether the
 * entire feature list is special.
 * 
 * Tiles should be given as children.
 * 
 * @param {FeatureSectionProps} props
 * @returns {React.Component}
 */
export function FeatureSection({
    headerId,
    headerText,
    HeaderSvg,
    headerHref,
    description,
    lazyLoad = false,
    specialText,
    SpecialIcon,
    SpecialDescription,
    backToTopAnchor = "#top",
    children: tiles
}) {
    if (!tiles) return;

    if (!headerId || !headerText) {
        throw new Error("Must give a header id and header text for each Feature Section")
    }

    const isEarlyAccess = !!specialText

    return (
        <section role="region" aria-labelledby={headerId} className="feature-section" >
            <header id={headerId} >
                <h2>
                    {headerHref
                        ? (
                            <a href={headerHref}>{HeaderSvg && <HeaderSvg />} {headerText}</a>
                        ) : (
                            <span>{HeaderSvg && <HeaderSvg />} {headerText}</span>
                        )
                    }
                    {isEarlyAccess &&
                        <span className="feature-section--early-access" >
                            {!!SpecialIcon && <SpecialIcon />}
                            {specialText}
                        </span>
                    }
                </h2>
                {!!description || !!SpecialDescription &&
                    <div className="feature-section--description">
                        <p>{description}</p>
                        {!!SpecialDescription && <SpecialDescription />}
                    </div>
                }
            </header>

            <LazyLoadComponent visibleByDefault={!lazyLoad} >
                {tiles}
            </LazyLoadComponent>

            <footer>
                <a href={backToTopAnchor} className="feature-section--to-top" >
                    Back to top
                </a>
            </footer>
        </section>
    )
}