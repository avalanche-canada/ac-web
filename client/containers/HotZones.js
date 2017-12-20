import { connect } from 'react-redux'
import { HotZone } from 'api/schemas'
import { loadFeaturesMetadata as load } from 'actions/entities'
import Container from './Container'
import { getDataForSchema } from './api'

export default connect(getDataForSchema(HotZone), { load })(Container)
