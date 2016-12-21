import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Biography from 'components/biography'
import {InnerHTML} from 'components/misc'
import {getDocumentsOfType} from 'getters/prismic'
import factory from 'prismic/factory'

function parse(document) {
    const staff = factory.getType(document)

    if (staff.avatar) {
        return {
            ...staff,
            avatar: staff.avatar.url
        }
    }

    return staff
}

const mapStateToProps = createSelector(
    state => getDocumentsOfType(state, 'staff'),
    (state, {content}) => content.map(({staff}) => staff.id),
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
            {members.map(({biography, ...props}, index) => (
                <Biography key={index} {...props}>
                    <InnerHTML>
                        {biography}
                    </InnerHTML>
                </Biography>
            ))}
        </div>
    )
}

export default connect(mapStateToProps)(StaffSet)
