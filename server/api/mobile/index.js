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
const STORE_NAMES = {
    ios: 'App Store',
    android: 'Google Play',
}
const STORE_PROMPTS = {
    ios: 'Open the AvCan app in the ' + STORE_NAMES[IOS],
    android: 'Open the AvCan app in ' + STORE_NAMES[ANDROID],
}

const MESSAGES = [
    createRelease145Message(IOS),
    createRelease145Message(ANDROID),
]

function createRelease145Message(platform) {
    return new StatusMessage(
        new StatusParams(APP, '1.5.0', platform),
        'New application released for season 2019-2020',
        '<h1>A new application has been released for season 2019-2020.</h1><p>A change to our products offer for season 2019-2020 requires to update the application.</p><a href="' +
            STORE_URLS[platform] +
            '">' +
            STORE_PROMPTS[platform] +
            '  ></a>'
    )
}
