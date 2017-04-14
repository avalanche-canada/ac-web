import * as Ratings from '~/constants/forecast/rating'
import * as Palette from '~/constants/forecast/palette'

export const TextFill = new Map([
    [Ratings.EXTREME, Palette.WHITE],
    [Ratings.HIGH, Palette.BLACK],
    [Ratings.CONSIDERABLE, Palette.BLACK],
    [Ratings.MODERATE, Palette.BLACK],
    [Ratings.LOW, Palette.BLACK],
    [Ratings.NO_RATING, Palette.BLACK],
])

export const BannerFill = new Map([
    [Ratings.EXTREME, Palette.BLACK],
    [Ratings.HIGH, Palette.RED],
    [Ratings.CONSIDERABLE, Palette.ORANGE],
    [Ratings.MODERATE, Palette.YELLOW],
    [Ratings.LOW, Palette.GREEN],
    [Ratings.NO_RATING, Palette.WHITE],
])

export const BannerStroke = new Map([
     [Ratings.EXTREME, Palette.RED],
     [Ratings.HIGH, Palette.BLACK],
     [Ratings.CONSIDERABLE, Palette.BLACK],
     [Ratings.MODERATE, Palette.BLACK],
     [Ratings.LOW, Palette.BLACK],
     [Ratings.NO_RATING, Palette.BLACK],
])

export const DangerIcon = new Map([
     [Ratings.EXTREME, Palette.RED],
     [Ratings.HIGH, Palette.RED],
     [Ratings.CONSIDERABLE, Palette.ORANGE],
     [Ratings.MODERATE, Palette.YELLOW],
     [Ratings.LOW, Palette.GREEN],
     [Ratings.NO_RATING, Palette.WHITE],
])
