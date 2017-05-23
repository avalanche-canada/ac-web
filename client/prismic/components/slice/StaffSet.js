import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Biography from '~/components/biography'
import { getDocuments } from '~/getters/prismic'
import { StructuredText } from '~/prismic/components/base'
import { parse } from '~/prismic'

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
    return (
        <div>
            {members.map(parse).map(createStaff)}
        </div>
    )
}

const getMembers = createSelector(
    getDocuments,
    (state, { value }) => value.map(item => item.staff.value.document.id),
    (documents, ids) => ids.map(id => documents.get(id)).filter(Boolean)
)

export default connect(
    createStructuredSelector({
        members: getMembers,
    })
)(StaffSet)
