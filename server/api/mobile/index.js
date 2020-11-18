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
    createMINIssuesMessage(IOS),
    createMINIssuesMessage(ANDROID),
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

function createMINIssuesMessage(platform) {
    return new StatusMessage(
        new StatusParams(APP, '9.9.9', platform),
        'Experiencing issues with the MIN',
        '<h1>Experiencing issues with the MIN</h1><p>We have received reports of MIN users experiencing issues uploading their observations.</p><p>We are looking into them.</p><p>In the meantime, you can post your observations to the MIN through our website: <a href="https://www.avalanche.ca/min/submit">https://www.avalanche.ca/min/submit</a>.</p><p>Thank you for your understanding.</p>',
        undefined,
        'warning'
    )
}
