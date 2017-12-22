import React, { Component } from 'react'
import Biography from 'components/biography'
import { StructuredText } from 'prismic/components/base'
import { DocumentsById } from 'prismic/containers'
import { Status } from 'components/misc'

export default class StaffSet extends Component {
    get ids() {
        return this.props.value.map(({ staff }) => staff.value.document.id)
    }
    renderItem({ id, data: { biography, avatar, ...props } }) {
        if (avatar) {
            avatar = avatar.main.url
        }

        return (
            <Biography key={id} avatar={avatar} {...props}>
                <StructuredText value={biography} />
            </Biography>
        )
    }
    renderer = ({ status, documents }) => [
        <Status {...status} />,
        documents.map(this.renderItem),
    ]
    render() {
        return <DocumentsById ids={this.ids}>{this.renderer}</DocumentsById>
    }
}
