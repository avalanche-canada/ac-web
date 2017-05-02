import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { ItemSet, Item } from './index'

const sponsors = [
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955453/logos/Logos%20png/Teck.png',
        url: 'http://www.tecksustainability.com/sites/base/pages/our-strategy/community-focus/community-investment',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955422/logos/Logos%20png/cp.png',
        url: 'http://www.cpr.ca/en',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955433/logos/Logos%20png/mec.png',
        url: 'http://www.mec.ca/Main/home.jsp',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955453/logos/Logos%20png/tecterra.png',
        url: 'http://www.tecterra.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1417026146/logos/Logos%20png/isma_all_four_qk0nnp.png',
        url: 'http://www.snowmobile.org/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955422/logos/Logos%20png/cbt.png',
        url: 'http://www.cbt.org/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955474/logos/Logos%20png/varda.png',
        url: 'http://www.ridevalemount.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1423770742/logos/Logos%20png/thunderstruck.png',
        url: 'http://www.thunderstruckfilms.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955469/logos/Logos%20png/yamnuska.png',
        url: 'http://yamnuska.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416864977/logos/labatt.png',
        url: 'http://www.labatt.com/?language=en',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955458/logos/Logos%20png/sandman.png',
        url: 'http://www.sandmanhotels.ca/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1423767167/logos/Logos%20png/cardelhomes.png',
        url: 'http://www.cardelhomes.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955423/logos/Logos%20png/arcteryx.png',
        url: 'http://arcteryx.com/Home.aspx?language=EN',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1419283186/logos/Logos%20png/revsledclub.png',
        url: 'http://revelstokesnowmobileclub.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955455/logos/Logos%20png/rbc.png',
        url: 'http://www.rbc.com/community-sustainability/community/index.html?utm_campaign=April%203,%202012%20-%20FR&utm_medium=email&utm_source=CampaignCog',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955435/logos/Logos%20png/marmot.png',
        url: 'http://marmot.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_74,w_229/v1463079288/logos/OriginalSizeLogos/Hunters_Range_logo.jpg',
        url: 'https://www.facebook.com/Hunters-Range-Snowmobile-Association-107251849393312/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,h_72,w_229/v1448319784/logos/OriginalSizeLogos/G3-RED-Text-Black-trim.png',
        url: 'http://www.genuineguidegear.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_104,w_229/v1448317954/logos/OriginalSizeLogos/bcsf.png',
        url: 'http://www.bcsf.org/cpages/home',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,f_auto,g_center,h_72,w_229/v1457471235/logos/logoSCARPA_3145U_EN.png',
        url: 'https://www.scarpa.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955437/logos/Logos%20png/northface.png',
        url: 'http://www.thenorthface.com/en_CA/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955433/logos/Logos%20png/mammut.png',
        url: 'http://www.mammut.ch/en/index.html',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1422469879/logos/Logos%20png/fxr_mtn.png',
        url: 'https://www.fxrracing.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1427927010/logos/Logos%20png/crowfoot.png',
        url: 'http://crowfootmtn.webs.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_74,w_229/v1458072011/logos/rab_logo_black.jpg',
        url: 'http://rab.equipment/ww/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_72,w_229/v1447367391/logos/OriginalSizeLogos/OR_Logo_Wordmark.png',
        url: 'http://www.outdoorresearch.ca/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1424295853/logos/Logos%20png/blueriverpowderpackers.png',
        url: 'http://sledblueriver.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955456/logos/Logos%20png/rcr.png',
        url: 'http://www.skircr.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955420/logos/Logos%20png/bca.png',
        url: 'http://www.backcountryaccess.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1426184649/logos/Logos%20png/coquihalla.png',
        url: 'http://www.coqsnow.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955441/logos/Logos%20png/inreach.png',
        url: 'http://www.inreachcanada.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955428/logos/Logos%20png/asa.png',
        url: 'http://altasnowmobile.ab.ca/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1417818025/logos/Logos%20png/canucksplitfest.png',
        url: 'http://www.priorsnow.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_72,w_229/v1449162133/logos/OriginalSizeLogos/FernieSAR.png',
        url: 'http://fernie.vr-sar.org/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1441918832/logos/Logos%20png/serico.png',
        url: 'http://www.serico.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955424/logos/Logos%20png/alpineclubcanada.png',
        url: 'http://www.alpineclubofcanada.ca/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955455/logos/Logos%20png/smithersledassoc.png',
        url: 'http://smitherssnowmobileassociation.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955468/logos/Logos%20png/whistlerblackcomb.png',
        url: 'http://www.whistlerblackcomb.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955435/logos/Logos%20png/monasheepowder.png',
        url: 'http://www.monasheepowder.com/',
    },
    {
        src: 'http://res.cloudinary.com/avalanche-ca/image/upload/v1416955425/logos/Logos%20png/innate.png',
        url: 'http://www.innate-gear.com/',
    },
]

storiesOf('Sponsor', module).add('Sponsor', () => (
    <ItemSet>
        {sponsors.map(sponsor => <Item {...sponsor} title={sponsor.url} />)}
    </ItemSet>
))
