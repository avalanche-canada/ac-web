import React from 'react'
import PropTypes from 'prop-types'
import { StructuredText, InlineImage } from '~/prismic/components/base'
import { DateElement } from '~/components/misc'
import addDays from 'date-fns/add_days'

const SEQUENCE = [0, 1, 2, 3]

function Content({ image, text }) {
    return (
        <div>
            {image && <InlineImage {...image.main} />}
            <StructuredText value={text} />
        </div>
    )
}

Outlook.propTypes = {
    forecast: PropTypes.object.isRequired,
}

function Outlook({ forecast }) {
    const { outlook } = forecast

    if (outlook === null) {
        return null
    }

    return (
        <section>
            <h2>Outlook</h2>
            <StructuredText value={outlook} />
            {SEQUENCE.map(increment => (
                <Content
                    key={increment}
                    image={forecast[`outlookImage${increment}`]}
                    text={forecast[`outlookText${increment}`]}
                />
            ))}
        </section>
    )
}

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    index: PropTypes.oneOf(SEQUENCE).isRequired,
    forecast: PropTypes.object,
}

function Day({ forecast, date, index }) {
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
            {SEQUENCE.map(increment => (
                <Content
                    key={increment}
                    image={get('Image', increment)}
                    text={get('Text', increment)}
                />
            ))}
        </section>
    )
}

Legacy.propTypes = {
    forecast: PropTypes.object.isRequired,
}

export default function Legacy({ forecast }) {
    const { synopsis, date } = forecast

    return (
        <div>
            <StructuredText value={synopsis} />
            {SEQUENCE.map(index => (
                <Day
                    key={index}
                    index={index}
                    date={addDays(date, index)}
                    forecast={forecast}
                />
            ))}
            <Outlook forecast={forecast} />
        </div>
    )
}
