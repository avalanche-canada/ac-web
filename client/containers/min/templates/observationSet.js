import React, { Children } from 'react'
import t from 'vendor/tcomb-form'
import { HeaderSet, ColoredHeader, EagerPanelSet, Panel } from 'components/tabs'
import { Reset } from 'components/button'
import { NAMES, COLORS } from 'constants/min'
import Dimensions from 'components/Dimensions'

const { struct } = t.form.Form.templates

export default struct.clone({
    renderFieldsetFields(children, locals) {
        const { disabled, config: { onTabActivate, activeIndex } } = locals

        children = Children.toArray(children)

        return (
            <div>
                <Dimensions>
                    {({ width }) => (
                        <HeaderSet
                            stacked={width < 375}
                            activeIndex={activeIndex}
                            onActiveIndexChange={onTabActivate}>
                            {children.map(child => {
                                const { ref, props: { value } } = child
                                const color = value ? COLORS.get(ref) : null

                                return (
                                    <ColoredHeader
                                        arrow={Boolean(value)}
                                        key={ref}
                                        color={color}>
                                        {NAMES.get(ref)}
                                    </ColoredHeader>
                                )
                            })}
                        </HeaderSet>
                    )}
                </Dimensions>
                <EagerPanelSet activeIndex={activeIndex}>
                    {children.map(child => {
                        const { ref, props: { value } } = child
                        function handleReset() {
                            locals.onChange(ref, null)
                            locals.config.onReportRemove(ref)
                        }

                        return (
                            <Panel key={ref}>
                                {child}
                                <Reset
                                    disabled={disabled || !value}
                                    onClick={handleReset}>
                                    Remove your {NAMES.get(ref)} report
                                </Reset>
                            </Panel>
                        )
                    })}
                </EagerPanelSet>
            </div>
        )
    },
})
