import React, { Children } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Credit } from '~/components/markup'
import { ElementResize } from '~/components/misc'
import styles from './Image.css'
import WebLink from './WebLink'

const MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT = 200

Image.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    copyright: PropTypes.string,
    dimensions: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    label: PropTypes.string,
    linkTo: PropTypes.object,
}

function Image({ url, alt, copyright, label, linkTo }) {
    const image = <img src={url} alt={alt} />

    return (
        <figure className={label} styleName="Figure">
            {typeof linkTo === 'object'
                ? <WebLink {...linkTo}>
                      {image}
                  </WebLink>
                : image}
            {copyright &&
                <footer>
                    <ElementResize>
                        {width => {
                            if (copyright) {
                                const compact =
                                    width <
                                    MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT

                                return (
                                    <Credit compact={compact}>
                                        {copyright}
                                    </Credit>
                                )
                            }
                            return null
                        }}
                    </ElementResize>
                </footer>}
        </figure>
    )
}

export default CSSModules(Image, styles)

OpenInNewTab.propTypes = {
    children: PropTypes.node.isRequired,
}

export function OpenInNewTab({ children }) {
    const child = Children.only(children)
    const { url, alt } = child.props

    return (
        <a href={url} title={alt} target="_blank">
            {child}
        </a>
    )
}
