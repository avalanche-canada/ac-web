import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { FR, EN } from 'constants/locale'

const LocaleContext = createContext({
    locale: EN,
    dictionnaries: new Map([[EN, new Map()], [FR, new Map()]]),
})

export const Provider = LocaleContext.Provider
export const Consumer = LocaleContext.Consumer

export class Translate extends Component {
    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }
    renderContent = dictionnary => {
        const { id, children } = this.props
        const value =
            (id ? dictionnary.get(id) : dictionnary.get(children)) ||
            id ||
            children

        return typeof children === 'function' ? children(value) : value
    }
    render() {
        return <Dictionnary>{this.renderContent}</Dictionnary>
    }
}

class Dictionnary extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    provideDictionnary = ({ locale, dictionnaries }) =>
        this.props.children(dictionnaries.get(locale))
    render() {
        return <Consumer>{this.provideDictionnary}</Consumer>
    }
}

export class Locale extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    provideLocale = ({ locale }) => this.props.children(locale)
    render() {
        return <Consumer>{this.provideLocale}</Consumer>
    }
}
