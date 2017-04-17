import React from 'react'
import PropTypes from 'prop-types'
import {InnerHTML} from '~/components/misc'
import Image from './Image'

const sequence = [1, 2, 3, 4]

Outlook.propTypes = {
    forecast: PropTypes.object.isRequired,
}

export default function Outlook({forecast}) {
    const {outlook} = forecast

    if (outlook === null) {
        return null
    }

    return (
        <section>
            <h2>Outlook</h2>
            <InnerHTML>
                {outlook}
            </InnerHTML>
            {sequence.map(increment => (
                <div key={increment}>
                    <Image image={forecast[`outlookImage${increment}`]} />
                    <InnerHTML>
                        {forecast[`outlookText${increment}`]}
                    </InnerHTML>
                </div>
            ))}
        </section>
    )
}
