import React, { PropTypes } from 'react'
import {compose} from 'recompose'
import {FilterSet, FilterEntry} from 'components/filter'
import {Page, Header, Main} from 'components/page'
import {DropdownFromOptions as Dropdown, DropdownOption} from 'components/controls'
import {Muted} from 'components/misc'
import Entry from './Entry'

Feed.propTypes = {
    content: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    sponsor: PropTypes.object,
    message: PropTypes.string,
    year: PropTypes.number,
    yearOptions: PropTypes.instanceOf(Map),
    onYearChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    monthOptions: PropTypes.instanceOf(Map),
    onMonthChange: PropTypes.func.isRequired,
    category: PropTypes.string,
    categoryOptions: PropTypes.instanceOf(Map),
    onCategoryChange: PropTypes.func.isRequired,
    tags: PropTypes.string,
    onTagChange: PropTypes.func.isRequired,
}

export default function Feed({
    content = [],
    title,
    sponsor = null,
    message,
    year,
    yearOptions = new Map(),
    onYearChange,
    month,
    monthOptions = new Map(),
    onMonthChange,
    category,
    categoryOptions = new Map(),
    onCategoryChange,
    tags,
    tagOptions = new Map(),
    onTagChange
}) {
    return (
        <Page>
            <Header title={title} sponsor={sponsor} />
            <FilterSet>
                {onCategoryChange &&
                    <FilterEntry>
                        <Dropdown value={category} onChange={onCategoryChange} options={categoryOptions} />
                        </FilterEntry>
                }
                {onYearChange &&
                    <FilterEntry>
                        <Dropdown value={year} onChange={onYearChange} options={yearOptions} />
                        </FilterEntry>
                }
                {onMonthChange &&
                    <FilterEntry>
                        <Dropdown value={month} onChange={onMonthChange} options={monthOptions} />
                        </FilterEntry>
                }
                {onTagChange &&
                    <FilterEntry>
                        <Dropdown value={tags} onChange={onTagChange} options={tagOptions} />
                        </FilterEntry>
                }
            </FilterSet>
            <Main>
                {message && <Muted>{message}</Muted>}
                {content.map(entry => <Entry {...entry} />)}
            </Main>
        </Page>
    )
}
