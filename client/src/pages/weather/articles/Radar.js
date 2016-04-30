import React from 'react'
import Image from '../../../weather/Image'
import ArticleHeader from '../../ArticleHeader'
import image1 from './images/new_radar_s_cst.png'
import image2 from './images/new-radar_s_interior.png'
import image3 from './images/new_radar_BC_mosaic.png'

export default function Precipitation() {
    return (
        <div>
            <ArticleHeader>
                Radar imagery
            </ArticleHeader>
            <Image url={image3} />
            <Image url={image1} />
            <Image url={image2} />
        </div>
    )
}
