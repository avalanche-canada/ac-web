import {defaultProps} from 'recompose'
import Button from './Button'

export default from './Button'

export Top from './Top'
export Print from './Print'
export Expand from './Expand'
export Sorting from './Sorting'
export Close from './Close'
export Locate from './Locate'

export * from './kinds'

export ButtonSet from './ButtonSet'

export const Reset = defaultProps({type: 'reset'})(Button)
export const Submit = defaultProps({type: 'submit'})(Button)
