import React, { PureComponent } from 'react'
import { Section as Base } from 'components/page'
import { StructuredText, Link } from 'prismic/components/base'

export default class Section extends PureComponent {
    render() {
        const [{ content, title, link, ...props }] = this.props.value

        return (
            <Base
                title={link ? <Link {...link}>{title}</Link> : title}
                {...props}>
                <StructuredText value={content} />
            </Base>
        )
    }
}
