import React from 'react'
import CSSModules from 'react-css-modules'
import {Table, Header, Row, HeaderCell, Cell} from 'components/table'
import styles from './MountainInformationNetworkFeatures.css'
import {classify} from 'utils/string'

const {keys} = Object
const styleNames = new Map([
    ['Yes', 'Supported'],
    ['No', 'Unsupported'],
    ['Not available', 'NotAvailable'],
])
const Texts = new Map([
    ['Not available', 'N/A'],
])

function MountainInformationNetworkFeatures({content}) {
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
                        {keys(values).map(key => {
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
