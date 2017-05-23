import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withState } from 'recompose'
import Link from 'react-router/lib/Link'
import { Fragments } from 'prismic.io'
import CSSModules from 'react-css-modules'
import styles from './tutorial.css'
import { Page, Main, Content } from '~/components/page'
import { Media, Player, Caption } from '~/components/media'
import AtesExercise from './AtesExercise'
import { fetchStaticResource } from '~/api'
import { Loading } from '~/components/misc'
import get from 'lodash/get'

const ATES_EXERCISE_SLUG =
    'avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise'

function findSlug(pages, prismicSlug) {
    for (var i = 0; i < pages.length; i++) {
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
    return function linkResolver(document) {
        if (document.type === 'tutorial-page') {
            const realSlug = findSlug(menuTree, document.slug)

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

function MenuItem({ title, slug, children, currentPage }) {
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
                {children.map(c => (
                    <MenuItem key={c.slug} currentPage={currentPage} {...c} />
                ))}
            </ul>
        )
    }

    let showElipsis = !showChildren && children.length > 0
    let displayTitle = title + (showElipsis ? '...' : '')

    return (
        <li>
            <Link
                activeClassName={styles.active}
                to={`/tutorial/${encodedSlug}`}>
                {displayTitle}
            </Link>
            {cc}
        </li>
    )
}

Gallery.propTypes = {
    imgs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function Gallery({ imgs }) {
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

function GalleryImage({ url, caption, credit }) {
    if (!url) {
        return null
    }

    const cap = caption ? caption : ''
    const cred = credit ? `Photo: ${credit}` : ''
    const split = cap && cred ? ' - ' : ''
    return (
        <div className={styles.ImageContainer}>
            <Media>
                <img className={styles.Image} src={url} />
                <Caption>
                    {cap + split + cred}
                </Caption>
            </Media>
        </div>
    )
}

SideBar.propTypes = {
    menuTree: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
}

function SideBar({ menuTree, currentPage }) {
    return (
        <ul className={styles.Sidebar}>
            {menuTree.map(c => (
                <MenuItem key={c.slug} currentPage={currentPage} {...c} />
            ))}
        </ul>
    )
}

Video.propTypes = {
    src: PropTypes.string.isRequired,
}

function Video({ src }) {
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

function TextBlock({ field, linkResolver }) {
    if (field === undefined) {
        return null
    }

    const t = new Fragments.StructuredText(field.blocks)

    return (
        <div
            className={styles.TextBlock}
            dangerouslySetInnerHTML={{ __html: t.asHtml(linkResolver) }}
        />
    )
}

TutorialPage.propTypes = {
    document: PropTypes.object,
    linkResolver: PropTypes.func.isRequired,
}

function TutorialPage({ document, linkResolver }) {
    let gallery = []
    if (typeof document.data['tutorial-page.gallery'] !== 'undefined') {
        gallery = document.data['tutorial-page.gallery'].value
    }

    const vid = document.data['tutorial-page.video-source']

    return (
        <div>
            <h1>{document.data['tutorial-page.title'].value}</h1>

            <TextBlock
                field={document.fragments['tutorial-page.text1']}
                linkResolver={linkResolver}
            />

            {/* video here */}

            {vid && vid.value && <Video src={vid.value} />}

            <TextBlock
                field={document.fragments['tutorial-page.text2']}
                linkResolver={linkResolver}
            />

            <Gallery imgs={gallery} />

            <TextBlock
                field={document.fragments['tutorial-page.text3']}
                linkResolver={linkResolver}
            />

            {/* embedded content: raw HTML that comes from prismic :/ */}

            <TextBlock
                field={document.fragments['tutorial-page.text4']}
                linkResolver={linkResolver}
            />
        </div>
    )
}

Tutorial.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    document: PropTypes.object,
    params: PropTypes.object.isRequired,
    menuTree: PropTypes.object.isRequired,
}

function Tutorial({ isLoading, document, params, menuTree }) {
    const { splat } = params
    const isAtes = splat === ATES_EXERCISE_SLUG
    let page = null

    if (isAtes) {
        page = <AtesExercise />
    } else if (splat === '') {
        page = document && <TutorialHome document={document} />
    } else {
        page =
            document &&
            <TutorialPage
                document={document}
                linkResolver={linkResolverFactory(menuTree)}
            />
    }

    return (
        <Page>
            <Content>
                <Main>
                    <div styleName="TutorialPage">
                        <SideBar currentPage={splat} menuTree={menuTree} />
                        <div className={styles.TutorialContent}>
                            {isLoading && !isAtes && <Loading />}
                            {page}
                        </div>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}

TutorialHome.propTypes = {
    document: PropTypes.object.isRequired,
}

function TutorialHome({ document }) {
    let title = document.data['generic.title'].value
    return (
        <div>
            <h1> {title}</h1>
            <TextBlock field={document.fragments['generic.body']} />
        </div>
    )
}

export default compose(
    withState('menuTree', 'setMenuTree', []),
    lifecycle({
        componentDidMount() {
            const { setMenuTree } = this.props

            fetchStaticResource('tutorial-menu-tree.json').then(response => {
                setMenuTree(response.data)
            })
        },
    }),
    CSSModules(styles)
)(Tutorial)
