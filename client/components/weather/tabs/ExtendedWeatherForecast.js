import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/time'
import Section from './Section'
import addDays from 'date-fns/add_days'
import GramSet, { Location } from './gram'
import Caroussel from './Carousel'
import ExceedenceProbability from './ExceedenceProbability'

ExtendedWeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    const day5 = addDays(date, 4)
    const day7 = addDays(date, 6)

    return (
        <div>
            <DateElement value={day5} /> to <DateElement value={day7} />
        </div>
    )
}

const hpa = [
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_096.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_120.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_144.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_096.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_120.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/GZ500/CMC_NCEP/2017083100_144.gif',
]
const thickness = [
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/DZ500/CMC_NCEP/2017083100_096.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/DZ500/CMC_NCEP/2017083100_120.gif',
    'http://collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/DZ500/CMC_NCEP/2017083100_144.gif',
]

export default function ExtendedWeatherForecast({ date }) {
    return (
        <Section title={<Title date={date} />}>
            <h4>500hPa Mean / Standard Deviation Chart</h4>
            <Caroussel images={hpa} />
            <h4>Thickness 100 – 500 Chart</h4>
            <Caroussel images={thickness} />
            <h4>EPSgrams</h4>
            <GramSet>
                <Location>
                    <header>Terrace</header>
                    <img src="http://collaboration.cmc.ec.gc.ca/cmc/ensemble/data2/combine/images/2017083100_054@007_E1_yxt_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png" />
                </Location>
                <Location>
                    <header>Prince George</header>
                    <img src="http://collaboration.cmc.ec.gc.ca/cmc/ensemble/data2/combine/images/2017083100_054@007_E1_yxs_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png" />
                </Location>
                <Location>
                    <header>Vancouver</header>
                    <img src="http://collaboration.cmc.ec.gc.ca/cmc/ensemble/data2/combine/images/2017083100_054@007_E1_yvr_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png" />
                </Location>
                <Location>
                    <header>Revelstoke</header>
                    <img src="http://collaboration.cmc.ec.gc.ca/cmc/ensemble/data2/combine/images/2017083100_054@007_E1_yrv_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png" />
                </Location>
            </GramSet>
            <h4>Exceedence Probability</h4>
            <ExceedenceProbability />
        </Section>
    )
}
