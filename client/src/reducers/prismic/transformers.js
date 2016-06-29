export function newsPost(document) {
    const date = document.getDate('news.date')
    const tags = document.tags.map(tag => tag.toLowerCase().trim())
    const image = document.getImage('news.featured_image')

    return {
        featured: !!tags.find(tag => tag === 'featured'),
        title: document.getText('news.title'),
        preview: image && image.views.preview,
        related: document.getImage('news.related'),
        headline: document.getText('news.shortlede'),
        content: document.getStructuredText('news.body').asHtml(),
        uid: document.uid,
        tags,
        date,
        year: date.getFullYear(),
        month: date.getMonth(),
    }
}
