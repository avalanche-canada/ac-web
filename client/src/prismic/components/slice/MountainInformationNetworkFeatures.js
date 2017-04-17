import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MountainInformationNetworkFeatures.css'
import {classify} from '~/utils/string'

const Texts = new Map([
    ['Not available', 'N/A'],
])

MountainInformationNetworkFeatures.propTypes = {
    // TODO: Create appropriate propType
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function MountainInformationNetworkFeatures({content = []}) {
    return (
        <table styleName='Table'>
            <thead>
                <tr>
                    <td rowSpan='2'></td>
                    <td colSpan='2'>Mobile</td>
                    <td colSpan='2'>Web</td>
                </tr>
                <tr>
                    <td>View</td>
                    <td>Submit</td>
                    <td>View</td>
                    <td>Submit</td>
                </tr>
            </thead>
            <tbody>
                {content.map(({feature, ...values}) => (
                    <tr key={feature}>
                        <td>{feature}</td>
                        {Object.keys(values).map(key => {
                            const value = values[key]

                            return (
                                <td key={key} styleName={classify(value)}>
                                    {Texts.get(value) || value}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CSSModules(MountainInformationNetworkFeatures, styles)
