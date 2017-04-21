import React, {Component} from 'react'
import {Page, Main, Content, Header, Headline} from '~/components/page'
import {fetchStaticResource} from '~/api'
import {Loading, Error, InnerHTML} from '~/components/misc'
import {TagSet, Tag} from '~/components/tag'

function Section({letter, terms}) {
    return (
        <section key={letter}>
            <h1>
                <a href={`#${letter}`} name={letter}>
                    {letter}
                </a>
            </h1>
            {terms.map((term, index) => (
                <div key={index}>
                    <h2>{term.title}</h2>
                    <InnerHTML>
                        {term.content}
                    </InnerHTML>
                </div>
            ))}
        </section>
    )
}

function Letter({letter}) {
    return (
        <Tag key={letter}>
            <a href='#'>
                <b>{letter}</b>
            </a>
        </Tag>
    )
}

const STATE = {
    isLoading: false,
    isLoaded: false,
    isError: false,
    terms: [],
    error: null,
}

export default class Container extends Component {
    state = STATE
    load() {
        this.setState({
            isLoading: true
        }, () => {
            fetchStaticResource('glossary.json').then(
                response => this.setState({
                    ...STATE,
                    isLoaded: true,
                    terms: response.data,
                }),
                error => this.setState({
                    ...STATE,
                    isError: true,
                    error,
                })
            )
        })
    }
    componentDidMount() {
        this.load()
    }
    render() {
        function hasTerms(letter) {
            return terms[letter].length > 0
        }
        const {isLoading, isError, isLoaded, terms} = this.state
        const letters = Object.keys(terms).filter(hasTerms).sort()

        return (
            <Page>
                <Header title='Glossary' />
                <Content>
                    <Main>
                        <Headline>
                            This is the starting place for help on the AvCan bulletins. The <b>Avalanche Glossary</b> includes the standard set of terms that are used as a guideline for public avalanche bulletins production by the AvCan. If you can't understand a term in one of the AvCan bulletins, this is where to look first. The Avalanche Glossary definitions were written by <a href='http://www.schulich.ucalgary.ca/enci/BruceJamieson'>Bruce Jamieson</a>, one of the CAA professional members.
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
                        {isLoaded && letters.map(letter => (
                            <Section key={letter} letter={letter} terms={terms[letter]} />
                        ))}
                    </Main>
                </Content>
            </Page>
        )
    }
}
