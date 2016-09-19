
import React from 'react'
import {lifecycle, compose, mapProps} from  'recompose'
import connector from 'containers/connectors/connector'
import {Query} from 'prismic/api'
import {Predicates, Fragments} from 'prismic.io'

import menuTree from './tutorial-menu-tree.json'

console.info(menuTree)

function getHtml(doc, field)  {
    if(typeof doc.fragments[field] === 'undefined') {
        return ''
    }
    const t = new Fragments.StructuredText(doc.fragments['tutorial-page.text1'].blocks)
    return t.asHtml()
}


const MenuItem = ({title, slug, children, currentPage}) => {
    console.info({title, slug, children, currentPage})
    var cc = null
    let showChildren = currentPage.startsWith(slug)
    if (showChildren) {
            cc = <ol>
                {children.map( c => <MenuItem currentPage={currentPage} {...c} /> )}
            </ol>
    }
    
    let showElipsis = !showChildren && children.length > 0

    return <li>
        <a href={`/tutorial/${slug}`}>{title}{showElipsis && '...'}</a>
        {cc}
    </li>
}

const SideBar = ({currentPage}) =>
    <ol>
        { menuTree.map( c => <MenuItem currentPage={currentPage} {...c} /> ) }
    </ol>

const TutorialPage = ({doc}) => {
    const t1 = getHtml(doc, 'tutorial-page.text1')
    const t2 = getHtml(doc, 'tutorial-page.text2')
    const t3 = getHtml(doc, 'tutorial-page.text3')
    const t4 = getHtml(doc, 'tutorial-page.text4')

    return (
    <div>
        <h1>{doc.data['tutorial-page.title'].value}</h1>
        <div dangerouslySetInnerHTML={{__html: t1}} />
        <div dangerouslySetInnerHTML={{__html: t2}} />
        <div dangerouslySetInnerHTML={{__html: t3}} />
        <div dangerouslySetInnerHTML={{__html: t4}} />
    </div>
    )
}

const Tutorial = (props) => {
    const {loading, error, doc, params} = props
    console.info(doc)
    console.info(props)
    return (
        <div>
            { loading && <p>Loading...</p> }
            { error && <b>ERROR.. {error}</b> }
            <SideBar  currentPage={params.splat} />
            { doc && <TutorialPage doc={doc} /> }
        </div>
    )
}





const tutorialReq = lifecycle({
    componentWillMount() {

        let slug = this.props.params.splat

        this.setState({loading: true, isError: false})

        Query([Predicates.at('document.type', 'tutorial-page'),
               Predicates.at('my.tutorial-page.slug', slug)])
            .then(this.success)
            .catch( e => console.error("ERROR", e))
    },

    success(doc) {
        if(doc.results_size !== 1 ) {
            console.warn('Expected 1 document, got ', doc.results_size)
        }
        this.setState({loading:false, isError: false, doc: doc.results[0]})
    },
    error(err) {
       this.setState({loading:false, isError: true, err: err})
    }
})


export default compose(
    tutorialReq,
    //mapProps((props) => {return {pageSlug: props.routeParams.splat, loading: props.loading}})
)(Tutorial)
