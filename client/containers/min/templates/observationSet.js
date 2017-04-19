import React, {Children} from 'react'
import t from '~/vendor/tcomb-form'
import {TabSet, Tab} from '~/components/tab'
import {Reset} from '~/components/button'
import {NAMES, COLORS} from '~/constants/min'

const {struct} = t.form.Form.templates

export default struct.clone({
    renderFieldsetFields(children, locals) {
        const {disabled, config: {onTabActivate, activeIndex}} = locals

        return (
            <TabSet lazy={false} arrow onActivate={onTabActivate} activeIndex={activeIndex}>
                {Children.toArray(children).map(child => {
                    const {ref, props: {value}} = child
                    const title = NAMES.get(ref)
                    const color = value ? COLORS.get(ref) : null
                    function handleReset() {
                        locals.onChange(ref, null)
                        locals.config.onReportRemove(ref)
                    }

                    return (
                        <Tab key={ref} title={title} color={color}>
                            {child}
                            <Reset disabled={disabled || !value} onClick={handleReset}>
                                Remove your {title} report
                            </Reset>
                        </Tab>
                    )
                })}
            </TabSet>
        )
    }
})
