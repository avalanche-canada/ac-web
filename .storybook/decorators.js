import React from 'react'
import { Provider } from 'react-redux'
import { configure } from 'store'

export function storeDecorator(getStory) {
    return <Provider store={configure()}>{getStory()}</Provider>
}
