import React, { Children, Fragment } from 'react'
import t from 'vendor/tcomb-form'
import { HeaderSet, ColoredHeader, EagerPanelSet, Panel } from 'components/tabs'
import { Reset } from 'components/button'
import { NAMES, COLORS, TYPES } from 'constants/min'
import { useClientRect } from 'utils/react/hooks'

const { struct } = t.form.Form.templates

export default struct.clone({
    renderFieldsetFields(children, locals) {
        const {
            disabled,
            config: { onTabActivate, activeTab },
        } = locals

        children = Children.toArray(children)

        return (
            <Fragment>
                <MINHeaderSet
                    activeTab={activeTab}
                    onTabActivate={onTabActivate}>
                    {children}
                </MINHeaderSet>
                <EagerPanelSet activeTab={activeTab}>
                    {children.map((child, index) => {
                        const { value } = child.props
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
            </Fragment>
        )
    },
})

function MINHeaderSet({ activeTab, onTabActivate, children }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })

    return (
        <div ref={ref}>
            <HeaderSet
                stacked={width < 375}
                activeTab={activeTab}
                onTabChange={onTabActivate}>
                {children.map((child, index) => {
                    const { value } = child.props
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
        </div>
    )
}
