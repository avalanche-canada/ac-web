// Copy & paste from https://github.com/gcanti/tcomb-form-templates-semantic/blob/master/src/renderFieldset.js

import React from 'react'
import classnames from 'classnames'

function getClassName({path, hasError, className}) {
    const {length} = path

    return classnames({
        ui: true,
        form: true,
        segment: length > 0,
        error: hasError,
        fieldset: true,
        [`fieldset-depth-${length}`]: true,
        [`fieldset-${path.join('-')}`]: length > 0,
        [className]: !!className
    })
}

export default function renderFieldset(children, locals) {
    const {label, disabled} = locals
    const legend = label ? <legend className='ui dividing header'>{label}</legend> : null
    const props = {
        className: getClassName(locals),
        disabled,
    }

    return React.createElement.apply(null, [
        'fieldset',
        props,
        legend
    ].concat(children))
}
