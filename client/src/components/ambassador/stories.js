import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {withKnobs, number, boolean, text} from '@kadira/storybook-addon-knobs'
import Ambassador from './Ambassador'

const stories = storiesOf('Ambassador', module)

stories.addDecorator(withKnobs)

const Nadine = {
    fullName: 'Nadine Overwater',
    banner: {
        src: 'https://prismic-io.s3.amazonaws.com/avalancheca/83492140d84e2fd7bfbf252ddd3f15024c024709_img_9701timgrey.jpg'
    },
    avatar: {
        src: 'https://prismic-io.s3.amazonaws.com/avalancheca/0838a27309f5d9edd8d521bcfbe733525665c5be_nadine-head-shot-av-am.jpg'
    },
    socials: [
        'https://www.facebook.com/nadine.overwater',
        'https://www.instagram.com/nadineoverwater/',
        'http://laninasledcamp.ca/',
    ],
    biography: 'Nadine started out on a snowmobile at age seven and has never looked back. She got into serious mountain sledding in 2007 and has been guiding in the Revelstoke area since 2010. She spends well over 100 days a season on her machine, riding with all different skill levels and pursuing professional-level avalanche training. In 2012, Nadine started La Nina Sled Camp, a venue for women riders to build confidence in a positive environment, away from the stress of having to keep up with their partners. Nadine hopes to continue influencing and educating other women to “get out and shred” as often as they like.'
}

stories.addWithInfo('Ambassador', () => {
    const {biography, ...props} = Nadine

    return (
        <Ambassador {...props}>
            {biography}
        </Ambassador>
    )
})
