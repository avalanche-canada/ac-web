import Immutable from 'immutable'
import range from 'lodash/range'

const Metadata = Immutable.Record({
    id: null,
    title: null,
    shortTitle: null,
    runs: null,
    updates: null,
    hours: null,
    minutes: null,
    extension: 'png',
    notes: [],
})

export const Forecast = new Immutable.Map({
    // Precipitation Hourly
    'AC_HRDPS_BC_wms-1hr-precip': new Metadata({
        id: 'AC_HRDPS_BC_wms-1hr-precip',
        title: 'Precipitation 1h HR BC',
        shortTitle: 'BC HR',
        runs: [6, 18],
        updates: [2, 14],
        hours: range(0, 42 + 1),
    }),
    'AC_HRDPS_BC-S-Cst_1hr-precip': new Metadata({
        id: 'AC_HRDPS_BC-S-Cst_1hr-precip',
        title: 'Precipitation 1h HR SC',
        shortTitle: 'South Coast HR',
        runs: [6, 18],
        updates: [2, 14],
        hours: range(0, 42 + 1),
    }),
    'AC_HRDPS_BC-S-Int_1hr-precip': new Metadata({
        id: 'AC_HRDPS_BC-S-Int_1hr-precip',
        title: 'Precipitation 1h HR SI',
        shortTitle: 'South Interior HR',
        runs: [6, 18],
        updates: [2, 14],
        hours: range(0, 42 + 1),
    }),
    'AC_RDPS_BC_precip-types': new Metadata({
        id: 'AC_RDPS_BC_precip-types',
        title: 'Precipitation Type 3h R',
        shortTitle: 'Type R',
        runs: [0, 6, 12, 18],
        updates: [3, 9, 15, 21],
        hours: range(3, 48 + 1, 3),
    }),
    // Precipitation 12 hour Totals
    'AC_RDPS_BC_12hr-precip': new Metadata({
        id: 'AC_RDPS_BC_12hr-precip',
        title: 'Precipitation 12hr R BC',
        shortTitle: 'BR R',
        runs: [0, 6, 12, 18],
        updates: [3, 9, 15, 21],
        hours: range(12, 48 + 1, 6),
    }),
    'AC_HRDPS_BC-S-Cst_12hr-precip': new Metadata({
        id: 'AC_HRDPS_BC-S-Cst_12hr-precip',
        title: 'Precipitation 12hr HR SC',
        shortTitle: 'South Coast HR',
        runs: [6, 18],
        updates: [2, 14],
        hours: range(12, 42 + 1, 6),
    }),
    'AC_HRDPS_BC-S-Int_12hr-precip': new Metadata({
        id: 'AC_HRDPS_BC-S-Int_12hr-precip',
        title: 'Precipitation 12hr HR SI',
        shortTitle: 'Sourth Interior HR',
        runs: [6, 18],
        updates: [2, 14],
        hours: range(12, 42 + 1, 6),
    }),
    // Temperatures
    'AC_HRDPS_BC_sfc-temp': new Metadata({
        id: 'AC_HRDPS_BC_sfc-temp',
        title: 'Temperatures Surface HR',
        shortTitle: 'Surface HR',
        runs: [6, 12],
        updates: [2, 14],
        hours: range(0, 45 + 1),
    }),
    'AC_HRDPS_BC_sfc-temp-3hr-freq': new Metadata({
        id: 'AC_HRDPS_BC_sfc-temp',
        title: 'Temperatures Surface HR',
        shortTitle: 'Surface HR',
        runs: [6, 12],
        updates: [2, 14],
        hours: range(0, 45 + 1, 3),
    }),
    'AC_RDPS_BC_freezing-level': new Metadata({
        id: 'AC_RDPS_BC_freezing-level',
        title: 'Freezing Level R',
        shortTitle: 'Freezing Level R',
        runs: [0, 6, 12, 18],
        updates: [3, 9, 15, 21],
        hours: range(0, 48 + 1, 3),
    }),
    'AC_GDPS_BC_850-temp': new Metadata({
        id: 'AC_GDPS_BC_850-temp',
        title: null,
        shortTitle: '1500m G',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(0, 144 + 1, 6),
        extension: 'jpg',
    }),
    'AC_GDPS_BC_850-temp-4am': new Metadata({
        id: 'AC_GDPS_BC_850-temp',
        title: null,
        shortTitle: '1500m 4am G',
        runs: [0],
        updates: [9],
        hours: range(12, 144 + 1, 24),
        extension: 'jpg',
    }),
    'AC_GDPS_BC_850-temp-4pm': new Metadata({
        id: 'AC_GDPS_BC_850-temp',
        title: null,
        shortTitle: '1500m 4pm G',
        runs: [0],
        updates: [9],
        hours: range(0, 144 + 1, 24),
        extension: 'jpg',
    }),
    // Winds
    'AC_RDPS_BC_marine-winds': new Metadata({
        id: 'AC_RDPS_BC_marine-winds',
        title: 'Marine Winds - R',
        shortTitle: 'Surface R',
        runs: [0, 6, 12, 18],
        updates: [3, 9, 15, 21],
        hours: range(0, 48 + 1, 3),
    }),
    'AC_GDPS_BC_850-winds': new Metadata({
        id: 'AC_GDPS_BC_850-winds',
        title: 'Winds 1500m - G',
        shortTitle: '1500m G',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(0, 144 + 1, 6),
        extension: 'jpg',
    }),
    'AC_GDPS_BC_750-winds': new Metadata({
        id: 'AC_GDPS_BC_750-winds',
        title: 'Winds 2500m - G',
        shortTitle: '2500m G',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(0, 144 + 1, 6),
        extension: 'jpg',
    }),
    // Prognosis Maps
    'AC_RDPS_CAN-W_3hr-precip-clds-th-slp': new Metadata({
        id: 'AC_RDPS_CAN-W_3hr-precip-clds-th-slp',
        title: 'Surface_Maps_0-48h_R',
        shortTitle: 'Surface R',
        runs: [0, 6, 12, 18],
        updates: [3, 9, 15, 21],
        hours: range(0, 48 + 1, 3),
    }),
    'AC_GDPS_EPA_6hr-precip-clds-th-slp': new Metadata({
        id: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
        title: 'Surface_Maps_0-144h_G',
        shortTitle: '0-144 hours G',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(0, 144 + 1, 6),
        extension: 'jpg',
    }),
    'AC_GDPS_EPA_clds-th-500hts': new Metadata({
        id: 'AC_GDPS_EPA_clds-th-500hts',
        title: '500mb_0-144h_G',
        shortTitle: '500mb',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(12, 144 + 1, 6),
        extension: 'jpg',
    }),
    'AC_GDPS_EPA_tpw': new Metadata({
        id: 'AC_GDPS_EPA_tpw',
        title: 'Precipitable Water (G)',
        shortTitle: 'Precipitable water',
        runs: [0, 12],
        updates: [9, 21],
        hours: range(0, 144 + 1, 6),
        extension: 'jpg',
    }),
})

export const CurrentConditions = new Immutable.Map({
    // Radar Imagery
    'AC_RADAR_BC_precip-rate': new Metadata({
        id: 'AC_RADAR_BC_precip-rate',
        title: 'Radar-BC-Mosaic',
        shortTitle: 'BC Mosaic',
        minutes: range(0, 24 * 60, 10),
        extension: 'jpg',
    }),
    'AC_RADAR_BC-S-CST_precip-rate': new Metadata({
        id: 'AC_RADAR_BC-S-CST_precip-rate',
        title: 'AC_RADAR_BC-S-CST_precip-rate',
        shortTitle: 'South Coast',
        minutes: range(0, 24 * 60, 10),
        extension: 'jpg',
    }),
    'AC_RADAR_BC-S-INT_precip-rate': new Metadata({
        id: 'AC_RADAR_BC-S-INT_precip-rate',
        title: 'Radar-South Interior',
        shortTitle: 'Sourth Interior',
        minutes: range(0, 24 * 60, 10),
        extension: 'jpg',
    }),
    // Satellite Imagery
    'AC_SAT_EPA_water-vapour-jet': new Metadata({
        id: 'AC_SAT_EPA_water-vapour-jet',
        title: 'Water Vapour-Jet',
        shortTitle: 'Water Vapour/Jet',
        minutes: range(30, 24 * 60, 60),
        extension: 'jpg',
    }),
    'AC_SAT_EPA_ir-redtop': new Metadata({
        id: 'AC_SAT_EPA_ir-redtop',
        title: 'IR Pacific',
        shortTitle: 'IR Pacific',
        minutes: range(0, 24 * 60, 60),
        extension: 'jpg',
    }),
    'AC_SAT_CAN-W-CST_ir-redtop': new Metadata({
        id: 'AC_SAT_CAN-W-CST_ir-redtop',
        title: 'IR West Cost',
        shortTitle: 'IR West Coast',
        minutes: range(0, 24 * 60, 60),
        extension: 'jpg',
    }),
    'AC_SAT_BC_ir-vis': new Metadata({
        id: 'AC_SAT_BC_ir-vis',
        title: 'IR-Vis',
        shortTitle: 'IR-VIS BC',
        // There is no point showing visible at night! A message is display to the user.
        // minutes: range(5 * 60, 22 * 60 + 1, 60),
        minutes: range(0, 24 * 60, 60),
        extension: 'jpg',
        notes: [
            'Visible imagery not available at night.'
        ]
    }),
    // Current/Warnings
    'AC_PLOT_BC_weather-warnings': new Metadata({
        id: 'AC_PLOT_BC_weather-warnings',
        title: 'Weather-Warnings',
        minutes: range(30, 24 * 60, 60),
    }),
    'AC_PLOT_BC_precip-24hr': new Metadata({
        id: 'AC_PLOT_BC_precip-24hr',
        title: 'Precip_Past_24h_Estimate_bc',
        minutes: range(6 * 60, 24 * 60, 24 * 60),
    }),
    'AC_PLOT_BC_actual-temps': new Metadata({
        id: 'AC_PLOT_BC_actual-temps',
        title: 'Temperatures-MSLP',
        shortTitle: 'Temperatures',
        minutes: range(0, 24 * 60, 60),
        extension: 'jpg',
    }),
})
