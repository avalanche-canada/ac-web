import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Status } from 'components/misc'
import Component from 'components/page/post'
import { Post as Container } from 'prismic/containers'
import { NEWS, BLOG, EVENT } from 'constants/prismic'

class Post extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }
    children = ({ status, post }) => {
        if (status.isLoaded && !post) {
            // Post not found, redirecting to feed
            return <Redirect to={this.props.type} />
        }

        return [<Status {...status} />, <Component {...post} {...this.props} />]
    }
    render() {
        return <Container {...this.props}>{this.children}</Container>
    }
}

export function NewsPost(props) {
    return <Post uid={uid(props)} type={NEWS} />
}
export function BlogPost(props) {
    return <Post uid={uid(props)} type={BLOG} />
}
export function EventPost(props) {
    return <Post uid={uid(props)} type={EVENT} />
}

function uid({ match }) {
    return match.params.uid
}
