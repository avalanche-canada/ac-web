import React, {PropTypes} from 'react'
import {compose, withProps, setPropTypes, withState, lifecycle, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {Predicates} from 'prismic'
import Sidebar, {Header, Item} from 'components/sidebar'
import Link from 'prismic/components/Link'
import moment from 'moment'

const Headers = new Map([
    ['blog', 'Latest'],
    ['news', 'Latest'],
    ['event', 'Upcoming events'],
])

export default compose(
    setPropTypes({
        type: PropTypes.oneOf(['blog', 'news', 'event']).isRequired,
        uid: PropTypes.string,
    }),
    defaultProps({
        share: true,
        follow: true,
    }),
    connect(undefined, {
        loadForType
    }),
    withState('documents', 'setDocuments', []),
    lifecycle({
        componentDidMount() {
            const {type, uid, loadForType, setDocuments} = this.props
            let predicate
            let ordering

            if (type === 'event') {
                const date = moment().startOf('day').subtract(1, 'day').format('YYYY-MM-DD')

                predicate = Predicates.dateAfter('my.event.start_date', date)
                ordering = 'my.event.start_date'
            } else {
                predicate = Predicates.at('document.tags', ['featured'])
                ordering = `my.${type}.date desc`
            }

            loadForType(type, {
                pageSize: 7,
                orderings: [ordering],
                predicates: [predicate],
            }).then(({results}) => setDocuments(results))
        }
    }),
    withProps(({documents, uid, type}) => {
        const header = Headers.get(type)
        documents = documents.filter(document => document.uid !== uid)

        return {
            children: [
                <Header>{header}</Header>,
                ...documents.map(document => (
                    <Item key={document.uid}>
                        <Link document={document} />
                    </Item>
                ))
            ]
        }
    })
)(Sidebar)
