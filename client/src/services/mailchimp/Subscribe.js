import React, {PropTypes} from 'react'
import {foo, domain} from 'config.json'

Subscribe.propTypes = {
    list: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
}

export default function Subscribe({
    list = '8083bbbc7a',
    label = 'Subscribe to our mailing list',
    value = 'Subscribe'
}) {
    const action = `//${domain}/subscribe?u=${foo}&amp;id=${list}`

    return (
        <form action={action} method='post' name='mc-embedded-subscribe-form' target='_blank'>
            <label>
                {label}
                <input type='email' value='' name='EMAIL' placeholder='Email address' required />
            </label>
            <input type='text' name={`b_${foo}_${list}`} tabindex='-1' value='' />
            <input type='submit' value={value} name='subscribe' id='mc-embedded-subscribe' />
        </form>
    )
}
