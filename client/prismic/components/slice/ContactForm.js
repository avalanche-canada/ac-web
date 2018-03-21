import React from 'react'
import StaticComponent from 'components/StaticComponent'

export default class ContactForm extends StaticComponent {
    render() {
        return (
            <iframe
                src="https://avalanchecanada.supportbee.com/web_tickets/new?embed=true&locale=en"
                style={{ width: '100%', height: 500, border: 'none' }}
            />
        )
    }
}
