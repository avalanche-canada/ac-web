import { connect } from 'react-redux'
import { ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata as load } from 'actions/entities'
import Container from './Container'
import { getDataForSchema } from './api'

export default connect(getDataForSchema(ForecastRegion), { load })(Container)
