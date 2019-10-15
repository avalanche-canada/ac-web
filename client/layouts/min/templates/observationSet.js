import React, { Children, Fragment, cloneElement } from 'react'
import PropTypes from 'prop-types'
import t from 'vendor/tcomb-form'
import { HeaderSet, ColoredHeader, Panel } from 'components/tabs'
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
const EAGER_STYLES = new Map([
    [true, { display: 'inherit' }],
    [false, { display: 'none' }],
])

EagerPanelSet.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    activeTab: PropTypes.number,
}

function EagerPanelSet({ activeTab, children }) {
    return Children.map(children, (panel, index) =>
        cloneElement(panel, {
            style: EAGER_STYLES.get(index === activeTab),
        })
    )
}
