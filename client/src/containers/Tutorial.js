
import {lifecycle, compose, branch} from  'recompose'
import {Api} from 'prismic'
import {Predicates} from 'prismic.io'
import Tutorial from 'components/tutorial'

const tutorialContainer = lifecycle({
    componentWillMount() {
        this.load(this.props.params.splat)
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.params.splat !== nextProps.params.splat) {
            this.load(nextProps.params.splat)
        }
    },
    load(slug) {
        this.setState({loading: true, isError: false, doc: null})

        let q = undefined;
        if (slug === '') {
            q = Api.QueryDocumentByBookmark('tutorial-home')
        } else {
            q = Api.Query([Predicates.at('document.type', 'tutorial-page'),
                       Predicates.at('my.tutorial-page.slug', slug)])
                .then(r => r.results[0])
        }

        q.then(this.success, this.error)
    },
    success(doc) {
        this.setState({loading:false, isError: false, doc: doc})
    },
    error(err) {
       this.setState({loading:false, isError: true, err: err})
       throw err
    }
})

export default tutorialContainer(Tutorial)
