import factory from 'prismic/factory'

// TODO: Reuse more code here. It is almost the same code...
// TODO: Transfer more code to factories

const transformers = new Map([
    ['blog', function transformToBlog(document) {
        if (!document) {
            return
        }

        const {type} = document
        const post = factory.getType(document)
        const {shortlede, body, previewImage, uid} = post

        return {
            headline: shortlede,
            content: body,
            preview: previewImage,
            link: `${type}s/${uid}`,
            ...post
        }
    }],
    ['event', function transformToEvent(document) {
        if (!document) {
            return
        }
        const {type} = document
        const post = factory.getType(document)
        const {shortlede, description, featuredImage, uid} = post

        return {
            headline: shortlede,
            content: description,
            preview: featuredImage,
            link: `${type}s/${uid}`,
            ...post
        }
    }],
    ['news', function transformToNews(document) {
        if (!document) {
            return
        }

        const {type} = document
        const post = factory.getType(document)
        const {shortlede, body, featuredImage, uid} = post

        return {
            headline: shortlede,
            content: body,
            preview: featuredImage,
            link: `${type}/${uid}`,
            ...post
        }
    }],
])

export default function transform(document) {
    const {type} = document

    if (!transformers.has(type)) {
        throw new Error(`Transformer for Prismc document of type "${type} not available."`)
    }

    return transformers.get(type)(document)
}
