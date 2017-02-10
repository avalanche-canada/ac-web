import React, {Component} from 'react'
import {compose, withHandlers, lifecycle, renameProp, withProps, withState} from 'recompose'
import {connect} from 'react-redux'
import moment from 'moment'
import Highlight from 'components/highlight'
import {InnerHTML} from 'components/misc'
import {load} from 'actions/prismic'
import {yesterday, tomorrow, formatAsDay} from 'utils/date'
import {Predicates} from 'prismic'
import parser from 'prismic/parser'
import {SessionStorage} from 'services/storage'

@connect(null, {load})
export default class Container extends Component {
    state = {
        highlight: null
    }
    constructor(props) {
        super(props)

        this.storage = SessionStorage.create()
    }
    set highlight(highlight = null) {
        this.setState({highlight})
    }
    get highlight() {
        return this.state.highlight
    }
    get hidden() {
        return this.storage.get('highlight-hidden-status')
    }
    set hidden(hidden) {
        return this.storage.set('highlight-hidden-status', hidden)
    }
    componentDidMount() {
        this.load()
    }
    load() {
        return this.props.load({
            type: 'highlight',
            predicates: [
                Predicates.dateBefore('my.highlight.start_date', formatAsDay(tomorrow())),
                Predicates.dateAfter('my.highlight.end_date', formatAsDay(yesterday())),
            ]
        }).then(response => {
            const {results: [highlight]} = response

            this.highlight = highlight ? parser.parse(highlight) : null
        })
    }
    handleDismiss = () => {
        this.hidden = true
        this.highlight = null
    }
    render() {
        if (!this.highlight || this.hidden === true) {
            return null
        }

        const {description, style, link} = this.highlight

        return (
            <Highlight style={style} onDismiss={this.handleDismiss} dismissable>
                <InnerHTML>
                    {description}
                </InnerHTML>
            </Highlight>
        )
    }
}
