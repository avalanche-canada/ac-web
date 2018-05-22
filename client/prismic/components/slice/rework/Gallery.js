import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/gallery'

export default class Gallery extends PureComponent {
    static propTypes = {
        repeat: PropTypes.arrayOf(
            PropTypes.shape({
                image: PropTypes.object.isRequired,
                caption: PropTypes.arrayOf(PropTypes.object),
            })
        ),
    }
    render() {
        return <Base />
    }
}
