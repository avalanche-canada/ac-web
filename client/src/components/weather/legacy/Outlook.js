import React from 'react'
import {InnerHTML} from '/components/misc'
import Image from './Image'

const sequence = [1, 2, 3, 4]

function Outlook({forecast}) {
	const {outlook, type} = forecast

	if (outlook === null) {
		return null
	}

	return (
		<section>
			<h2>Outlook</h2>
			<InnerHTML>
                {outlook}
            </InnerHTML>
			{sequence.map(increment => (
				<div key={increment}>
					<Image image={forecast[`outlookImage${increment}`]} />
					<InnerHTML>
                        {forecast[`outlookText${increment}`]}
                    </InnerHTML>
				</div>
			))}
		</section>
	)
}

export default Outlook
