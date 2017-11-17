import React, { Component } from 'react'
import Button from './Button'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

export default class Locate extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return <Button kind={SUBTILE} icon={<MyLocation />} {...this.props} />
    }
}
