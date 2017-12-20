import React, { PureComponent } from 'react'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { InnerHTML, Status } from 'components/misc'
import { TagSet, Tag } from 'components/tag'
import { scrollIntoView } from 'utils/dom'
import StaticResource from 'containers/StaticResource'

// TODO: Move to layouts

function Section({ letter, terms }) {
    return (
        <section key={letter}>
            <h1>
                <a
                    href={`#${letter}`}
                    name={letter}
                    onClick={letterClickHandler(letter)}>
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

function Letter({ letter }) {
    return (
        <Tag key={letter}>
            <a href={`#${letter}`} onClick={letterClickHandler(letter)}>
                <b>{letter}</b>
            </a>
        </Tag>
    )
}

function letterClickHandler(letter) {
    return event => {
        event.stopPropagation()
        setTimeout(() => {
            scrollIntoView(`a[name=${letter}]`)
        }, 50)
    }
}

export default class Container extends PureComponent {
    children = ({ data, ...status }) => {
        const letters = status.isLoaded
            ? Object.keys(data)
                  .filter(letter => data[letter].length > 0)
                  .sort()
            : []

        return [
            <Status {...status} />,
            status.isLoaded && (
                <TagSet>
                    {letters.map(letter => (
                        <Letter key={letter} letter={letter} />
                    ))}
                </TagSet>
            ),
            status.isLoaded &&
                letters.map(letter => (
                    <Section
                        key={letter}
                        letter={letter}
                        terms={data[letter]}
                    />
                )),
        ].filter(Boolean)
    }
    render() {
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
                        <StaticResource resource="glossary">
                            {this.children}
                        </StaticResource>
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
