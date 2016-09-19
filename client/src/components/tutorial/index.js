
import React from 'react'

import {Link} from 'react-router'

import {Fragments} from 'prismic.io'
import CSSModules from 'react-css-modules'
import styles from './tutorial.css'
import menuTree from './tutorial-menu-tree.json'
import {Page,Main,Content} from 'components/page'
import {Media} from 'components/media'

//TODO(wnh):

const MenuItem = ({title, slug, children, currentPage}) => {
    let cc = null
    let showChildren = currentPage.startsWith(slug)
    let isActive = currentPage === slug
    if (showChildren) {
            cc = <ol>
                {children.map( c => <MenuItem currentPage={currentPage} {...c} /> )}
            </ol>
    }
    
    let showElipsis = !showChildren && children.length > 0
    let displayTitle = title + (showElipsis ? '...' : '')

    return (
        <li>
            <Link activeClassName={styles.active} to={`/tutorial/${slug}`}>{displayTitle}</Link>
            {cc}
        </li>
    )
}

const Gallery = ({imgs}) =>
    <div>
        {imgs.map( i => <GalleryImage {...flattenImage(i)} /> )}
    </div>

const flattenImage = (img) => {
    return {
        caption: ((img || {}).caption || {}).value,
        credit:  ((img || {}).credit || {}).value,
        url: ((((img || {}).picture || {}).value || {}).main || {}).url
    }
}

function GalleryImage({url, caption, credit }){
    console.info(url, caption, credit)
    if(!url) { return null }
    const cap = cap ? cap : ''
    const cred = credit ? `Photo ${credit}` : ''
    const split = cap && cred ? ' - ':''
    return (
        <div className={styles.Image}>
            <Media caption={`${cap}${split}${cred}`} >
                <img src={url} />
            </Media>
        </div>
    )
}
const SideBar = ({currentPage}) =>
    <ol className={styles.Sidebar}>
        { menuTree.map( c => <MenuItem currentPage={currentPage} {...c} /> ) }
    </ol>

function getHtml(doc, field)  {
    if(typeof doc.fragments[field] === 'undefined') {
        return ''
    }
    const t = new Fragments.StructuredText(doc.fragments['tutorial-page.text1'].blocks)
    return t.asHtml()
}

const TutorialPage = ({doc}) => {
    const t1 = getHtml(doc, 'tutorial-page.text1')
    const t2 = getHtml(doc, 'tutorial-page.text2')
    const t3 = getHtml(doc, 'tutorial-page.text3')
    const t4 = getHtml(doc, 'tutorial-page.text4')
    let gallery = []
    if(typeof doc.data['tutorial-page.gallery'] !== 'undefined') {
        gallery = doc.data['tutorial-page.gallery'].value
    }

    console.info(doc)

    return (
    <div>
        <h1>{doc.data['tutorial-page.title'].value}</h1>
        <div dangerouslySetInnerHTML={{__html: t1}} />
        {/* video here */}
        <div dangerouslySetInnerHTML={{__html: t2}} />
        <Gallery  imgs={gallery} />
        <div dangerouslySetInnerHTML={{__html: t3}} />
        {/* embedded content: raw HTML that comes from prismic :/ */}
        <div dangerouslySetInnerHTML={{__html: t4}} />
    </div>
    )
}

const Tutorial = (props) => {
    const {loading, error, doc, params} = props
    console.info(doc)
    console.info(props)
    return (
    <Page>
        <Content>
            <Main>
                <div styleName='TutorialPage'>
                    <SideBar  currentPage={params.splat} />
                    <div className={styles.TutorialContent}>
                        { loading && <p>Loading...</p> }
                        { doc && <TutorialPage doc={doc} /> }
                    </div>
                </div>
            </Main>
        </Content>
    </Page>
    )
}


export default CSSModules(Tutorial, styles)
