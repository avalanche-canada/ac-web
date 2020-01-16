import React, { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useBoolean } from 'hooks'

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [opened, open, close, toggle] = useBoolean(false)
    const value = useMemo(() => ({ opened, open, close, toggle }), [opened])

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

const MenuContext = createContext()

export function useMenu() {
    return useContext(MenuContext)
}
