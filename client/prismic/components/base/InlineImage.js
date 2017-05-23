import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Credit } from '~/components/markup'
import styles from './InlineImage.css'

InlineImage.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    copyright: PropTypes.string,
    dimensions: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
}

function InlineImage({ url, alt, copyright }) {
    return (
        <figure styleName="Figure">
            <img src={url} alt={alt} />
            <footer>
                {copyright && <Credit>{copyright}</Credit>}
            </footer>
        </figure>
    )
}

export default CSSModules(InlineImage, styles)
