import React, {Component} from 'react'
import {Api} from '~/prismic'
import {Predicates} from 'prismic.io'
import Base from '~/components/tutorial'

export default class Tutorial extends Component {
    state = {
        isLoading: false,
        isError: false,
        document: null,
        error: null,
    }
    load(slug) {
        let promise

        this.setState({isLoading: true, isError: false, document: null})

        if (slug === '') {
            promise = Api.QueryDocumentByBookmark('tutorial-home')
        } else {
            promise = Api.Query([
                Predicates.at('document.type', 'tutorial-page'),
                Predicates.at('my.tutorial-page.slug', slug)
            ]).then(response => response.results[0])
        }

        promise.then(this.onSuccess, this.onError)
    }
    onSuccess = document => {
        this.setState({
            isLoading: false,
            isError: false,
            document
        })
    }
    onError = error => {
        this.setState({
            isLoading: false,
            isError: true,
            error
        })

        throw error
    }
    componentWillMount() {
        this.load(this.props.params.splat)
    }
    componentWillReceiveProps({params: {splat}}) {
        if (this.props.params.splat !== splat) {
            this.load(splat)
        }
    }
    render() {
        return <Base {...this.state} {...this.props} />
    }
}
