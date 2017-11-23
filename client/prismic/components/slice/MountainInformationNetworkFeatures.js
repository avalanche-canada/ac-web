import React from 'react'
import PropTypes from 'prop-types'
import styles from './MountainInformationNetworkFeatures.css'
import { classify } from 'utils/string'

const Texts = new Map([['Not available', 'N/A']])

MountainInformationNetworkFeatures.propTypes = {
    // TODO: Create appropriate propType
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function MountainInformationNetworkFeatures({ value }) {
    return (
        <table className={styles.Table}>
            <thead>
                <tr>
                    <td rowSpan="2" />
                    <td colSpan="2">Mobile</td>
                    <td colSpan="2">Web</td>
                </tr>
                <tr>
                    <td>View</td>
                    <td>Submit</td>
                    <td>View</td>
                    <td>Submit</td>
                </tr>
            </thead>
            <tbody>
                {value.map(({ feature, ...values }) => (
                    <tr key={feature}>
                        <td>{feature}</td>
                        {Object.keys(values).map(key => {
                            const value = values[key]

                            return (
                                <td
                                    key={key}
                                    className={styles[classify(value)]}>
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
