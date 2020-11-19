import * as Components from '../../client/layouts/products/forecast'
import * as Intl from '../../client/contexts/intl'
import fr from '../../client/services/intl/locales/compiled/fr-CA.json'
import en from '../../client/services/intl/locales/compiled/en-CA.json'

Intl.Messages = { fr, en }

export const Forecasts = Components
export { Intl }
