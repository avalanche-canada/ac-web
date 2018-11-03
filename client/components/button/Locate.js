import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

// Needs to stay as Component because dof "ref"
// TODO: Look at "forwardRef"

export default class Locate extends PureComponent {
    static propTypes = {
        ref: PropTypes.func.isRequired,
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    render() {
        return (
            <Button kind={SUBTILE} {...this.props}>
                <MyLocation />
            </Button>
        )
    }
}
