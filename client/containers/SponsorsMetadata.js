import Universal from 'components/Universal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSponsors as data } from 'getters/sponsors'
import { loadSponsors } from 'actions/sponsors'

export default connect(createStructuredSelector({ data }), dispatch => ({
    didMount() {
        dispatch(loadSponsors())
    },
}))(Universal)
