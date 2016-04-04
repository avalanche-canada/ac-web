import React, { PropTypes } from 'react'
import { pure } from 'recompose'

const { string } = PropTypes

Member.propTypes = {
    fullName: string.isRequired, 
    title: string.isRequired, 
    email: string.isRequired, 
    phone: string.isRequired
}

function Member({ fullName, title, email, phone }) {
	return (
		<div>
			<strong>{title}</strong>
			{' '}{fullName} {email} {phone}
		</div>
	)
}

export default pure(Member)
