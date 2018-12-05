import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthContext from 'contexts/auth'
import { Loading, Headline } from 'components/page'
import { Muted } from 'components/text'

export default class LoginComplete extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }
    static contextType = AuthContext
    async componentDidMount() {
        const { location, navigate } = this.props
        const { hash } = location
        let to = '/'

        if (hash) {
            const props = await this.context.resume(hash)

            to = props?.state || to
        }

        setTimeout(() => {
            navigate(to, { replace: true })
        }, 2000)
    }
    render() {
        return (
            <Loading title="Loggin in progress...">
                <Headline>
                    <Muted>You will be redirected once we are done!</Muted>
                </Headline>
            </Loading>
        )
    }
}
