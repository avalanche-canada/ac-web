import { Component } from 'react'
import PropTypes from 'prop-types'
import { SessionStorage } from 'services/storage'

export default class Bundle extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        load: PropTypes.func.isRequired,
    }
    state = {
        module: null,
    }
    componentDidMount() {
        this.load()
    }
    componentDidUpdate({ load }) {
        if (load !== this.props.load) {
            this.setState({ module: null }, this.load)
        }
    }
    load = () => {
        try {
            this.props.load(module => {
                this.setState({ module }, () => {
                    STORAGE.set(KEY, null)
                })
            })
        } catch (error) {
            const { href } = window.location

            // We will try a full reload to see if it solves the issue
            if (error instanceof SyntaxError && STORAGE.get(KEY) !== href) {
                STORAGE.set(KEY, href)

                window.location.reload(true)
            } else {
                throw error
            }
        }
    }
    render() {
        return this.props.children(this.state.module)
    }
}

const STORAGE = SessionStorage.create()
const KEY = 'bundle.reloaded'
