import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'components/page'
import { Set, Item } from 'components/social'
import { Image } from 'prismic/components/base'
import styles from './Ambassador.css'
import { useIntl } from 'react-intl'

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
    const intl = useIntl()
    const hash = fullName.toLowerCase().replace(/\s/g, '-')
    function title(service) {
        return intl.formatMessage({
            description: 'Ambassador component',
            defaultMessage: 'Visit {fullName} on {service}',
            values: {
                fullName,
                service,
            },
        })
    }

    return (
        <section className={styles.Container}>
            <Heading hash={hash}>{fullName}</Heading>
            <div className={styles.Biography}>
                <div className={styles.Avatar}>
                    {avatar && <Image {...avatar} />}
                    <Set>
                        {socials.map(link => (
                            <Item key={link} link={link} title={title} />
                        ))}
                    </Set>
                </div>
                <div className={styles.Content}>{children}</div>
            </div>
            {banner && <Image className={styles.Banner} {...banner} />}
        </section>
    )
}
