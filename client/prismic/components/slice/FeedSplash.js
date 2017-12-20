import React, { PureComponent } from 'react'
import { FeedSplash as Layout } from 'layouts/feed'
import { StructuredText } from 'prismic/components/base'

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default class FeedSplash extends PureComponent {
    get value() {
        return this.props.value[0]
    }
    get type() {
        return types.get(this.value.type)
    }
    get tags() {
        const { tags } = this.value

        return typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim())
            : undefined
    }
    render() {
        return (
            <Layout type={this.type} tags={this.tags}>
                <StructuredText value={this.value.header} />
            </Layout>
        )
    }
}
