import React from 'react'
import { useReport } from '../Context'
import Day from './Day'

export default function DangerRatings() {
    const { dangerRatings } = useReport()

    if (!Array.isArray(dangerRatings)) {
        return null
    }

    return dangerRatings.map(({ date, ratings }, index) => (
        <Day key={index} date={date} {...ratings} mountain={index === 0} />
    ))
}
