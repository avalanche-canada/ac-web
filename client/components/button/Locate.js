import React from 'react'
import StaticComponent from 'components/StaticComponent'
import Button from './Button'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

export default class Locate extends StaticComponent {
    render() {
        return (
            <Button kind={SUBTILE} {...this.props}>
                <MyLocation />
            </Button>
        )
    }
}
