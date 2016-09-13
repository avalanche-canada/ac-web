import React, {PropTypes, createElement} from 'react'
import {compose, withProps, withState, lifecycle, mapProps} from 'recompose'
import {connect} from 'react-redux'
import {Header, Content, Body} from 'components/page/drawer'
import {Metadata} from 'components/mountainInformationNetwork'
import {Submission} from 'components/mountainInformationNetwork'
import {QUICK} from 'components/mountainInformationNetwork/types'
import {Loading, Error} from 'components/misc'
import {MountainInformationNetworkObservation} from 'api/schemas'
import {getEntityForSchema, getEntitiesForSchema} from 'reducers/api/entities'
import {loadMountainInformationNetworkObservationsForDays} from 'actions/entities'
import {Link} from 'react-router'

const Components = new Map([
    [MountainInformationNetworkObservation, Submission],
])

Secondary.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
}

function mapStateToProps(state, {schema, id, open}) {
    const observation = getEntityForSchema(state, schema, id)

    if (!observation) {
        return {
            title: 'Loading...',
        }
    }

    const observations = getEntitiesForSchema(state, schema)
    const {subid, title, user, datetime, obtype} = observation.toJSON()
    function filter(observation) {
        return observation.get('subid') === subid
    }

    return {
        title,
        link: `/mountain-information-network/submissions/${subid}`,
        metadata: {
            submittedOn: datetime,
            submittedBy: user,
        },
        props: {
            observations: observations.filter(filter).toList().toJSON(),
            active: obtype,
        },
    }
}

const Messages = new Map([
    [MountainInformationNetworkObservation, {
        error: 'An error occured while loading the Mountain Information Network observations.',
        loading: 'Loading Mountain Information Network observations...',
    }]
])

function Secondary({title, metadata, schema, isLoading, isError, props, messages, link}) {
    const {error, loading} = messages

    return (
        <Content>
            <Header subject='Mountain Information Network'>
                <h1>
                    {link ? <Link to={link}>{title}</Link> : title}
                </h1>
                {metadata && <Metadata {...metadata} />}
            </Header>
            <Body>
                {isError && <Error>{error}</Error>}
                {isLoading && <Loading>{loading}</Loading>}
                {props && createElement(Components.get(schema), props)}
            </Body>
        </Content>
    )
}

export default compose(
    connect(mapStateToProps, {
        loadObservation: loadMountainInformationNetworkObservationsForDays
    }),
    withState('isError', 'setIsError', false),
    withProps(({schema, setIsError, loadObservation}) => ({
        messages: Messages.get(schema),
        load() {
            loadObservation(60).catch(err => setIsError(true))
        }
    })),
    lifecycle({
        componentDidMount() {
            this.props.load()
        },
        componentWillReceiveProps({load}) {
            load()
        },
    })
)(Secondary)
