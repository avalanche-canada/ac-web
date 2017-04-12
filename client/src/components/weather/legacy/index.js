import React from 'react'
import {InnerHTML} from '/components/misc'
import DaySet from './DaySet'
import Outlook from './Outlook'

function Legacy({forecast}) {
    const {synopsis, date} = forecast

    return (
        <div>
            <InnerHTML>{synopsis}</InnerHTML>
            <DaySet start={date} forecast={forecast} />
            <Outlook forecast={forecast} />
        </div>
    )
}

export default Legacy
