import React, {PureComponent, PropTypes} from 'react'
import {Status, InnerHTML} from 'components/misc'
import {generic} from 'containers/connectors'

@generic
export default class Generic extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        type: PropTypes.string,
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
