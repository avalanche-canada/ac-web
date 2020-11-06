import { useIntl } from 'react-intl'

export default function TagTitle({ value }) {
    const intl = useIntl()

    return value === 'foundation'
        ? intl.formatMessage({
            defaultMessage: 'AVALANCHE CANADA FOUNDATION',
            description: 'Layout feed/TagTitle',
        })
        : value.toUpperCase()
}