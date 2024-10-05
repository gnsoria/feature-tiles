import React from "react";

import "./section_jump_buttons.css"


/**
 * A navigation component that contains links to different sections. You pass in the feature
 * section data and it will generate a link for each one using the headerId, headerText, and
 * HeaderSvg (if present).
 * 
 * You can also pass a btnComponent to override the default one with a custom option. This is useful
 * if you're using a custom component library like Bootstrap. Make sure the component is an <a> tag.
 * 
 * @param {React.PropsWithoutRef} props
 * @returns {React.Component}
 */
export function SectionJumpButtons({ features, btnComponent = JumpButton, ...props }) {
    const BtnComponent = btnComponent

    return (
        <nav id="section_nav" className="feature-section--jump-buttons" {...props} >
            <p>
                Jump to a section:
            </p>
            <ul>
                {features.map(({ headerId, headerText, HeaderSvg }) =>
                    <li key={headerId} >
                        <BtnComponent href={`#${headerId}`} >
                            {HeaderSvg && <HeaderSvg />}
                            {headerText}
                        </BtnComponent>
                    </li>
                )}
            </ul>
        </nav>
    )
}


/**
 * A default jump button, which will be an <a> tag with some basic styling.
 * 
 * @param {React.PropsWithChildren} props
 * @returns {React.Component}
 */
function JumpButton({ children, ...props }) {
    return (
        <a className="feature-section--default-jump-button" {...props}>
            {children}
        </a>
    )
}

