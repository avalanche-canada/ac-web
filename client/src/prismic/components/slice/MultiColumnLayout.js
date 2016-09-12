import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './MultiColumnLayout.css'

function MultiColumnLayout({content = []}) {
    return (
        <div styleName='MultiColumnLayout'>
            {content.map(({content}) => (
                <InnerHTML>
                    {content}
                </InnerHTML>
            ))}
        </div>
    )
}

export default CSSModules(MultiColumnLayout, styles)
