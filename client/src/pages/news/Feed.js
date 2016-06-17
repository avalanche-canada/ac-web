import React, { PropTypes } from 'react'
import {compose} from 'recompose'
import moment from 'moment'
import {FilterSet, FilterEntry} from 'components/filter'
import {Page, Header, Main} from 'components/page'
import {Dropdown, Option} from 'components/controls'
import Entry from './Entry'

function K() {}

const months = moment.months()
const years = Array(5).fill(new Date().getFullYear()).map((year, index) => year - index)

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    onYearChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
}

export default function Feed({feed = [], onYearChange = K, onMonthChange = K, onTagChange = K}) {
    return (
        <Page>
            <Header title='Recent News' />
            <FilterSet>
                <FilterEntry>
                    <Dropdown placeholder='Year' onChange={onYearChange}>
                        {years.map((year, index) => <Option value={year}>{year}</Option>)}
                    </Dropdown>
                </FilterEntry>
                <FilterEntry>
                    <Dropdown placeholder='Month' onChange={onMonthChange}>
                        {months.map((month, index) => <Option value={index}>{month}</Option>)}
                    </Dropdown>
                </FilterEntry>
                <FilterEntry>
                    <Dropdown placeholder='Tags (00)' onChange={onTagChange}>
                        {months.map((month, index) => <Option value={index}>{month}</Option>)}
                    </Dropdown>
                </FilterEntry>
            </FilterSet>
            <Main>
                {feed.map(entry => <Entry {...entry} condense />)}
            </Main>
        </Page>
    )
}
