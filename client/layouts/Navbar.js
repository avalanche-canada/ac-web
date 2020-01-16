import React, { useMemo } from 'react'
import { navigate } from '@reach/router'
import { useAuth } from 'contexts/auth'
import * as params from 'prismic/params'
import { STATIC_PAGE } from 'constants/prismic'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
} from 'components/navbar'
import Avatar from 'components/avatar'
import menu from /* preval */ '../constants/menus/avcan'
import logo from 'styles/AvalancheCanada.svg'
import { useDocument } from 'prismic/hooks'

export default function AvalancheCanadaNavbar() {
    const props = params.uid(STATIC_PAGE, 'ambassadors')
    const [ambassadors] = useDocument(props)
    const { isAuthenticated, profile, login, logout } = useAuth()
    const { name, picture } = profile || {}
    function handleLoginClick(event) {
        event.preventDefault()

        login()
    }
    function handleLogoutClick(event) {
        event.preventDefault()

        logout()
        // FIXME Should not navigate to "/" all the time.
        // If user is not located on a secured route, it shoud stay on the same page.
        navigate('/')
    }

    const menuWithAmbassadors = useMemo(() => {
        // FIXME It is risky to access these properties

        const value = ambassadors?.data?.content?.[0]?.value

        if (!Array.isArray(value)) {
            return menu
        }

        const parent = menu.children[4].children[1]

        parent.children = value.map(ambassador => {
            const fullName = ambassador['full-name']
            const hash = fullName.toLowerCase().replace(/\s/, '-', 'g')

            return {
                id: hash,
                label: fullName,
                to: parent.to + '#' + hash,
            }
        })

        return menu
    }, [ambassadors])

    return (
        <Navbar logo={logo} donate="/foundation" menu={menuWithAmbassadors}>
            {isAuthenticated ? (
                <Item title={<Avatar name={name} url={picture} size={30} />}>
                    <Menu>
                        <Section>
                            <UserProfile name={name} avatar={picture} />
                            <Header>
                                <Link onClick={handleLogoutClick}>Logout</Link>
                            </Header>
                        </Section>
                    </Menu>
                </Item>
            ) : (
                <Item title="Login" onClick={handleLoginClick} />
            )}
        </Navbar>
    )
}
