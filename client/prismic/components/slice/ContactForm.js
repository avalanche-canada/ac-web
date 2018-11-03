import React from 'react'
import { memo } from 'utils/react'

function ContactForm() {
    return (
        <iframe
            src="https://avalanchecanada.supportbee.com/web_tickets/new?embed=true&locale=en"
            style={{ width: '100%', height: 500, border: 'none' }}
        />
    )
}

export default memo.static(ContactForm)
