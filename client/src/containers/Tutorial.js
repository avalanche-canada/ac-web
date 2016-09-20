
import {lifecycle, compose, branch} from  'recompose'
import connector from 'containers/connectors/connector'
import {Query, QueryDocumentByBookmark} from 'prismic/api'
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
            q = QueryDocumentByBookmark('tutorial-home')
        } else {
            q = Query([Predicates.at('document.type', 'tutorial-page'),
                       Predicates.at('my.tutorial-page.slug', slug)])
                .then(r => r.results[0])
        }

        q.then(this.success)
         .catch(this.error)
    },


    success(doc) {
        this.setState({loading:false, isError: false, doc: doc})
    },

    error(err) { 
       this.setState({loading:false, isError: true, err: err})
       console.error("ERROR", err)
    }
})


export default tutorialContainer(Tutorial)
