import React, {Component} from 'react'
import {Page, Main, Content, Header, Headline} from '~/components/page'
import {fetchStaticResource} from '~/api'
import {Loading, Error, InnerHTML} from '~/components/misc'
import {TagSet, Tag} from '~/components/tag'

const STATE = {
    isLoading: false,
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
        const {isLoading, isError, terms} = this.state
        const letters = Object.keys(terms).filter(letter => terms[letter].length > 0).sort()

        return (
            <Page>
                <Header title='Glossary' />
                <Content>
                    <Main>
                        <Headline>
                            This is the starting place for help on the CAC bulletins. The <b>Avalanche Glossary</b> includes the standard set of terms that are used as a guideline for public avalanche bulletins production by the CAC. If you can't understand a term in one of the CAC bulletins, this is where to look first. The Avalanche Glossary definitions were written by <a href='http://www.schulich.ucalgary.ca/enci/BruceJamieson'>Bruce Jamieson</a>, one of the CAA professional members.
                        </Headline>
                        {isLoading && <Loading />}
                        {isError && <Error />}
                        {(!isLoading && !isError) && (
                            <div>
                                <TagSet>
                                    {letters.map(letter => (
                                        <Tag key={letter}>
                                            <a name={`tag-${letter}`} href={`#${letter}`}>
                                                <b>{letter}</b>
                                            </a>
                                        </Tag>
                                    ))}
                                </TagSet>
                                {letters.map(letter => (
                                    <section key={letter}>
                                        <h1>
                                            <a name={letter} href={`#${letter}`}>
                                                {letter}
                                            </a>
                                        </h1>
                                        {terms[letter].map(term => (
                                            <section>
                                                <h2>{term.title}</h2>
                                                <InnerHTML>
                                                    {term.content}
                                                </InnerHTML>
                                            </section>
                                        ))}
                                    </section>
                                ))}
                            </div>
                        )}
                    </Main>
                </Content>
            </Page>
        )
    }
}
