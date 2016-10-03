import React, {PropTypes} from 'react'
import {compose, defaultProps, mapProps, lifecycle, withProps, withHandlers} from 'recompose'
import {FilterSet, FilterEntry} from 'components/filter'
import {Page, Content, Header, Main} from 'components/page'
import {DropdownFromOptions as Dropdown} from 'components/controls'
import {Muted} from 'components/misc'
import Entry from './Entry'
import EntrySet from './EntrySet'

Feed.propTypes = {
    content: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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
    message,
    year,
    yearOptions,
    onYearChange,
    month,
    monthOptions,
    onMonthChange,
    category,
    categoryOptions,
    onCategoryChange,
    tags,
    tagOptions,
    onTagChange
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <FilterSet>
                        {categoryOptions &&
                            <FilterEntry>
                                <Dropdown value={category} onChange={onCategoryChange} options={categoryOptions}  placeholder={categoryOptions.get(undefined)}/>
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
                    </FilterSet>
                    {message && <Muted>{message}</Muted>}
                    <EntrySet>
                        {content.map(entry => <Entry key={entry.uid} {...entry} />)}
                    </EntrySet>
                </Main>
            </Content>
        </Page>
    )
}
