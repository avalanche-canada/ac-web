import React from 'react'

export default function MountainInformationNetworkFeatures({content}) {
    return (
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td colSpan='2'>Mobile</td>
                    <td colSpan='2'>Web</td>
                </tr>
                <tr>
                    <td></td>
                    <td>View</td>
                    <td>Submit</td>
                    <td>View</td>
                    <td>Submit</td>
                </tr>
            </thead>
            <tbody>
                {content.map(row => (
                    <tr>
                        <td>{row.feature}</td>
                        <td>{row.mobileView}</td>
                        <td>{row.mobileSubmit}</td>
                        <td>{row.webView}</td>
                        <td>{row.webSubmit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
