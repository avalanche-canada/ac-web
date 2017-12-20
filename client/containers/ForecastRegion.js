import Container from './Container'
import { connect } from 'react-redux'
import { ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata as load } from 'actions/entities'
import { getEntityForSchema } from './api'

export default connect(getEntityForSchema(ForecastRegion), { load })(Container)
