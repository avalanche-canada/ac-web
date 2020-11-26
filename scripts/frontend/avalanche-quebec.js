import * as Components from '../../client/layouts/products/forecast'
import * as Intl from '../../client/contexts/intl'
import * as Locales from '../../client/constants/locale'
import fr from '../../client/services/intl/locales/compiled/fr-CA.json'
import en from '../../client/services/intl/locales/compiled/en-CA.json'

import 'styles/scaffolding.module.css'

Intl.Messages = { fr, en }
Intl.Locales = {
    fr: Locales.FR,
    en: Locales.EN,
}

export const Forecasts = Components
export { Intl }
