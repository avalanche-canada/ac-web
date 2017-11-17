import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Locate } from 'components/button'
import { Wrapper } from 'components/tooltip'
import Device from 'components/Device'

const LOCATE_STYLE = {
    padding: '0.15em',
}

export default class DisplayOnMap extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }
    get link() {
        return <Locate onClick={this.props.onClick} style={LOCATE_STYLE} />
    }
    renderer = ({ isTouchable }) => {
        if (isTouchable) {
            return this.link
        }

        return (
            <Wrapper tooltip="Display on map" placement="left">
                {this.link}
            </Wrapper>
        )
    }
    render() {
        return <Device>{this.renderer}</Device>
    }
}
