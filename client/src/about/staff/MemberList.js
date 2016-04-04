import React, { PropTypes } from 'react'
import { pure } from 'recompose'
import Member from './Member'

MemberList.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object)
}

function MemberList({ members = [] }) {
    return (
		<div>
			{members.map((member, index) => (
                <Member
                    key={index}
                    fullName={member.getText('full_name')}
                    title={member.getText('title')}
                    email={member.getText('email')}
                    phone={member.getText('phone')} />

            ))}
		</div>
	)
}

export default pure(MemberList)
