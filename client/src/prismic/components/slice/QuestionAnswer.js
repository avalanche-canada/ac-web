import {compose, flattenProp, mapProps} from 'recompose'
import QuestionAnswer from 'components/question-answer'

export default compose(
    mapProps(props => props.content[0]),
    flattenProp('content'),
)(QuestionAnswer)
