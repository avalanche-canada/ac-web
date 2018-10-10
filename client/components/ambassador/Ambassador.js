import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'prismic/components/base'
import { SocialSet, SocialItem } from 'components/social'
import { FragmentIdentifier } from 'router'
import styles from './Ambassador.css'

Ambassador.propTypes = {
    fullName: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
    avatar: PropTypes.object.isRequired,
    banner: PropTypes.object.isRequired,
    hash: PropTypes.string,
}

export default function Ambassador({
    fullName,
    socials = [],
    banner,
    avatar,
    children,
}) {
    const hash = fullName.toLowerCase().replace(/\s/g, '-')
    function title(name) {
        return `Visit ${fullName} on ${name}`
    }

    return (
        <section className={styles.Ambassador}>
            <div className={styles.Biography}>
                <div className={styles.Avatar}>
                    {avatar && <Image {...avatar.main} />}
                    <SocialSet>
                        {socials.map(link => (
                            <SocialItem key={link} link={link} title={title} />
                        ))}
                    </SocialSet>
                </div>
                <div className={styles.Content}>
                    <h2>
                        <FragmentIdentifier hash={hash}>
                            {fullName}
                        </FragmentIdentifier>
                    </h2>
                    {children}
                </div>
            </div>
            {banner && <Image className={styles.Banner} {...banner.main} />}
        </section>
    )
}
