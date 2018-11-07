import { unstable_createResource as createResource } from 'react-cache'
import { incident, incidents } from 'api/requests/incidents'
import fetch from 'services/fetch'

export const Incident = createResource(id => fetch(incident(id)))
export const Incidents = createResource(() => fetch(incidents()))
