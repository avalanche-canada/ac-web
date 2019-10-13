import { Memory } from 'components/fetch/Cache'
import { incident, incidents } from 'api/urls/incidents'
import { useFetch } from 'utils/react/hooks'

export function useIncident(id) {
    return useFetch(incident(id), CACHE)
}

export function useIncidents(params) {
    return useFetch(incidents(params), CACHE)
}

const CACHE = new Memory()
