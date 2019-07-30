import { EVENT, BLOG, NEWS } from 'constants/prismic'

// TODO: Review if we need all these transformers, yes we need but it should be done at the components!

export default new Map([
    [BLOG, transformBlog],
    [EVENT, transformEvent],
    [NEWS, transformNews],
])

function transformBlog({ id, uid, type, tags, data }) {
    const { shortlede, body, previewImage, date } = data

    return {
        ...data,
        type,
        id,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: body,
        preview: previewImage?.views?.column,
        link: `/${type}s/${uid}`,
        year: date && date.getFullYear(),
        month: date && date.getMonth(),
    }
}

function transformEvent({ id, uid, type, tags, data }) {
    const { shortlede, description, featuredImage, startDate, endDate } = data

    return {
        ...data,
        type,
        id,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: description,
        preview: featuredImage?.main,
        link: `/${type}s/${uid}`,
        start: startDate,
        end: endDate,
        date: startDate,
        year: startDate && startDate.getFullYear(),
        month: startDate && startDate.getMonth(),
    }
}

function transformNews({ id, uid, type, tags, data }) {
    const { shortlede, body, featuredImage, date } = data

    return {
        ...data,
        type,
        id,
        uid,
        tags,
        featured: tags.includes('featured'),
        headline: shortlede,
        content: body,
        preview: featuredImage?.views?.preview,
        link: `/${type}/${uid}`,
        year: date.getFullYear(),
        month: date.getMonth(),
    }
}
