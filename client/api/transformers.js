import parseDate from 'date-fns/parse'

function normalize(string) {
    return string.toUpperCase().trim()
}

function normalizeArray(tags) {
    return tags.map(normalize)
}

function transformProvider({
    loc_description,
    is_sponsor,
    prim_contact,
    ...provider
}) {
    return Object.assign(provider, {
        tags: normalizeArray(provider.tags),
        locDescription: loc_description,
        isSponsor: is_sponsor,
        isFeatured: is_sponsor,
        primContact: prim_contact,
    })
}

function transformCourse({ date_start, date_end, loc_description, ...course }) {
    return Object.assign(course, {
        tags: normalizeArray(course.tags),
        dateStart: parseDate(date_start),
        dateEnd: parseDate(date_end),
        locDescription: loc_description,
        provider: transformProvider(course.provider),
    })
}

export function transformProviderResponse(data) {
    return Object.assign(data, {
        results: data.results.map(transformProvider),
    })
}

export function transformCourseResponse(data) {
    return Object.assign(data, {
        results: data.results.map(transformCourse),
    })
}

function sanitizeMountainInformationNetworkSubmission(submission) {
    return {
        ...submission,
        latlng: submission.latlng.map(Number),
    }
}

export function sanitizeMountainInformationNetworkSubmissions(data) {
    if (Array.isArray(data)) {
        return data.map(sanitizeMountainInformationNetworkSubmission)
    }

    return sanitizeMountainInformationNetworkSubmission(data)
}

export function transformMountainConditionsReports(data) {
    return data.map(transformMountainConditionsReport)
}

function transformMountainConditionsReport({
    id,
    location_desc,
    dates,
    user = {},
    ...report
}) {
    return Object.assign(report, {
        id: String(id),
        user: {
            ...user,
            certification: user.certs,
        },
        dates: dates.map(date => parseDate(date)).sort(),
        locationDescription: location_desc,
    })
}
