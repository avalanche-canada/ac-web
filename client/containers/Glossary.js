import React, { Component } from 'react'
import { withHandlers } from 'recompose'
import { fetchStaticResource } from '~/api'
import { Page, Main, Content, Header, Headline, Aside } from '~/components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from '~/components/sidebar'
import { InnerHTML, Top } from '~/components/misc'
import { Loading, Error } from '~/components/text'
import { TagSet, Tag } from '~/components/tag'
import { scrollIntoView } from '~/utils/dom'
import debounce from 'lodash/debounce'

function updateShowTopAnchor() {
    const { scrollTop } = document.body

    return {
        showTopAnchor: scrollTop > 250,
    }
}

let Section = ({ letter, terms, onHeaderClick }) => {
    return (
        <section key={letter}>
            <h1>
                <a href={`#${letter}`} name={letter} onClick={onHeaderClick}>
                    {letter}
                </a>
            </h1>
            {terms.map((term, index) => (
                <div key={index}>
                    <h2>{term.title}</h2>
                    <InnerHTML>{term.content}</InnerHTML>
                </div>
            ))}
        </section>
    )
}

function letterClickHandler({ letter }) {
    return event => {
        event.stopPropagation()
        setTimeout(() => {
            scrollIntoView(`a[name=${letter}]`)
        }, 50)
    }
}

Section = withHandlers({
    onHeaderClick: letterClickHandler,
})(Section)

let Letter = ({ letter, onClick }) => {
    return (
        <Tag key={letter}>
            <a href={`#${letter}`} onClick={onClick}>
                <b>{letter}</b>
            </a>
        </Tag>
    )
}

Letter = withHandlers({
    onClick: letterClickHandler,
})(Letter)

const STATE = {
    isLoading: false,
    isLoaded: false,
    isError: false,
    terms: [],
    error: null,
    showTopAnchor: false,
}

export default class Container extends Component {
    state = STATE
    load() {
        this.setState(
            {
                isLoading: true,
            },
            () => {
                fetchStaticResource('glossary').then(
                    data =>
                        this.setState({
                            ...STATE,
                            isLoaded: true,
                            terms: data,
                        }),
                    error =>
                        this.setState({
                            ...STATE,
                            isError: true,
                            error,
                        })
                )
            }
        )
    }
    // TODO: Move that logic to a controlled Top component
    handleScrollHandler = debounce(
        () => this.setState(updateShowTopAnchor),
        250
    )
    componentDidMount() {
        this.load()
        document.addEventListener('scroll', this.handleScrollHandler)
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScrollHandler)
    }
    render() {
        function hasTerms(letter) {
            return terms[letter].length > 0
        }
        const {
            isLoading,
            isError,
            isLoaded,
            terms,
            showTopAnchor,
        } = this.state
        const letters = Object.keys(terms)
            .filter(hasTerms)
            .sort()

        return (
            <Page>
                <Header title="Glossary" />
                <Content>
                    <Main>
                        <Headline>
                            This is the starting place for help on the AvCan
                            bulletins. The Avalanche Glossary includes the
                            standard set of terms that are used as a guideline
                            for public avalanche bulletins production by the
                            AvCan. If you can't understand a term in one of the
                            AvCan bulletins, this is where to look first. The
                            Avalanche Glossary definitions were written by
                            <a
                                target="_blank"
                                href="http://www.schulich.ucalgary.ca/enci/BruceJamieson">
                                Bruce Jamieson
                            </a>
                            , one of the CAA professional members.
                        </Headline>
                        {isLoading && <Loading />}
                        {isError && <Error />}
                        {isLoaded && (
                            <TagSet>
                                {letters.map(letter => (
                                    <Letter key={letter} letter={letter} />
                                ))}
                            </TagSet>
                        )}
                        {isLoaded &&
                            letters.map(letter => (
                                <Section
                                    key={letter}
                                    letter={letter}
                                    terms={terms[letter]}
                                />
                            ))}
                        {showTopAnchor && <Top />}
                    </Main>
                    <Aside>
                        <Sidebar>
                            <SidebarHeader>Related links</SidebarHeader>
                            <SidebarItem>
                                <a
                                    target="_blank"
                                    href="http://www.alpine-rescue.org/xCMS5/WebObjects/nexus5.woa/wa/icar?menuid=1088">
                                    ICAR Glossary
                                </a>
                            </SidebarItem>
                            <SidebarItem>
                                <a
                                    target="_blank"
                                    href="http://avalanche.ca/fxresources/AvalancheLexiqueLexicon.pdf">
                                    Lexique Avalanche - Avalanche Lexicon
                                </a>
                            </SidebarItem>
                        </Sidebar>
                    </Aside>
                </Content>
            </Page>
        )
    }
}
