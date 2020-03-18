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
        'Backcountry Activities During Pandemic',
        '<h1>Please Restrain Backcountry Activities During Pandemic</h1>' +
            '<h2>Avoid adding load to the healthcare system at this time</h2>' +
            '<p>COVID-19 is creating unprecedented challenges to our healthcare system. All avalanche forecasting agencies are urging backcountry users to be extra vigilant to the possibility of any type of incident that could add more load to a system already under huge pressure. </p>' +
            '<p>Please consider this fact while planning your recreation. This could be a time to avoid the backcountry. If you choose to head out, every effort should be made to avoid injuries. We encourage you to take all precautions necessary to safeguard the health and safety of your group and others.</p>',
        'Covid-19 is overloading our healthcare system. Please be conservative in your choices.',
        'warning'
    )
}
