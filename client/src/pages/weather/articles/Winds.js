import React from 'react'
import Loop from '../../../weather/Loop'
import ArticleHeader from '../../ArticleHeader'

export default function Precipitation() {
    return (
        <div>
            <ArticleHeader>Winds</ArticleHeader>
            <Loop type='AC_GDPS_BC_2500m-wind' />
        </div>
    )
}
