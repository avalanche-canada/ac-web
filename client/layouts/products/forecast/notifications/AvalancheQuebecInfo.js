import React from 'react'
import { INFO } from 'components/alert'
import { GenericProvider } from 'prismic/layouts'
import { Alert } from 'prismic/layouts/renderers'

export default function AvalancheQuebecInfo() {
    return (
        <GenericProvider uid="forecast-info-avalanche-quebec">
            <Alert type={INFO} />
        </GenericProvider>
    )
}
