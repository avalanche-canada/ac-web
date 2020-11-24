import React from 'react'
import Button from './Button'
import { TERTIARY } from './kinds'
import Expand from './Expand'
import Sorting from './Sorting'
import Grouping from './Grouping'
import Close from './Close'
import Locate from './Locate'
import ButtonSet from './ButtonSet'

export default Button
export { ButtonSet }
export { Expand }
export { Sorting }
export { Grouping }
export { Close }
export { Locate }
export * from './kinds'

export function Reset(props) {
    return <Button kind={TERTIARY} {...props} type="reset" />
}
export function Submit(props) {
    return <Button {...props} type="submit" />
}
