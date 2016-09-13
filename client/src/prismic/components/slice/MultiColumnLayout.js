import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './MultiColumnLayout.css'
import {InnerHTML} from 'components/misc'

function MultiColumnLayout({content = []}) {
    return (
        <div styleName='ColumnSet'>
            {content.map(({content}) => (
                <InnerHTML>
                    {content}
                </InnerHTML>
            ))}
        </div>
    )
}

export default CSSModules(MultiColumnLayout, styles)
