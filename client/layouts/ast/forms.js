import React from 'react'
import PropTypes from 'prop-types'
import { Form, Legend, ControlSet, Control } from 'components/form'
import { DropdownFromOptions, Geocoder, DateRange } from 'components/controls'
import { LEVELS, TAGS } from './constants'
import { ASC } from 'constants/sortings'

Courses.propTypes = {
    level: PropTypes.oneOf(Array.from(LEVELS.keys())),
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    tags: PropTypes.instanceOf(Set),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export function Courses({ level, from, to, tags, place, onParamsChange }) {
    return (
        <Layout legend="Find a course">
            <Control>
                <DropdownFromOptions
                    onChange={niveau => {
                        onParamsChange({
                            level: niveau === level ? undefined : niveau,
                        })
                    }}
                    value={level}
                    placeholder="Level"
                    options={LEVELS}
                />
            </Control>
            <Control>
                <DateRange
                    from={from}
                    to={to}
                    onChange={range => onParamsChange(range)}
                    container={this}
                />
            </Control>
            <Control>
                <DropdownFromOptions
                    multiple
                    onChange={tags => onParamsChange({ tags })}
                    value={tags}
                    placeholder="Filter by"
                    options={TAGS}
                />
            </Control>
            <Control>
                <Geocoder
                    placeholder="Location"
                    onChange={place =>
                        onParamsChange({
                            place,
                            sorting: place ? ['distance', ASC] : null,
                        })
                    }
                    value={place?.text}
                />
            </Control>
        </Layout>
    )
}

Providers.propTypes = {
    tags: PropTypes.instanceOf(Set),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export function Providers({ tags, place, onParamsChange }) {
    return (
        <Layout legend="Find a provider">
            <Control>
                <DropdownFromOptions
                    onChange={tags => onParamsChange({ tags })}
                    value={tags}
                    placeholder="Filter by"
                    options={TAGS}
                />
            </Control>
            <Control>
                <Geocoder
                    placeholder="Location"
                    onChange={place =>
                        onParamsChange({
                            place,
                            sorting: place ? ['distance', ASC] : null,
                        })
                    }
                    value={place?.text}
                />
            </Control>
        </Layout>
    )
}

// Utils
Layout.propTypes = {
    legend: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function Layout({ legend, children }) {
    return (
        <Form style={STYLE}>
            <Legend>{legend}</Legend>
            <ControlSet horizontal>{children}</ControlSet>
        </Form>
    )
}

// Styles
const STYLE = {
    margin: 'auto',
    position: 'relative',
}
