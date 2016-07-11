export default function computeTagsOptions(feed) {
    const initial = new Map([
        [undefined, 'Tags']
    ])
    
    return feed.reduce((map, {tags}) => (
        tags.reduce((map, tag) => map.set(tag.toLowerCase(), tag), map)
    ), initial)
}
