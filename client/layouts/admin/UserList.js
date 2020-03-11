import React, { useState, useEffect } from 'react'
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

export default function UserList() {
    const [username, setUsername] = useState()
    const { isAuthenticated } = useAuth(true)

    return (
        <Page>
            <Header title="Users" />
            <Content>
                <Main>
                    <Shim all>
                        <Search
                            value={username}
                            onChange={setUsername}
                            placeholder="Search by username..."
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

    useEffect(() => {
        setPage(1)
    }, [username])

    return (
        <Provider value={useUsers(username, page)}>
            <table>
                <thead>
                    <tr>
                        {COLUMNS.map(({ name, title }) => (
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
                        <T.Loading>Loading users...</T.Loading>
                    </Pending>
                    <Found>
                        {({ itemCount }) => (
                            <T.Muted>{itemCount} users found.</T.Muted>
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
    return payload.items.map(user => (
        <tr key={user.id}>
            {COLUMNS.map(({ name, property }) => (
                <td key={name}>{property(user)}</td>
            ))}
        </tr>
    ))
}

const COLUMNS = [
    {
        name: 'username',
        title: 'Username',
        property({ username }) {
            return username
        },
    },
    {
        name: 'email',
        title: 'Email',
        property({ email }) {
            return email ? <Mailto email={email} /> : null
        },
    },
]
