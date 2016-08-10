import React, {PropTypes} from 'react'
import {Header, Page as Base, Main} from 'components/page'
import {Submission, Metadata} from 'components/mountainInformationNetwork'

Page.propTypes = {
    observations: PropTypes.array.isRequired,
}

export default function Page({observations = []}) {
    const [observation] = observations
    const {title, datetime, user} = observation

    return (
        <Base>
            <Header title={title} />
            <Main>
                <Metadata submittedBy={user} submittedOn={datetime} />
                <Submission observations={observations} />
            </Main>
        </Base>
    )
}
