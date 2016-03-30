import { asSrcSet } from './Url'

export function mapUrlToSrc({url, ...rest}, withSrcSet = false) {
	if (withSrcSet) {
		return {
			// srcSet: asSrcSet(url),
			src: url,
			...rest
		}
	}

	return {
		src: url,
		...rest
	}
}
