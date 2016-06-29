import React, { PropTypes } from 'react'
import {compose} from 'recompose'
import {FilterSet, FilterEntry} from 'components/filter'
import {Page, Header, Main} from 'components/page'
import {DropdownFromOptions as Dropdown, DropdownOption} from 'components/controls'
import {Muted} from 'components/misc'
import Entry from './Entry'

function K() {}

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    message: PropTypes.string,
    year: PropTypes.number,
    yearOptions: PropTypes.instanceOf(Map),
    onYearChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    monthOptions: PropTypes.instanceOf(Map),
    onMonthChange: PropTypes.func.isRequired,
    tags: PropTypes.string,
    onTagChange: PropTypes.func.isRequired,
}

export default function Feed({
    feed = [],
    message,
    year,
    yearOptions = new Map(),
    month,
    monthOptions = new Map(),
    tags,
    tagOptions = new Map(),
    onYearChange = K,
    onMonthChange = K,
    onTagChange = K
}) {
    return (
        <Page>
            <Header title='Recent News' />
            <FilterSet>
                <FilterEntry>
                    <Dropdown value={year} onChange={onYearChange} options={yearOptions} />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown value={month} onChange={onMonthChange} options={monthOptions} />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown value={tags} onChange={onTagChange} options={tagOptions} />
                </FilterEntry>
            </FilterSet>
            <Main>
                {message && <Muted>{message}</Muted>}
                {feed.map(entry => <Entry {...entry} />)}
            </Main>
        </Page>
    )
}
