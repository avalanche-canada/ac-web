import React, { Fragment } from 'react'
import { useReport } from './Context'
import Headline from './Headline'
import Title from './Title'

export default function Header() {
    const report = useReport()

    return report ? (
        <Fragment>
            <Title>{report.data.title}</Title>
            <Headline>{report.data.headline}</Headline>
        </Fragment>
    ) : null
}
