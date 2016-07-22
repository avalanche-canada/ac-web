import React, {PropTypes} from 'react'
import {Page, Banner, Main, Article, Header, BannerForm} from 'components/page'
import {Select, Dropdown, Option, Input} from 'components/controls'
import {Control} from 'components/form'
import {Place, Calendar} from 'components/icons'
import {Container, PillSet, Pill} from 'components/pill'
import {Link} from 'react-router'

export const COURSES = 'courses'
export const PROVIDERS = 'providers'

Ast.propTypes = {
    type: PropTypes.oneOf([COURSES, PROVIDERS]).isRequired,
}

const TITLES = new Map([
    [COURSES, 'All courses'],
    [PROVIDERS, 'All providers'],
])
const LEGENDS = new Map([
    [COURSES, 'Find a course'],
    [PROVIDERS, 'Find a provider'],
])

export default function Ast({type = COURSES, children}) {
    return (
        <Page>
            <Banner url='//avalanche.ca/assets/images/youth/header-big.jpg'>
                <Container>
                    <PillSet activeIndex={0} onActivate={::console.log}>
                        <Pill>
                            <Link to='/ast/courses'>Courses</Link>
                        </Pill>
                        <Pill>
                            <Link to='/ast/providers'>Providers</Link>
                        </Pill>
                    </PillSet>
                </Container>
                <BannerForm legend={LEGENDS.get(type)}>
                    <Control>
                        <Dropdown onChange={::console.log} placeholder='Type' >
                            <Option value='ski'>Ski</Option>
                            <Option value='sled'>Sled</Option>
                            <Option value='youth'>Youth</Option>
                            <Option value='companion-rescue'>Companion rescue</Option>
                        </Dropdown>
                    </Control>
                    <Control icon={<Calendar />}>
                        <Input placeholder='Start date' />
                    </Control>
                    <Control>
                        <Dropdown onChange={::console.log} placeholder='Filter by' >
                            <Option value='ski'>Ski</Option>
                            <Option value='sled'>Sled</Option>
                            <Option value='youth'>Youth</Option>
                            <Option value='companion-rescue'>Companion rescue</Option>
                        </Dropdown>
                    </Control>
                    <Control icon={<Place />}>
                        <Input placeholder='Location' />
                    </Control>
                </BannerForm>
            </Banner>
            <Main>
                <Article>
                    <Header title={TITLES.get(type)} />
                    {children}
                </Article>
            </Main>
        </Page>
    )
}
