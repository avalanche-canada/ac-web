import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import { DateElement, InnerHTML } from '~/components/misc'

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    index: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
    forecast: PropTypes.object,
}

const sequence = [1, 2, 3, 4]

export default function Day({ forecast, date, index }) {
    function get(type, increment) {
        return forecast[`day${index + 1}${type}${increment}`]
    }

    if (!get('Image', 1) && !get('Text', 1)) {
        return null
    }

    return (
        <section>
            <h2>
                <DateElement value={date} />
            </h2>
            {sequence.map(increment => (
                <div key={increment}>
                    <Image
                        image={forecast[`day${index + 1}Image${increment}`]}
                    />
                    <InnerHTML>
                        {forecast[`day${index + 1}Text${increment}`]}
                    </InnerHTML>
                </div>
            ))}
        </section>
    )
}
