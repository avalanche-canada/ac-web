import { useIntl } from 'react-intl'

export default function TagTitle({ value }) {
    const intl = useIntl()

    return value === 'foundation'
        ? intl.formatMessage({
              defaultMessage: 'Avalanche Canada Foundation',
              description: 'Layout feed/TagTitle',
          })
        : value.toUpperCase()
}
