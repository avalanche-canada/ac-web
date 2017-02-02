import React, {PureComponent, PropTypes} from 'react'
import {Loading, InnerHTML} from 'components/misc'
import {generic} from 'containers/connectors'

@generic
export default class Generic extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        type: PropTypes.string,
        message: PropTypes.string,
    }
    render() {
        const {status, document, message} = this.props

        if (status.isLoading) {
            return (
                <Loading>
                    {message}
                </Loading>
            )
        }

        if (document) {
            return (
                <InnerHTML>
                    {document.body}
                </InnerHTML>
            )
        }

        return null
    }
}
