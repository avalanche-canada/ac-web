import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, withHandlers} from 'recompose'
import {FilterSet, Feed} from '~/containers/feed'
import {Page, Content, Header, Main} from '~/components/page'
import {valueHandlerFactory, arrayValueHandlerFactory} from '~/utils/router'
import {withRouter} from 'react-router'

Layout.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Layout({type, title, ...query}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <FilterSet type={type} {...query} />
                    <Feed type={type} {...query} />
                </Main>
            </Content>
        </Page>
    )
}

function toSet(tags) {
    if (Array.isArray(tags)) {
        return new Set(tags)

    }

    if (typeof tags === 'string') {
        return new Set([tags])
    }

    return new Set()
}

export default compose(
    withRouter,
    withProps(props => {
        const {year, month, category, tags, timeline} = props.location.query

        return {
            year: year ? Number(year) : year,
            month,
            category,
            timeline,
            tags: toSet(tags),
        }
    }),
    withHandlers({
        onYearChange: valueHandlerFactory('year'),
        onMonthChange: valueHandlerFactory('month'),
        onCategoryChange: valueHandlerFactory('category'),
        onTimelineChange: valueHandlerFactory('timeline'),
        onTagChange: arrayValueHandlerFactory('tags'),
    }),
)(Layout)
