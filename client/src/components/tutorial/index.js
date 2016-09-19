
import React from 'react'

import {Link} from 'react-router'

import {Fragments} from 'prismic.io'
import CSSModules from 'react-css-modules'
import styles from './tutorial.css'
import menuTree from './tutorial-menu-tree.json'


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
    let isActive = currentPage === slug
    if (showChildren) {
            cc = <ol>
                {children.map( c => <MenuItem currentPage={currentPage} {...c} /> )}
            </ol>
    }
    
    let showElipsis = !showChildren && children.length > 0
    let displayTitle = title + (showElipsis ? '...' : '')

    return <li>
        <Link activeClassName={styles.active} to={`/tutorial/${slug}`}>{displayTitle}</Link>
        {cc}
    </li>
}

const SideBar = ({currentPage}) =>
    <ol className={styles.Sidebar}>
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
        <div className={styles.TutorialPage}>
            <SideBar  currentPage={params.splat} />
            <div className={styles.TutorialContent}>
                { loading && <p>Loading...</p> }
                { doc && <TutorialPage doc={doc} /> }
            </div>
        </div>
    )
}


export default CSSModules(Tutorial, styles)
