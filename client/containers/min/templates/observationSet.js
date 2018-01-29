import React, { Children } from 'react'
import t from 'vendor/tcomb-form'
import { HeaderSet, ColoredHeader, EagerPanelSet, Panel } from 'components/tabs'
import { Reset } from 'components/button'
import { NAMES, COLORS, TYPES } from 'constants/min'
import Dimensions from 'components/Dimensions'

const { struct } = t.form.Form.templates

export default struct.clone({
    renderFieldsetFields(children, locals) {
        const { disabled, config: { onTabActivate, activeTab } } = locals

        children = Children.toArray(children)

        return (
            <div>
                <Dimensions>
                    {({ width }) => (
                        <HeaderSet
                            stacked={width < 375}
                            activeTab={activeTab}
                            onTabChange={onTabActivate}>
                            {children.map((child, index) => {
                                const { props: { value } } = child
                                const type = TYPES[index]
                                const color = value ? COLORS.get(type) : null

                                return (
                                    <ColoredHeader
                                        arrow={Boolean(value)}
                                        key={type}
                                        color={color}>
                                        {NAMES.get(type)}
                                    </ColoredHeader>
                                )
                            })}
                        </HeaderSet>
                    )}
                </Dimensions>
                <EagerPanelSet activeTab={activeTab}>
                    {children.map((child, index) => {
                        const { props: { value } } = child
                        const type = TYPES[index]
                        function handleReset() {
                            locals.onChange(type, null)
                            locals.config.onReportRemove(type)
                        }

                        return (
                            <Panel key={type}>
                                {child}
                                <Reset
                                    disabled={disabled || !value}
                                    onClick={handleReset}>
                                    Remove your {NAMES.get(type)} report
                                </Reset>
                            </Panel>
                        )
                    })}
                </EagerPanelSet>
            </div>
        )
    },
})
