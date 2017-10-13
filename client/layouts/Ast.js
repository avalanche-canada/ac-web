import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, PillSet, Pill } from '~/components/pill'
import { Route } from 'react-router-dom'
import { Page, Content, Banner, Main } from '~/components/page'
import * as Tables from '~/containers/ast/tables'
import * as Forms from '~/containers/ast/forms'

const ROUTES = ['courses', 'providers']

Ast.propTypes = {
    match: PropTypes.object.isRequired,
}

export default function Ast({ match }) {
    return (
        <Page>
            <Banner url="//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg">
                <Container>
                    <PillSet activeIndex={ROUTES.indexOf(match.params.type)}>
                        <Pill>
                            <Link to="/training/courses">Courses</Link>
                        </Pill>
                        <Pill>
                            <Link to="/training/providers">Providers</Link>
                        </Pill>
                    </PillSet>
                </Container>
                <Route path="/training/courses" component={Forms.Courses} />
                <Route path="/training/providers" component={Forms.Providers} />
            </Banner>
            <Main>
                <Content>
                    <Route
                        path="/training/courses"
                        component={Tables.Courses}
                    />
                    <Route
                        path="/training/providers"
                        component={Tables.Providers}
                    />
                </Content>
            </Main>
        </Page>
    )
}
