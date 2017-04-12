import React from 'react'
import PropTypes from 'prop-types'
import {FilterSet as Base, FilterEntry} from '/components/filter'
import {DropdownFromOptions as Dropdown} from '/components/controls'

FilterSet.propTypes = {
    category: PropTypes.string,
    year: PropTypes.number,
    month: PropTypes.string,
    timeline: PropTypes.string,
    tags: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
    onYearChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onTimelineChange: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    options: {
        category: PropTypes.instanceOf(Map),
        year: PropTypes.instanceOf(Map),
        month: PropTypes.instanceOf(Map),
        timeline: PropTypes.instanceOf(Map),
        tag: PropTypes.instanceOf(Map),
    }
}

function FilterSet({
    category,
    onCategoryChange,
    year,
    onYearChange,
    month,
    onMonthChange,
    timeline,
    onTimelineChange,
    tags,
    onTagChange,
    options,
}) {
    return (
        <Base>
            {options.category &&
                <FilterEntry>
                    <Dropdown value={category}
                        onChange={onCategoryChange}
                        options={options.category}
                        placeholder={options.category.get()}/>
                </FilterEntry>
            }
            {options.timeline &&
                <FilterEntry>
                    <Dropdown value={timeline}
                        onChange={onTimelineChange}
                        options={options.timeline}
                        placeholder={options.timeline.get()}/>
                </FilterEntry>
            }
            {options.year &&
                <FilterEntry>
                    <Dropdown value={year}
                        onChange={onYearChange}
                        options={options.year}
                        placeholder={options.year.get()} />
                </FilterEntry>
            }
            {options.month &&
                <FilterEntry>
                    <Dropdown value={month}
                        onChange={onMonthChange}
                        options={options.month}
                        placeholder={options.month.get()} />
                </FilterEntry>
            }
            {options.tag &&
                <FilterEntry>
                    <Dropdown value={tags}
                        onChange={onTagChange}
                        options={options.tag}
                        placeholder='All tags' />
                </FilterEntry>
            }
        </Base>
    )
}

export default FilterSet
