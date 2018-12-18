import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import StaticComponent from 'components/StaticComponent'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

// Needs to stay as Component because of "ref"
// TODO: Look at "forwardRef"

export default class Locate extends StaticComponent {
    static propTypes = {
        ref: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Button kind={SUBTILE} {...this.props}>
                <MyLocation />
            </Button>
        )
    }
}
