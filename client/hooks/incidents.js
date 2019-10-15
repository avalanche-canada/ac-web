import { Memory } from 'services/cache'
import { incident, incidents } from 'api/urls/incidents'
import { useFetch } from 'hooks'

export function useIncident(id) {
    return useFetch(incident(id), CACHE)
}

export function useIncidents(params) {
    return useFetch(incidents(params), CACHE)
}

const CACHE = new Memory()
