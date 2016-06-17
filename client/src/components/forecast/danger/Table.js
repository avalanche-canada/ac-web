import React, { PropTypes, Children, cloneElement } from 'react'
import { mapProps } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import Day from './Day'

Table.propTypes = {
    children: PropTypes.arrayOf(Day).isRequired,
    confidence: PropTypes.string.isRequired,
    // TODO: Change the server to have this shape instead of a string
    // confidence: PropTypes.shape({
    //     level: PropTypes.string.isRequired,
    //     comment: PropTypes.string.isRequired,
    // }).isRequired,
}

function Table({ children, confidence: {level, comment} }) {
    return (
        <table styleName='Table'>
            <caption styleName='Caption'>
                <dl>
                    <dt>Confidence</dt>
                    <dd>
                        <strong>{level}</strong> {comment}
                    </dd>
                </dl>
            </caption>
            {Children.map(children, (day, index) => cloneElement(day, {index}))}
        </table>
    )
}

// TODO: Remove this props mapper, when server returns the expected object
function convertConfidence({confidence, children}) {
    const [level, comment] = confidence.split(' - ')

    return {
        confidence: {
            level,
            comment
        },
        children,
    }
}

export default mapProps(convertConfidence)(CSSModules(Table, styles))
