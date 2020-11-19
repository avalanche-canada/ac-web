import React from 'react'
import { useReport } from '../Context'
import Day from './Day'
import DaySet from './DaySet'

export default function DangerRatings() {
    const report = useReport()

    if (!report?.dangerRatings) {
        return null
    }

    return (
        <DaySet>
            {report.dangerRatings.map(({ date, ratings }, index) => (
                <Day key={index} date={date} {...ratings} />
            ))}
        </DaySet>
    )
}
