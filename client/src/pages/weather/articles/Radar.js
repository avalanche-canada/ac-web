import React from 'react'
import Image from '../../../weather/Image'
import ArticleHeader from '../../ArticleHeader'

export default function Precipitation() {
    return (
        <div>
            <ArticleHeader>
                Radar imagery
            </ArticleHeader>
            <Image url={'http://avalanche.ca/assets/images/weather/new_radar_s_cst.png'} />
            <Image url={'http://avalanche.ca/assets/images/weather/new-radar_s_interior.png'} />
            <Image url={'http://avalanche.ca/assets/images/weather/new_radar_BC_mosaic.png'} />
        </div>
    )
}
