
import {lifecycle, compose, mapProps} from  'recompose'
import connector from 'containers/connectors/connector'
import {Query} from 'prismic/api'
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

        Query([Predicates.at('document.type', 'tutorial-page'),
               Predicates.at('my.tutorial-page.slug', slug)])
            .then(this.success)
            .catch(this.error)
    },


    success(doc) {
        if(doc.results_size !== 1 ) {
            console.warn('Expected 1 document, got ', doc.results_size)
        }
        this.setState({loading:false, isError: false, doc: doc.results[0]})
    },

    error(err) { 
       this.setState({loading:false, isError: true, err: err})
       console.error("ERROR", e)
    }
})


export default tutorialContainer(Tutorial)
