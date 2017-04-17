import React from 'react'
import PropTypes from 'prop-types'
import {compose, lifecycle, withState} from 'recompose'
import {Link} from 'react-router'
import {Fragments} from 'prismic.io'
import CSSModules from 'react-css-modules'
import styles from './tutorial.css'
import {Page, Main, Content} from '~/components/page'
import {Media, Player} from '~/components/media'
import AtesExercise from './AtesExercise'
import {fetchStaticResource} from '~/api'
import get from 'lodash/get'

const ATES_EXERCISE_SLUG = 'avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise'

function findSlug(pages, prismicSlug) {
    for(var i = 0; i < pages.length; i++)  {
        const page = pages[i]
        const clean = page.slug.replace(/\//g, '')

        if (clean === prismicSlug) {
            return page.slug
        } else {
            const next = findSlug(page.children, prismicSlug)

            if (next) {
                return next
            }
        }
    }
}

function linkResolverFactory(menuTree) {
    return function linkResolver(doc) {
        if (doc.type === 'tutorial-page') {
            const realSlug = findSlug(menuTree, doc.slug)

            return `/tutorial/${realSlug}`
        }
    }
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    currentPage: PropTypes.number,
}

function MenuItem({title, slug, children, currentPage}) {
    let cc = null
    let showChildren = currentPage.startsWith(slug)

    /* FIXME(wnh): Encode the URL so that '?' -> '%3F'
     * encodeURIComponent  does lots of stuff including '/' so we convert that
     * one back
     */
    let encodedSlug = encodeURIComponent(slug).replace(/%2F/g, '/')

    if (showChildren) {
        cc = (
            <ul>
                {children.map(c => <MenuItem key={c.slug} currentPage={currentPage} {...c} />)}
            </ul>
        )
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

Gallery.propTypes = {
    imgs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function Gallery({imgs}) {
    return (
        <div>
            {imgs.map((image, index) => (
                <GalleryImage key={index} {...flattenImage(image)} />
            ))}
        </div>
    )
}


function flattenImage(img) {
    return {
        caption: get(img, 'caption.value'),
        credit: get(img, 'credit.value'),
        url: get(img, 'picture.value.main.url'),
    }
}

GalleryImage.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
}

function GalleryImage({url, caption, credit}){
    if (!url) {
        return null
    }

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

SideBar.propTypes = {
    menuTree: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
}

function SideBar({menuTree, currentPage}) {
    return (
        <ul className={styles.Sidebar}>
            {menuTree.map(c =>
                <MenuItem key={c.slug} currentPage={currentPage} {...c} />
            )}
        </ul>
    )
}

Video.propTypes = {
    src: PropTypes.string.isRequired,
}

function Video({src}) {
    return (
        <Media>
            <Player src={src} />
        </Media>
    )
}

TextBlock.propTypes = {
    field: PropTypes.object,
    linkResolver: PropTypes.func.isRequired,
}

function TextBlock({field, linkResolver}) {
    if (field === undefined) {
        return null
    }

    const t = new Fragments.StructuredText(field.blocks)

    return <div className={styles.TextBlock} dangerouslySetInnerHTML={{__html: t.asHtml(linkResolver)}} />
}


TutorialPage.propTypes = {
    doc: PropTypes.object,
    linkResolver: PropTypes.func.isRequired,
}

function TutorialPage({doc, linkResolver}) {
    let gallery = []
    if(typeof doc.data['tutorial-page.gallery'] !== 'undefined') {
        gallery = doc.data['tutorial-page.gallery'].value
    }

    const vid =doc.data['tutorial-page.video-source']


    return (
        <div>
            <h1>{doc.data['tutorial-page.title'].value}</h1>

            <TextBlock field={doc.fragments['tutorial-page.text1']} linkResolver={linkResolver} />

            {/* video here */}

            {vid && vid.value && <Video src={vid.value} />}

            <TextBlock field={doc.fragments['tutorial-page.text2']} linkResolver={linkResolver} />

            <Gallery  imgs={gallery} />

            <TextBlock field={doc.fragments['tutorial-page.text3']} linkResolver={linkResolver} />

            {/* embedded content: raw HTML that comes from prismic :/ */}

            <TextBlock field={doc.fragments['tutorial-page.text4']} linkResolver={linkResolver} />
        </div>
    )
}

Tutorial.propTypes = {
    loading: PropTypes.bool.isRequired,
    doc: PropTypes.object,
    params: PropTypes.object,
    menuTree: PropTypes.object.isRequired,
}

function Tutorial({loading, doc, params, menuTree}) {
    let page = null
    let isAtes = params.splat === ATES_EXERCISE_SLUG

    if (isAtes) {
        page = <AtesExercise />
    } else if (params.splat === ''){
        page = doc && <TutorialHome doc={doc} />
    } else {
        page = doc && <TutorialPage doc={doc} linkResolver={linkResolverFactory(menuTree)} />
    }

    return (
        <Page>
            <Content>
                <Main>
                    <div styleName='TutorialPage'>
                        <SideBar currentPage={params.splat} menuTree={menuTree} />
                        <div className={styles.TutorialContent}>
                            {loading && !isAtes && <p>Loading...</p>}
                            {page}
                        </div>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}


TutorialHome.propTypes = {
    doc: PropTypes.object.isRequired,
}

function TutorialHome({doc}) {
    let title = doc.data['generic.title'].value
    return (
        <div>
            <h1> {title}</h1>
            <TextBlock field={doc.fragments['generic.body']} />
        </div>
    )
}

export default compose(
    withState('menuTree', 'setMenuTree', []),
    lifecycle({
        componentDidMount() {
            const {setMenuTree} = this.props

            fetchStaticResource('tutorial-menu-tree.json').then(response => {
                setMenuTree(response.data)
            })
        }
    }),
    CSSModules(styles)
)(Tutorial)
