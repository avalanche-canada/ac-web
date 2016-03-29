import Button from './Button'
import { pure } from 'recompose'

function scrollTop(event) {
	event.preventDefault()
	window.scrollTop = 0
}

export default pure(function Top() {
	return (
		<Button onClick={scrollTop}>
			Top
		</Button>
	)
})
