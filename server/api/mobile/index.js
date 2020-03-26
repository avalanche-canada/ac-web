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
        '<h1>Avalanche Canada Shutting Down Forecasting for the Season</h1>' +
            '<h2>Covid-19 Pandemic Prompts Early End to Avalanche Warning Service</h2>' +
            '<p>Avalanche Canada will issue its final forecast for the season on March 28, which is about a month earlier than normal. The final three-day forecast will remain in effect until March 30.</p>' +
            '<p>Avalanche Canada’s forecasts rely primarily on data from a network of avalanche professionals across western Canada. The early closure of backcountry operations due to the Covid-19 pandemic has cut off much of that data stream, so the warning service is no longer receiving enough information to issue accurate forecasts. </p>' +
            '<p>This decision to end forecasting early is also prompted by concerns for the healthcare system during this epidemic. “We do not want to provide a service that promotes recreating in mountainous terrain, where there is often significant hazard,” explains Executive Director Gilles Valade. “Both BC and Alberta have declared a state of emergency. Our health authorities, as well as our Prime Minister, are urging people to stay home. This is clearly not the time for taking any sort of risk.”&nbsp; </p>' +
            '<p>In addition to the early end of the forecasts, Avalanche Canada will also shut down the Mountain Information Network (MIN). This online platform allows backcountry users to submit trip reports and observations from the field. In normal times, the MIN is a highly successful strategy for exchanging real-time information. But, as with the forecasts, Avalanche Canada does not want MIN reports to serve as encouragement to go into the backcountry.</p>' +
            '<p>“We do not take these steps lightly,” adds Valade. “Avalanche Canada is the national public avalanche safety organization and we take our responsibilities very seriously. But we feel it is essential that we work together and do what we can to avoid putting any extra load on our healthcare system at this time.”</p>' +
            '<p><em>Pour la version française, <a href="https://res.cloudinary.com/avalanche-ca/image/upload/v1585084957/French%20news%20releases/20200324_-_Suspension_de_prevision.pdf" target="_blank">cliquez ici</a>.</em></p>',
        'Avalanche Canada Shutting Down Forecasting for the Season',
        'warning'
    )
}
