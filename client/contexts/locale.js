import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import LOCALE, { LOCALES } from 'constants/locale'

const LocaleContext = createContext({
    locale: LOCALE,
    dictionnaries: new Map(
        Array.from(LOCALES).map(locale => [locale, new Map()])
    ),
})

export default LocaleContext
export const { Provider } = LocaleContext

Translate.propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export function Translate({ id, children }) {
    const { locale, dictionnaries } = useContext(LocaleContext)
    const dictionnary = dictionnaries.get(locale)

    const value =
        (id ? dictionnary.get(id) : dictionnary.get(children)) || id || children

    return typeof children === 'function' ? children(value) : value
}
