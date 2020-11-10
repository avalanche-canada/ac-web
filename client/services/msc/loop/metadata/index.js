import { range } from 'utils/array'
import { splitTime } from 'utils/date'
import { M, KM, TIME } from 'constants/intl'

const description = 'Mountain Weather Forecast loop metadata'

export default function createMetadata(intl) {
    const visibleImageryNotAvailableAtNight = intl.formatMessage({
        description,
        defaultMessage: 'Visible imagery not available at night.',
    })
    const newImageEvery10Minutes = intl.formatMessage({
        description,
        defaultMessage: 'A new image is added to the loop every 10 minutes.',
    })
    const newImageEvery30Minutes = intl.formatMessage({
        description,
        defaultMessage: 'A new image is added to the loop every 30 minutes.',
    })
    const newImageEvery60Minutes = intl.formatMessage({
        description,
        defaultMessage: 'A new image is added to the loop every 60 minutes.',
    })
    const metadata = [
        {
            id: 'AC_GDPS_EPA_clds-th-500hts',
            title: '500 mb',
            runs: [0, 12],
            updates: [5, 17],
            hours: range(12, 144, 6),
        },
        {
            id: 'AC_RDPS_BC_precip-types',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Precipitation Type',
            }),
            runs: [0, 6, 12, 18],
            updates: [1, 7, 13, 19],
            hours: range(3, 48, 3),
        },
        {
            key: 'AC_HRDPS_BC_sfc-temp-3hr-freq',
            id: 'AC_HRDPS_BC_sfc-temp',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Surface',
            }),
            runs: [6, 12],
            updates: [10, 24],
            hours: range(0, 45, 3),
        },
        {
            id: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
            title: intl.formatMessage({
                description,
                defaultMessage: '0-144 Hours',
            }),
            runs: [0, 12],
            updates: [9, 21],
            hours: range(0, 144, 6),
        },
        {
            id: 'AC_HRDPS_BC-S-Cst_12hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Coast',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(12, 48, 6),
        },
        {
            key: 'AC_HRDPS_BC_wms-1hr-precip',
            id: 'AC_HRDPS_BC_1hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'BC/AB',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(1, 48),
        },
        {
            id: 'AC_GDPS_BC_850-temp',
            title: intl.formatNumber(1500, M),
            runs: [0, 12],
            updates: [5, 17],
            hours: range(0, 144, 6),
        },
        {
            key: 'AC_GDPS_BC_850-temp-4pm',
            id: 'AC_GDPS_BC_850-temp',
            title: [
                intl.formatNumber(1500, M),
                intl.formatTime(getDateForHours(16), TIME),
            ].join(' '),
            runs: [0],
            updates: [17],
            hours: range(0, 144, 24),
        },
        {
            id: 'AC_RDPS_CAN-W_3hr-precip-clds-th-slp',
            title: intl.formatMessage({
                description,
                defaultMessage: '0-48 Hours',
            }),
            runs: [0, 6, 12, 18],
            updates: [1, 7, 13, 19],
            hours: range(0, 48, 3),
        },
        {
            id: 'AC_HRDPS_BC_sfc-temp',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Surface',
            }),
            runs: [6, 12],
            updates: [0, 10],
            hours: range(46),
        },
        {
            id: 'AC_GDPS_EPA_tpw',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Precipitable Water',
            }),
            runs: [0, 12],
            updates: [5, 17],
            hours: range(0, 144, 6),
        },
        {
            id: 'AC_HRDPS_BC-S-Int_1hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Interior',
            }),
            runs: [6, 18],
            updates: [7.25, 19.15],
            hours: range(1, 48),
        },
        {
            id: 'AC_RDPS_BC_marine-winds',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Surface R',
            }),
            runs: [0, 6, 12, 18],
            updates: [5, 11, 17, 23],
            hours: range(0, 48, 3),
        },
        {
            id: 'AC_HRDPS_BC-S-Int_12hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Interior',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(12, 48, 6),
        },
        {
            id: 'AC_HRDPS_Alberta-Rockies_12hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Alberta Rockies',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(12, 48, 6),
        },
        {
            id: 'AC_GDPS_BC_750-winds',
            title: intl.formatNumber(2500, M),
            runs: [0, 12],
            updates: [5, 17],
            hours: range(0, 144, 6),
        },
        {
            id: 'AC_GDPS_BC_850-winds',
            title: intl.formatNumber(1500, M),
            runs: [0, 12],
            updates: [5, 17],
            hours: range(0, 144, 6),
        },
        {
            id: 'AC_RDPS_BC_12hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'BC/AB',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(12, 48, 6),
        },
        {
            id: 'AC_HRDPS_BC-S-Cst_1hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Coast',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(1, 48),
        },
        {
            id: 'AC_HRDPS_Alberta-Rockies_1hr-precip',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Alberta Rockies',
            }),
            runs: [6, 18],
            updates: [7.25, 19.25],
            hours: range(1, 48),
        },
        {
            id: 'AC_RDPS_BC_freezing-level',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Freezing Level R',
            }),
            runs: [0, 6, 12, 18],
            updates: [5, 11, 17, 23],
            hours: range(0, 48, 3),
        },
        {
            key: 'AC_GDPS_BC_850-temp-4am',
            id: 'AC_GDPS_BC_850-temp',
            title: [
                intl.formatNumber(1500, M),
                intl.formatTime(getDateForHours(4), TIME),
            ].join(' '),
            runs: [0],
            updates: [17],
            hours: range(12, 132, 24),
        },
        {
            id: 'AC_SAT_BC_ir-vis',
            title: intl.formatMessage({
                description,
                defaultMessage: 'IR-VIS Canada West',
            }),
            minutes: range(0, 1440, 30),
            notes: [visibleImageryNotAvailableAtNight, newImageEvery30Minutes],
        },
        {
            id: 'AC_SAT_CAN-W-CST_ir-redtop',
            title: intl.formatMessage({
                description,
                defaultMessage: 'IR - Canada West',
            }),
            minutes: range(0, 1440, 30),
            notes: [newImageEvery30Minutes],
        },
        {
            id: 'AC_RADAR_BC-S-INT_precip-rate',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Interior',
            }),
            minutes: range(0, 1430, 10),
            notes: [newImageEvery10Minutes],
        },
        {
            id: 'AC_SAT_EPA_water-vapour-jet',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Water Vapour/Jet',
            }),
            minutes: range(0, 1440, 30),
            notes: [newImageEvery30Minutes],
        },
        {
            id: 'AC_SAT_EPA_ir-redtop',
            title: intl.formatMessage({
                description,
                defaultMessage: 'IR Pacific',
            }),
            minutes: range(0, 1440, 30),
            notes: [newImageEvery30Minutes],
        },
        {
            id: 'AC_SAT_BC_visible',
            title: intl.formatMessage(
                {
                    description,
                    defaultMessage: '{resolution} VIS BC',
                },
                {
                    resolution: intl.formatNumber(1, KM),
                }
            ),
            minutes: range(0, 1380, 60),
            notes: [visibleImageryNotAvailableAtNight, newImageEvery60Minutes],
        },
        {
            id: 'AC_SAT_BC-S-CST_visible',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Visible South Coast',
            }),
            minutes: range(0, 1440, 30),
            notes: [visibleImageryNotAvailableAtNight, newImageEvery30Minutes],
        },
        {
            id: 'AC_SAT_BC-S-INT_visible',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Visible - South Interior',
            }),
            minutes: range(0, 1440, 30),
            notes: [visibleImageryNotAvailableAtNight, newImageEvery30Minutes],
        },
        {
            id: 'AC_SAT_Alberta-Rockies_visible',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Visible - Alberta Rockies',
            }),
            minutes: range(0, 1440, 30),
            notes: [visibleImageryNotAvailableAtNight, newImageEvery30Minutes],
        },
        {
            id: 'AC_PLOT_BC_weather-warnings',
            minutes: range(30, 1410, 60),
            extension: 'png',
            notes: [newImageEvery30Minutes],
        },
        {
            id: 'AC_PLOT_BC_precip-24hr',
            minutes: [360],
            extension: 'png',
        },
        {
            id: 'AC_RADAR_BC-S-CST_precip-rate',
            title: intl.formatMessage({
                description,
                defaultMessage: 'South Coast',
            }),
            minutes: range(0, 1430, 10),
            notes: [newImageEvery10Minutes],
        },
        {
            id: 'AC_PLOT_BC_actual-temps',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Actual Temperatures',
            }),
            minutes: range(0, 1380, 60),
            notes: [newImageEvery60Minutes],
        },
        {
            id: 'AC_RADAR_BC_precip-rate',
            title: intl.formatMessage({
                description,
                defaultMessage: 'BC Mosaic',
            }),
            minutes: range(0, 1430, 10),
            notes: [newImageEvery10Minutes],
        },
        {
            id: 'AC_RADAR_Alberta-Rockies_precip-rate',
            title: intl.formatMessage({
                description,
                defaultMessage: 'Alberta Rockies',
            }),
            minutes: range(0, 1430, 10),
            notes: [newImageEvery10Minutes],
        },
    ]

    return metadata
        .map(item => assign(item, intl))
        .reduce((metadata, item) => {
            const { key = item.id, ...rest } = item

            metadata[key] = rest

            return metadata
        }, {})
}

// Utils & constants

function getDateForHours(hours) {
    const date = new Date()

    date.setHours(hours)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
}

function assign(metadata, intl) {
    const { updates, notes = [] } = metadata

    metadata.extension = metadata.extension || 'jpg'

    if (!Array.isArray(updates)) {
        return metadata
    }

    const hours = updates
        .map(splitTime)
        .map(time => new Date(Date.UTC(0, 0, 0, time.hours, time.minutes)))
        .sort((a, b) => a.getHours() > b.getHours())
        .map(date => intl.formatTime(date, TIME))
    const note = intl.formatMessage(
        {
            description,
            defaultMessage: 'Updated at approximately {updates} every day.',
        },
        {
            updates: intl.formatList(hours, { type: 'conjunction' }),
        }
    )

    return {
        ...metadata,
        notes: [note, ...notes],
    }
}
