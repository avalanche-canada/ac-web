import React from 'react'
import * as RATINGS from 'constants/forecast/danger/rating'
import {keys} from 'constants/utils'

const {VALUES, TEXTS, ADVICES, LIKEHOOD, SIZE_AND_DISTRIBUTION} = RATINGS
const KEYS = keys(VALUES).filter(key => key !== 'NO_RATING')

export default (
    <div>
        {KEYS.map((key, index) => (
            <div key={key}>
                <h2>{TEXTS[key]}</h2>
                <p>{ADVICES[key]}</p>
                <p>{LIKEHOOD[key]}</p>
                <p>{SIZE_AND_DISTRIBUTION[key]}</p>
            </div>
        ))}
    </div>
)
