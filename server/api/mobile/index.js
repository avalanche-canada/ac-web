'user strict'

const express = require('express')
const compare = require('version-comparison')
const router = express.Router()

router.get('/status', function(req, res) {
    const messages = MESSAGES.filter(message => message.test(req.query))

    return res.json(messages.map(message => message.content))
})

module.exports = router

class StatusParams {
    constructor(
        app,
        appVersion,
        platform,
        platformVersion = null,
        lang = 'en'
    ) {
        Object.assign(this, {
            app,
            appVersion,
            platform,
            platformVersion,
            lang,
        })
    }
    test({ App, AppVersion, Platform, PlatformVersion, Lang = 'en' }) {
        const { app, appVersion, platform, platformVersion, lang } = this

        if (app !== App) {
            return false
        }

        if (lang !== Lang) {
            return false
        }

        if (platform !== Platform) {
            return false
        }

        if (compare(AppVersion, appVersion) !== -1) {
            return false
        }

        if (
            platformVersion &&
            PlatformVersion &&
            compare(PlatformVersion, platformVersion) !== -1
        ) {
            return false
        }

        return true
    }
}

class StatusMessage {
    constructor(
        params,
        title,
        body,
        banner = title,
        level = 'error',
        dismissible = false
    ) {
        this.params = params
        this.content = {
            level,
            dismissible,
            banner,
            page: {
                title,
                body,
            },
        }
    }
    test(params) {
        return this.params.test(params)
    }
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
