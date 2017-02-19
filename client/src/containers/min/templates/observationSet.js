import React, {Children, cloneElement, createElement} from 'react'
import t from 'services/tcomb-form'
import {TabSet, Tab} from 'components/tab'
import {Reset} from 'components/button'
import {NAMES, COLORS} from 'constants/min'

const {struct} = t.form.Form.templates

export default struct.clone({
    renderFieldsetFields(children, locals) {
        const {onChange, disabled, config} = locals

        return (
            <TabSet lazy={false} arrow onActivate={config.onTabActivate} activeIndex={config.activeIndex}>
                {Children.toArray(children).map(child => {
                    const {ref, props: {value}} = child
                    const title = NAMES.get(ref)
                    const color = value ? COLORS.get(ref) : null

                    return (
                        <Tab title={title} color={color}>
                            {child}
                            <Reset disabled={disabled || !value} onClick={event => onChange(ref, null)}>
                                Reset {title} report
                            </Reset>
                        </Tab>
                    )
                })}
            </TabSet>
        )
    }
})
