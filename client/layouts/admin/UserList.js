import React, { useState, useEffect, useCallback } from 'react'
import throttle from 'lodash/throttle'
import { Page } from 'layouts/pages'
import { Header, Main, Content } from 'components/page'
import { useAuth } from 'contexts/auth'
import { useUsers } from 'hooks/async/admin'
import { Provider, Found, Pending, HTTPError } from 'contexts/async'
import * as T from 'components/text'
import { Mailto } from 'components/anchors'
import { Search } from 'components/form'
import PaginationComponent from 'components/pagination'
import Shim from 'components/Shim'
import { FormattedMessage, useIntl } from 'react-intl'

export default function UserList() {
    const intl = useIntl()
    const [username, setUsername] = useState()
    const { isAuthenticated } = useAuth(true)
    const handleUsernameChange = useCallback(throttle(setUsername, 750), [])

    return (
        <Page>
            <Header title={intl.formatMessage({
                defaultMessage: 'Users',
                description: 'Layout admin/UserList',
            })} />
            <Content>
                <Main>
                    <Shim all>
                        <Search
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder={intl.formatMessage({
                                defaultMessage: 'Search by username...',
                                description: 'Layout admin/UserList',
                            })}
                        />
                    </Shim>
                    {isAuthenticated && <Table username={username} />}
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function Table({ username }) {
    const [page, setPage] = useState(1)
    const columns = useColumns()

    useEffect(() => {
        setPage(1)
    }, [username])

    return (
        <Provider value={useUsers(username, page)}>
            <table>
                <thead>
                    <tr>
                        {columns.map(({ name, title }) => (
                            <th key={name}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <Found>
                        <Body />
                    </Found>
                </tbody>
                <caption>
                    <Pending>
                        <T.Loading>
                            <FormattedMessage
                                description="Layout admin/UserList"
                                defaultMessage="Loading users..."
                            />
                        </T.Loading>
                    </Pending>
                    <Found>
                        {({ itemCount }) => (
                            <T.Muted>
                                <FormattedMessage description="Layout admin/UserList" defaultMessage="{itemCount, plural,
                                =0 {No users}
                                one {# user}
                                other {# users}} found." values={
                                        {
                                            itemCount
                                        }
                                    } />
                            </T.Muted>
                        )}
                    </Found>
                    <HTTPError>
                        <Error />
                    </HTTPError>
                </caption>
            </table>
            <Found>
                <Pagination onChange={setPage}></Pagination>
            </Found>
        </Provider>
    )
}
function Pagination({ payload, onChange }) {
    const { page, totalPage } = payload

    if (totalPage <= 1) {
        return null
    }

    return (
        <PaginationComponent
            total={totalPage}
            active={page}
            onChange={onChange}
        />
    )
}
function Error({ error }) {
    return <T.Error>{error.payload.message}</T.Error>
}
function Body({ payload }) {
    const columns = useColumns();
    return payload.items.map(user => (
        <tr key={user.id}>
            {columns.map(({ name, property }) => (
                <td key={name}>{property(user)}</td>
            ))}
        </tr>
    ))
}

function useColumns() {
    const intl = useIntl();
    return useMemo(() => [
        {
            name: 'username',
            title: intl.formatMessage({
                defaultMessage: 'Username',
                description: 'Layout admin/UserList',
            }),
            property({ username }) {
                return username
            },
        },
        {
            name: 'email',
            title: intl.formatMessage({
                defaultMessage: 'Email',
                description: 'Layout admin/UserList',
            }),
            property({ email }) {
                return email ? <Mailto email={email} /> : null
            },
        },
    ], [intl.locale])

}

