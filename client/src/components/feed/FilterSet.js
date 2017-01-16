import React, {PropTypes} from 'react'
import {FilterSet as Base, FilterEntry} from 'components/filter'
import {DropdownFromOptions as Dropdown} from 'components/controls'

FilterSet.propTypes = {
    year: PropTypes.number,
    yearOptions: PropTypes.instanceOf(Map),
    onYearChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    monthOptions: PropTypes.instanceOf(Map),
    onMonthChange: PropTypes.func.isRequired,
    category: PropTypes.string,
    categoryOptions: PropTypes.instanceOf(Map),
    onCategoryChange: PropTypes.func.isRequired,
    timeline: PropTypes.string,
    timelineOptions: PropTypes.instanceOf(Map),
    onTimelineChange: PropTypes.func.isRequired,
    tags: PropTypes.string,
    tagOptions: PropTypes.instanceOf(Map),
    onTagChange: PropTypes.func.isRequired,
}

export default function FilterSet({
    year,
    yearOptions,
    onYearChange,
    month,
    monthOptions,
    onMonthChange,
    category,
    categoryOptions,
    onCategoryChange,
    timeline,
    timelineOptions,
    onTimelineChange,
    tags,
    tagOptions,
    onTagChange
}) {
    return (
        <Base>
            {categoryOptions &&
                <FilterEntry>
                    <Dropdown value={category} onChange={onCategoryChange} options={categoryOptions}  placeholder={categoryOptions.get(undefined)}/>
                </FilterEntry>
            }
            {timelineOptions &&
                <FilterEntry>
                    <Dropdown value={timeline} onChange={onTimelineChange} options={timelineOptions}  placeholder={timelineOptions.get(undefined)}/>
                </FilterEntry>
            }
            {yearOptions &&
                <FilterEntry>
                    <Dropdown value={year} onChange={onYearChange} options={yearOptions} placeholder={yearOptions.get(undefined)} />
                </FilterEntry>
            }
            {monthOptions &&
                <FilterEntry>
                    <Dropdown value={month} onChange={onMonthChange} options={monthOptions} placeholder={monthOptions.get(undefined)} />
                </FilterEntry>
            }
            {tagOptions &&
                <FilterEntry>
                    <Dropdown value={tags} onChange={onTagChange} options={tagOptions} placeholder={'No tags'} />
                </FilterEntry>
            }
        </Base>
    )
}
