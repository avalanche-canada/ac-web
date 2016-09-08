import React from 'react'
import {compose, withHandlers, lifecycle, renameProp, withProps, withState} from 'recompose'
import {connect} from 'react-redux'
import moment from 'moment'
import Highlight from 'components/highlight'
import {InnerHTML} from 'components/misc'
import {loadForType} from 'actions/prismic'
import {yesterday, tomorrow} from 'utils/date'
import {Predicates} from 'prismic'
import parser from 'prismic/parser'
import {SessionStorage} from 'services/storage'

@connect(null, {loadForType})
export default class Container extends Component {
    state = {
        highlight: null
    }
    constructor() {
        this.storage = SessionStorage.create()
    }
    set highlight(highlight) {
        if (highlight) {
            highlight = parser.parse(highlight)
        }

        this.setState({highlight})
    }
    get highlight() {
        return this.state.highlight
    }
    get hidden() {
        return this.storage.get('highlight-hidden-status')
    }
    set hidden(value) {
        return this.storage.set('highlight-hidden-status', value)
    }
    componentDidMount() {
        this.load()
    }
    load() {
        return this.props.loadForType('highlight', {
            predicates: [
                Predicates.dateAfter('my.highlight.end_date', yesterday()),
                Predicates.dateBefore('my.highlight.start_date', tomorrow()),
            ]
        }).then(([document]) => this.highlight = document)
    }
    handleDismiss: () => {
        this.hidden = true
        this.highlight = null
    }
    render() {
        if (!this.highlight || this.hidden === true) {
            return null
        }

        const {description, style} = this.highlight

        return (
            <Highlight style={style} onDismiss={this.handleDismiss}>
                <InnerHTML>
                    {description}
                </InnerHTML>
            </Highlight>
        )
    }
}
