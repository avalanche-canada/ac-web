import React, { PropTypes } from 'react'
import {compose} from 'recompose'
import {FilterSet, FilterEntry} from 'components/filter'
import {Page, Header, Main} from 'components/page'
import {Dropdown, Option} from 'components/controls'
import {Muted} from 'components/misc'
import Entry from './Entry'

function K() {}

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    message: PropTypes.string,
    year: PropTypes.number,
    yearOptions: PropTypes.array,
    onYearChange: PropTypes.func.isRequired,
    month: PropTypes.number,
    monthOptions: PropTypes.array,
    onMonthChange: PropTypes.func.isRequired,
    tags: PropTypes.array,
    onTagChange: PropTypes.func.isRequired,
}

export default function Feed({
    feed = [],
    message,
    year,
    yearOptions = [],
    month,
    monthOptions = [],
    tags = [],
    tagOptions = [],
    onYearChange = K,
    onMonthChange = K,
    onTagChange = K
}) {
    return (
        <Page>
            <Header title='Recent News' />
            <FilterSet>
                <FilterEntry>
                    <Dropdown placeholder='Year' value={Number(year)} onChange={onYearChange}>
                        {/*{yearOptions.map((year, index) => <Option value={year}>{year}</Option>)}*/}
                    </Dropdown>
                </FilterEntry>
                <FilterEntry>
                    <Dropdown placeholder='Month' value={Number(month)} onChange={onMonthChange}>
                        {/*{monthOptions.map((month, index) => <Option value={index}>{month}</Option>)}*/}
                    </Dropdown>
                </FilterEntry>
                <FilterEntry>
                    <Dropdown placeholder={`Tags${tagOptions.length === 0 ? '' : ` (${tagOptions.length})`}`} onChange={onTagChange}>
                        {tagOptions.map(tag => <Option value={tag}>{tag}</Option>)}
                    </Dropdown>
                </FilterEntry>
            </FilterSet>
            <Main>
                {message && <Muted>{message}</Muted>}
                {feed.map(entry => <Entry {...entry} />)}
            </Main>
        </Page>
    )
}
