import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Biography from 'components/biography'
import {InnerHTML} from 'components/misc'
import {getDocumentsOfType} from 'reducers/prismic'
import {Staff} from 'prismic/types'

function parse(document) {
    const staff = Staff.fromDocument(document)

    if (staff.avatar) {
        return {
            ...staff,
            avatar: staff.avatar.url
        }
    }

    return staff
}

const getStaffMembers = createSelector(
    state => getDocumentsOfType(state, 'staff'),
    (state, props) => props.content.map(slice => slice.staff.id),
    function computeStaffMembers(documents, ids) {
        if (documents.isEmpty()) {
            return
        }

        return {
            members: ids.map(id => documents.get(id)).filter(Boolean).map(parse)
        }
    }
)

function StaffSet({members = []}) {
    return (
        <div>
            {members.map(({biography, ...props}) => (
                <Biography {...props}>
                    <InnerHTML>
                        {biography}
                    </InnerHTML>
                </Biography>
            ))}
        </div>
    )
}

export default connect(getStaffMembers)(StaffSet)
