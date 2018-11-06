import { unstable_createResource as createResource } from 'react-cache'
import { incident, incidents } from 'api/requests/incidents'
import fetch from 'services/fetch'

export const IncidentResource = createResource(id => fetch(incident(id)))
export const IncidentsResource = createResource(() => fetch(incidents()))
