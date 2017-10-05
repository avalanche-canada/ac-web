import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Biography from '~/components/biography'
import { getDocuments } from '~/getters/prismic'
import { StructuredText } from '~/prismic/components/base'
import { load } from '~/actions/prismic'
import { parse, Predicates } from '~/prismic'

function createStaff({ data: { biography, avatar, ...props } }, index) {
    if (avatar) {
        avatar = avatar.main.url
    }

    return (
        <Biography key={index} avatar={avatar} {...props}>
            <StructuredText value={biography} />
        </Biography>
    )
}

StaffSet.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object),
}

function StaffSet({ members }) {
    return <div>{members.map(parse).map(createStaff)}</div>
}

function pluck({ staff }) {
    return staff.value.document.id
}

const getMembers = createSelector(
    getDocuments,
    (state, { value }) => value.map(pluck),
    (documents, ids) => ids.map(id => documents.get(id)).filter(Boolean)
)

export default compose(
    connect(
        createStructuredSelector({
            members: getMembers,
        }),
        { load }
    ),
    lifecycle({
        componentDidMount() {
            const ids = this.props.value.map(pluck)

            this.props.load({
                predicates: [Predicates.in('document.id', ids)],
                options: {
                    pageSize: ids.length,
                },
            })
        },
    })
)(StaffSet)
