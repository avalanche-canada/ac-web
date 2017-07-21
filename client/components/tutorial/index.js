import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Media, Player, Caption } from '~/components/media'
import { Loading } from '~/components/misc'
import { StructuredText, Image } from '~/prismic/components/base'

export AtesExercise from './AtesExercise'

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    currentPage: PropTypes.number,
}

const ACTIVE_STYLE = {
    fontWeight: 'bold',
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
            <Link activeStyle={ACTIVE_STYLE} to={`/tutorial/${encodedSlug}`}>
                {displayTitle}
            </Link>
            {cc}
        </li>
    )
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function Gallery({ images }) {
    return (
        <div>
            {images
                .filter(Boolean)
                .filter(image => Boolean(image.picture))
                .map(({ picture, credit, caption }, index) => (
                    <GalleryImage
                        key={index}
                        url={picture.main.url}
                        credit={credit}
                        caption={caption}
                    />
                ))}
        </div>
    )
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

    return (
        <Media>
            <Image url={url} copyright={credit} />
            {caption &&
                <Caption>
                    {caption}
                </Caption>}
        </Media>
    )
}

Tree.propTypes = {
    menu: PropTypes.object,
    currentPage: PropTypes.number.isRequired,
}

export function Tree({ menu, currentPage }) {
    if (menu === null) {
        return <Loading />
    }

    return (
        <ul>
            {menu.map(item => (
                <MenuItem key={item.slug} currentPage={currentPage} {...item} />
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

Home.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
}

export function Home({ title, body }) {
    return (
        <div>
            <h1>{title}</h1>
            <StructuredText value={body} />
        </div>
    )
}

Tutorial.propTypes = {
    text1: StructuredText.propTypes.value,
    text2: StructuredText.propTypes.value,
    text3: StructuredText.propTypes.value,
    text4: StructuredText.propTypes.value,
    title: PropTypes.string.isRequired,
    gallery: PropTypes.array.isRequired,
    videoSource: PropTypes.object,
}

export function Tutorial({
    text1,
    text2,
    text3,
    text4,
    title,
    gallery,
    videoSource,
}) {
    return (
        <div>
            <h1>{title}</h1>
            {text1 && <StructuredText value={text1} />}
            {videoSource && <Video src={videoSource} />}
            {text2 && <StructuredText value={text2} />}
            {Array.isArray(gallery) && <Gallery images={gallery} />}
            {text3 && <StructuredText value={text3} />}
            {text4 && <StructuredText value={text4} />}
        </div>
    )
}
