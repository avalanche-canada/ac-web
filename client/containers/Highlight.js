import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Highlight from '~/components/highlight'
import {InnerHTML} from '~/components/misc'
import {load} from '~/actions/prismic'
import format from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'
import {Predicates} from '~/prismic'
import parser from '~/prismic/parser'
import {SessionStorage} from '~/services/storage'

@connect(null, {load})
export default class Container extends Component {
    static propTypes = {
        load: PropTypes.func.isRequired,
    }
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
                Predicates.dateBefore('my.highlight.start_date', format(startOfTomorrow(), 'YYYY-MM-DD')),
                Predicates.dateAfter('my.highlight.end_date', format(startOfYesterday(), 'YYYY-MM-DD')),
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

        const {description, style} = this.highlight

        return (
            <Highlight style={style} onDismiss={this.handleDismiss} dismissable>
                <InnerHTML>
                    {description}
                </InnerHTML>
            </Highlight>
        )
    }
}
