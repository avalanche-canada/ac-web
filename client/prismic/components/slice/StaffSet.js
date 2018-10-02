import React, { Component, Fragment } from 'react'
import Biography from 'components/biography'
import { StructuredText } from 'prismic/components/base'
import { Documents } from 'prismic/containers'
import { Loading } from 'components/text'
import * as params from 'prismic/params'

export default class StaffSet extends Component {
    get ids() {
        return this.props.value.map(({ staff }) => staff.value.document.id)
    }
    renderItem({ id, data: { biography, avatar, ...props } }) {
        return (
            <Biography key={id} avatar={avatar?.main?.url} {...props}>
                <StructuredText value={biography} />
            </Biography>
        )
    }
    renderChildren = ({ loading, documents = [] }) => (
        <Fragment>
            <Loading show={loading} />
            {documents.map(this.renderItem)}
        </Fragment>
    )
    render() {
        return (
            <Documents {...params.ids(this.ids)}>
                {this.renderChildren}
            </Documents>
        )
    }
}
