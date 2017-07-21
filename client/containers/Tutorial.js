import {
    compose,
    withProps,
    withState,
    lifecycle,
    mapProps,
    branch,
    renderComponent,
} from 'recompose'
import {withRouter} from 'react-router-dom'
import * as Components from '~/components/tutorial'
import { generic, tutorial } from '~/containers/connectors'
import { parse } from '~/prismic'
import { fetchStaticResource } from '~/api'
import { Loading } from '~/components/misc'

const tree = compose(
    withState('menu', 'setMenu', null),
    lifecycle({
        componentDidMount() {
            fetchStaticResource('tutorial-menu-tree.json').then(response => {
                this.props.setMenu(response.data)
            })
        },
    })
)

export const Tree = tree(Components.Tree)

const loading = branch(
    props => props.status.isLoading,
    renderComponent(Loading)
)
const spread = mapProps(props => parse(props.document).data)

const home = compose(
    withProps({
        uid: 'tutorial-home',
    }),
    generic,
    loading,
    spread
)

export const Home = home(Components.Home)

function findSplatFromPages(pages = [], slug) {
    for (var i = 0; i < pages.length; i++) {
        const page = pages[i]
        const clean = page.slug.replace(/\//g, '')

        if (clean === slug) {
            return page.slug
        } else {
            const next = findSplatFromPages(page.children, slug)

            if (next) {
                return next
            }
        }
    }
}

function findSplat({ menu, splat, slug, router }) {
    if (splat && !slug) {
        return {}
    }

    splat = findSplatFromPages(menu || [], slug)

    if (splat) {
        router.replace(`/tutorial/${splat}`)
    }

    return {
        splat,
    }
}

export const Tutorial = compose(
    withRouter,
    tree,
    withProps(findSplat),
    tutorial,
    loading,
    spread
)(Components.Tutorial)

export const AtesExercise = compose()(Components.AtesExercise)
