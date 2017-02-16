import React from 'react'
import struct from 'services/tcomb-form/templates/src/struct'
import renderFieldset from 'services/tcomb-form/templates/src/renderFieldset'
import {TabSet, Tab} from 'components/tab'
import Button from 'components/button'
import {COLORS} from 'constants/min'

export default struct.clone({
    renderFieldset(children, {inputs, order}) {
        children.pop()

        // activeIndex={context.activeIndex} onActivate={context.onTabActivate}

        return (
            <div>
                {children}
                <TabSet lazy={false} arrow>
                    {order.map(name => {
                        const input = inputs[name]
                        const {value, error, onChange, ctx} = input.props
                        const {label} = ctx
                        function onReset(event) {
                            event.preventDefault()

                            onChange(null)
                        }

                        return (
                            <Tab key={name} title={label} color={COLORS.get(name)}>
                                {input}
                                <Button type='reset' disabled={!value} onClick={onReset}>
                                    Reset {label} report
                                </Button>
                            </Tab>

                        )
                    })}
                </TabSet>
            </div>
        )
    }
})
