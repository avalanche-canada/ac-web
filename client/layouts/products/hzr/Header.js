import React, { Fragment } from 'react'
import { Consumer } from './Context'
import Headline from './Headline'
import Title from './Title'

export default function Header() {
    return (
        <Consumer>
            {report =>
                report ? (
                    <Fragment>
                        <Title>{report.data.title}</Title>
                        <Headline>{report.data.headline}</Headline>
                    </Fragment>
                ) : null
            }
        </Consumer>
    )
}
