import React, { PropTypes } from 'react'
import Navbar from './Navbar'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import ColumnSet from './ColumnSet'
import Headline from './Headline'
import UserProfile from './UserProfile'
import { Next as Login } from '../icons'
import ForecastRegions from './ForecastRegions'

AvalancheCanada.propTypes = {
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
    avatar: PropTypes.string,
    onSignin: PropTypes.func,
    onSignout: PropTypes.func,
}
function K() {}

export function AvalancheCanada({ isAuthenticated = false, name = null, avatar = null, onSignin = K, onSignout = K }) {
    return (
        <Navbar>
            <Item title='Mountain Information Network'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='min'>Overview</Link>
                        </Header>
                        <Headline>Explore the MINs</Headline>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='min/submit'>Create Report</Link>
                        </Header>
                        <Headline>Create your own min report</Headline>
                    </Section>
                </Menu>
            </Item>
            <Item title='Avalanche Information'>
                <Menu>
                    <Section>
                        <Header>Forecasts</Header>
                        <ColumnSet count={3}>
                            {ForecastRegions.map(({name, link}, index) => (
                                <Link key={index} to={link} title={name}>
                                    {name}
                                </Link>
                            ))}
                        </ColumnSet>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='blogs'>Blogs</Link>
                        </Header>
                        <Header>
                            <Link to='historic-incidents'>Historic Incidents</Link>
                        </Header>
                        <Header>
                            <Link to='conditions'>Summaries & Outlooks</Link>
                        </Header>
                        <Header>
                            <Link to='weather'>Mountain Weather Forecast</Link>
                        </Header>
                        <Header>
                            <Link to='trip-planner'>Trip Planner</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
            <Item title='Learn'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='training'>Avalanche Canada Training Courses</Link>
                        </Header>
                        <Link to='training/overview'>Overview</Link>
                        <Link to='training/online-primer'>Online Avalanche Tutorial</Link>
                        <Link to='training/online-french'>Cours d’avalanche en ligne (français)</Link>
                        <Link to='training/ast/1'>Avalanche Skills Training 1</Link>
                        <Link to='training/ast/2'>Avalanche Skills Training 2</Link>
                        <Link to='training/crs'>Companion Rescue Skills</Link>
                        <Link to='training/ast/courses'>Find a course</Link>
                        <Link to='training/ast/providers'>Find a provider</Link>
                        <Link to='gear'>Essential Gear</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='sled'>Snowmobile</Link>
                        </Header>
                        <Link to='sled/video-featured'>Throttle Decisions</Link>
                        <Link to='sled/min'>Mountain Information Network</Link>
                        <Link to='foundation/programs/memorialFunds'>Al Hodgson Memorial Fund</Link>
                        <Link to='gear'>Essential gear</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='youth'>Youth</Link>
                        </Header>
                        <Link to='youth/overview'>Overview</Link>
                        <Link to='youth/programs'>Programs</Link>
                        <Link to='youth/resources'>Resources</Link>
                        <Link to='youth/curriculum'>Curriculum</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='ambassadors'>Ambassadors</Link>
                        </Header>
                        <Link to='ambassadors'>Overview</Link>
                        <Link to='ambassadors/nadine-overwater'>Nadine Overwater</Link>
                        <Link to='ambassadors/robin-van-gyn'>Robin van Gyn</Link>
                    </Section>
                </Menu>
            </Item>
            <Item title='About Us' noWrap>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='about'>About</Link>
                        </Header>
                        <Link to='about/vison'>Vision, Mission and Value Statements</Link>
                        <Link to='about/board'>Board Of Directors</Link>
                        <Link to='about/staff'>Staff</Link>
                        <Link to='about/awards'>Service Awards</Link>
                        <Link to='foundation'>Avalanche Canada Foundation</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='membership'>Membership</Link>
                        </Header>
                        <Link to='https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp'>Individual</Link>
                        <Link to='https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp?&constTypeFlag=org'>Organization</Link>
                        <Link to='https://membership.avalanche.ca/np/clients/cac/login.jsp'>Already A Member?</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='sponsors'>Sponsors</Link>
                        </Header>
                        <Link to='sponsors/partner'>Program Partners</Link>
                        <Link to='sponsors/funding'>Premier Sponsors</Link>
                        <Link to='sponsors/supplier'>Supporters</Link>
                        <Link to='sponsors/associate'>Contributors</Link>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='collaborators'>Collaborators</Link>
                        </Header>
                        <Link to='collaborators/government'>Government Partners</Link>
                        <Link to='collaborators/contribution'>Contribution Programs</Link>
                        <Link to='collaborators/other'>Other Agencies and Organisation</Link>
                    </Section>
                </Menu>
            </Item>
            <Item title='News & Events' noWrap>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='news'>News</Link>
                        </Header>
                        <Headline>Some content for the News.</Headline>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='events'>Events</Link>
                        </Header>
                        <Headline>Some content for the Events.</Headline>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='outreach'>Outreach</Link>
                        </Header>
                        <Headline>Some content for the Outreach.</Headline>
                    </Section>
                </Menu>
            </Item>
            <Item title='Store'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='auctions'>Web Auction</Link>
                        </Header>
                        <Headline>
                            Access the Web auction.
                        </Headline>
                    </Section>
                </Menu>
            </Item>
            {isAuthenticated || <Item title='Login' onClick={onSignin} />}
            {isAuthenticated && <Item title='Logout'>
                <Menu inline>
                    <div>
                        <UserProfile name={name} avatar={avatar} />
                    <Link to='logout' onClick={onSignout}>Logout</Link>
                    </div>
                </Menu>
            </Item>}
        </Navbar>
    )
}

export function AvalancheCanadaFoundation() {
    return (
        <Navbar isFoundation>
            <Item title='About'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='foundation/mission'>Mission</Link>
                        </Header>
                        <Header>
                            <Link to='foundation/about/reports'>Annual Reports and Financial Statements</Link>
                        </Header>
                        <Header>
                            <Link to='foundation/about/board'>Board Of Directors</Link>
                        </Header>
                        <Header>
                            <Link to='foundation/about/honourary'>Honourary Directors</Link>
                        </Header>
                        <Header>
                            <Link to='foundation/about/contact'>Contact</Link>
                        </Header>
                        <Header>
                            <Link to='foundation/about/subscribe'>Subscribe to newsletter</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
            <Item title='Programs'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='foundation/programs/ac'>Avalanche Canada</Link>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='foundation/programs/memorial-funds'>Memorial Funds and Scholarships</Link>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='foundation/programs/memorial-donations'>Memorial Donations</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
            <Item title='Contributors'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='foundation/donors'>Donors</Link>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='foundation/eventsponsor'>Event Sponsors</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
            <Item title='News & Events'>
                <Menu>
                    <Section>
                        <Header>
                            <Link to='foundation/news'>News</Link>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Link to='foundation/events'>Events</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
        </Navbar>
    )
}
