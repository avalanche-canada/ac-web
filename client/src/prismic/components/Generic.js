import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Status, InnerHTML} from '~/components/misc'
import {generic} from '~/containers/connectors'

@generic
export default class Generic extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        type: PropTypes.string,
        status: PropTypes.object.isRequired,
        document: PropTypes.object,
    }
    render() {
        const {status, document} = this.props

        if (document) {
            return (
                <InnerHTML>
                    {document.body}
                </InnerHTML>
            )
        }

        return <Status {...status.toJSON()} />
    }
}
