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
const MESSAGES = [
    new StatusMessage(
        new StatusParams(APP, '1.4.2', IOS),
        'New Application version released',
        `<h1>New application version released.</h1>
        <p>A change to the application requires you to install the latest version of the application.</p>
        <a href="https://google.ca">Test for link</a>`
    ),
    new StatusMessage(
        new StatusParams(APP, '1.4.2', ANDROID),
        'New Application version released',
        `<h1>New application version released.</h1>
        <p>A change to the application requires you to install the latest version of the application.</p>
        <a href="https://google.ca">Test for link</a>`
    ),
]
