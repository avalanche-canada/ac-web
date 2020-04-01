'use strict'

const express = require('express')
const compare = require('version-comparison')
const router = express.Router()

router.get('/status', function(req, res) {
    const messages = MESSAGES.filter(message => message.test(req.query))

    return res.json(messages.map(message => message.content))
})

module.exports = router

function StatusParams(app, appVersion, platform, platformVersion, lang) {
    Object.assign(this, {
        app,
        appVersion,
        platform,
        platformVersion: platformVersion || null,
        lang: lang || 'en',
    })
}

StatusParams.prototype.test = function(params) {
    if (this.app !== params.App) {
        return false
    }

    if (params.Lang && this.lang !== params.Lang) {
        return false
    }

    if (this.platform !== params.Platform) {
        return false
    }

    if (compare(params.AppVersion, this.appVersion) !== -1) {
        return false
    }

    if (
        this.platformVersion &&
        params.PlatformVersion &&
        compare(params.PlatformVersion, this.platformVersion) !== -1
    ) {
        return false
    }

    return true
}

function StatusMessage(params, title, body, banner, level, dismissible) {
    this.params = params
    this.content = {
        level: level || 'error',
        dismissible: typeof dismissible === 'boolean' ? dismissible : false,
        banner: banner || title,
        page: {
            title,
            body,
        },
    }
}

StatusMessage.prototype.test = function(params) {
    return this.params.test(params)
}

// Constants
const APP = 'ca.avalanche.mobile.v2'
const IOS = 'ios'
const ANDROID = 'android'
const STORE_URLS = {
    ios: 'itms-apps://apps.apple.com/ca/app/avalanche-canada/id1440069335',
    android:
        'https://play.google.com/store/apps/details?id=ca.avalanche.mobile.v2',
}
const STORE_PROMPTS = {
    ios: 'Update the AvCan app in the App Store',
    android: 'Update the AvCan app in Google Play',
}

const MESSAGES = [
    createRelease150Message(IOS),
    createRelease150Message(ANDROID),
    createCOVIDMessage(IOS),
    createCOVIDMessage(ANDROID),
]

function createRelease150Message(platform) {
    return new StatusMessage(
        new StatusParams(APP, '1.5.0', platform),
        'New application released for season 2019-2020',
        '<h1>A new Avalanche Canada mobile app has been released for the 2019-2020 season</h1><p>Our app has undergone a major update for the 2019-20 season. The update adds the North Rockies and Yukon as full forecast regions and makes some minor changes to the way information is shown in the forecasts.</p><a href="' +
            STORE_URLS[platform] +
            '">' +
            STORE_PROMPTS[platform] +
            '</a>',
        undefined,
        'warning'
    )
}
function createCOVIDMessage(platform) {
    return new StatusMessage(
        new StatusParams(APP, '9.9.9', platform),
        'COVID-19',
        '<h1>Avalanche Forecasting Ends in Canada</h1>' +
            '<h2>All Forecasting Agencies United in Covid-19 Response</h2>' +
            '<p>As of March 30, every agency that regularly issues public avalanche forecasts in Canada has now discontinued this service. Avalanche Canada, Parks Canada, Kananaskis Country, Avalanche Quebec, and the Vancouver Island Avalanche Centre are united in this response to the Covid-19 pandemic.</p>' +
            '<p>Public health officials and the federal and provincial governments are all urging Canadians to stay home, restrict contact with others, and maintain social distance. Organizations involved in mountain travel are adding their voices to this directive, because the inherent dangers of the backcountry present an unacceptable risk to the healthcare system at this time.&nbsp;&nbsp; </p>' +
            '<p><a href="https://www.pc.gc.ca/en/voyage-travel/securite-safety/covid-19-info" target="_blank">Parks Canada</a> has suspended vehicle access to its facilities, as has <a href="https://www.alberta.ca/release.cfm?xID=699362BD35DB4-FF33-6F8B-09C1E06D75EA207D&amp;fbclid=IwAR3GL2THpSoKjXm2HRAW-p_lyFN8oy0Yhxlt-zv9v6dncKOP3OKUo6qVQ3I" target="_blank">Alberta Parks</a>. The <a href="https://www.acmg.ca/03public/about/public_message.aspx" target="_blank">Association of Canadian Mountain Guides</a> has recommended its members cease guiding operations and the <a href="https://www.alpineclubofcanada.ca/web/ACCMember/About/ACC_coronavirus_information.aspx?WebsiteKey=e91345b4-1931-469d-b925-88d675724e63" target="_blank">Alpine Club of Canada</a> has suspended operations in their facilities across the country. The <a href="https://backcountrylodgesofbc.com/" target="_blank">Backcountry Lodges of BC Association</a> has asked its member lodges to close until health authorities determine the emergency is over. And at least <a href="https://www.piquenewsmagazine.com/whistler/whistler-search-and-rescue-urges-province-to-consider-ban-on-backcountry-recreation/Content?oid=15189952" target="_blank">one search and rescue group</a> in BC has requested the backcountry be closed, because these volunteer organizations are not sufficiently equipped to deal with the added hazard of this virus.</p>' +
            "<p>As Canada’s national public avalanche safety organization, Avalanche Canada is proud to support all these partners and to help present cohesive and coherent advice to our users at this unprecedented time. We encourage you to follow the directives of governments and health authorities and stay home. We're all in this together and by doing our part now, we will be able to get back to great backcountry experiences next winter.</p>" +
            '<p>Please be safe, and stay healthy. </p>',
        'Avalanche Canada, Parks Canada, and Kananaskis Country Have All Discontinued Forecasting for the Season',
        'warning'
    )
}
