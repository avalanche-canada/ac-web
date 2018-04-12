import React from 'react'
import Button from './Button'
import { TERTIARY } from './kinds'

export default from './Button'

export Expand from './Expand'
export Sorting from './Sorting'
export Close from './Close'
export Locate from './Locate'

export * from './kinds'

export ButtonSet from './ButtonSet'

export function Reset(props) {
    return <Button kind={TERTIARY} {...props} type="reset" />
}
export function Submit(props) {
    return <Button {...props} type="submit" />
}
