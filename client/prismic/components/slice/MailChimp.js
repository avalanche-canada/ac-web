import React from 'react'
import { Subscribe } from 'services/mailchimp'

export default function Mailchimp({ value }) {
    return <Subscribe {...value[0]} />
}
