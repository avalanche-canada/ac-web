import {lifecycle} from  'recompose'
import {Api} from '/prismic'
import {Predicates} from '/prismic.io'
import Tutorial from '/components/tutorial'

export default lifecycle({
    componentWillMount() {
        this.load(this.props.params.splat)
    },
    componentWillReceiveProps({params: {splat}}) {
        if (this.props.params.splat !== splat) {
            this.load(splat)
        }
    },
    load(slug) {
        let promise

        this.setState({loading: true, isError: false, doc: null})

        if (slug === '') {
            promise = Api.QueryDocumentByBookmark('tutorial-home')
        } else {
            promise = Api.Query([
                Predicates.at('document.type', 'tutorial-page'),
                Predicates.at('my.tutorial-page.slug', slug)
            ]).then(r => r.results[0])
        }

        promise.then(this.success, this.error)
    },
    success(doc) {
        this.setState({loading:false, isError: false, doc: doc})
    },
    error(err) {
       this.setState({loading:false, isError: true, err: err})
       throw err
    }
})(Tutorial)
