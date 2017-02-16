import React from 'react'
import struct from 'services/tcomb-form/templates/src/struct'
import renderFieldset from 'services/tcomb-form/templates/src/renderFieldset'
import {Tab} from 'components/tab'
import Button from 'components/button'
import {COLORS} from 'constants/min'

export default struct.clone({
    renderFieldset(children, {label, onChange, value, path}) {
        const key = path.pop()
        function onReset(event) {
            event.preventDefault()

            onChange(path, null)
        }

        return (
            <Tab key={key} title={label} color={COLORS.get(key)}>
                {children}
                <Button type='reset' disabled={!value} onClick={onReset}>
                    Reset {label} report
                </Button>
            </Tab>
        )
    }
})
