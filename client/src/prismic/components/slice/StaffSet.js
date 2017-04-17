import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Biography from '~/components/biography'
import {InnerHTML} from '~/components/misc'
import {getDocuments} from '~/getters/prismic'
import transform from '~/prismic/transformers'

function parse(document) {
    const staff = transform(document)

    if (staff.avatar) {
        return {
            ...staff,
            avatar: staff.avatar.url
        }
    }

    return staff
}

const mapStateToProps = createSelector(
    getDocuments,
    (state, {content}) => content.map(({staff}) => staff.id),
    (documents, ids) => {
        if (documents.isEmpty()) {
            return {}
        }

        return {
            members: ids.map(id => documents.get(id)).filter(Boolean).map(parse)
        }
    }
)

StaffSet.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object),
}

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
