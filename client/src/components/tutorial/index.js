
import React from 'react'

import {Link} from 'react-router'

import {Fragments} from 'prismic.io'
import CSSModules from 'react-css-modules'
import styles from './tutorial.css'
import {Page,Main,Content} from 'components/page'
import {Media, Player} from 'components/media'

import menuTree from './tutorial-menu-tree.json'


function findSlug(pages, prismicSlug) {
    for(var i = 0; i < pages.length; i++)  {
        var page = pages[i]
        var clean = page.slug.replace(/\//g, '')
        if (clean === prismicSlug) {
            return page.slug;
        } else {
            var next = findSlug(page.children, prismicSlug);
            if(next) return next;
        }
    }
}

function linkResolver(doc) {
    if (doc.type === 'tutorial-page') {
        var realSlug = findSlug(menuTree, doc.slug)
        return `/tutorial/${realSlug}`
    }
}

const MenuItem = ({title, slug, children, currentPage}) => {
    let cc = null
    let showChildren = currentPage.startsWith(slug)
    let isActive = currentPage === slug

    /* FIXME(wnh): Encode the URL so that '?' -> '%3F'
     * encodeURIComponent  does lots of stuff including '/' so we convert that
     * one back
     */
    let encodedSlug = encodeURIComponent(slug).replace(/%2F/g, '/')

    if (showChildren) {
            cc = <ol>
                {children.map( c => <MenuItem currentPage={currentPage} {...c} /> )}
            </ol>
    }
    
    let showElipsis = !showChildren && children.length > 0
    let displayTitle = title + (showElipsis ? '...' : '')

    return (
        <li>
            <Link activeClassName={styles.active} to={`/tutorial/${encodedSlug}`}>{displayTitle}</Link>
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
    if(!url) { return null }
    const cap = caption ? caption : ''
    const cred = credit ? `Photo: ${credit}` : ''
    const split = cap && cred ? ' - ':''
    return (
        <div className={styles.ImageContainer}>
            <Media caption={`${cap}${split}${cred}`} >
                <img className={styles.Image}src={url} />
            </Media>
        </div>
    )
}
const SideBar = ({currentPage}) =>
    <ol className={styles.Sidebar}>
        { menuTree.map( c => <MenuItem currentPage={currentPage} {...c} /> ) }
    </ol>


const Video = ({src}) =>
    <Media>
        <Player src={src} />
    </Media>


const TextBlock =  ({field}) => {
    if (typeof field === 'undefined') {
        return null
    }
    const t = new Fragments.StructuredText(field.blocks)
    return <div className={styles.TextBlock} dangerouslySetInnerHTML={{__html: t.asHtml(linkResolver)}} />
}

const TutorialPage = ({doc}) => {
    let gallery = []
    if(typeof doc.data['tutorial-page.gallery'] !== 'undefined') {
        gallery = doc.data['tutorial-page.gallery'].value
    }

    const vid =doc.data['tutorial-page.video-source'] 


    return (
    <div>
        <h1>{doc.data['tutorial-page.title'].value}</h1>

        <TextBlock field={doc.fragments['tutorial-page.text1']} />

        {/* video here */}

        {vid && vid.value && <Video src={vid.value} />}

        <TextBlock field={doc.fragments['tutorial-page.text2']} />

        <Gallery  imgs={gallery} />

        <TextBlock field={doc.fragments['tutorial-page.text3']} />

        {/* embedded content: raw HTML that comes from prismic :/ */}

        <TextBlock field={doc.fragments['tutorial-page.text4']} />
    </div>
    )
}

const Tutorial = (props) => {
    const {loading, error, doc, params} = props
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
