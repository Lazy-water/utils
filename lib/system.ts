import { isBrowser } from './is'

interface SystemInfo {
	devicePixelRatio: number
	language: string
	windowHeight: number
	windowWidth: number

	isMac: boolean
	isAndroid: boolean
	isIos: boolean
	isWeixin: boolean
	isAlipay: boolean
	// 是否是在微信小程序的 webview 中
	isMpWebWeixin?: boolean
}

export const getSystemInfo = (): SystemInfo => {
	if (!isBrowser) return {} as any
	const ua = navigator.userAgent
	const isMac = /macintosh|mac os x/i.test(ua)
	const isWeixin = /micromessenger/.test(ua.toLowerCase())
	const isAndroid = /android/.test(ua.toLowerCase())

	return {
		devicePixelRatio: window.devicePixelRatio,
		language: navigator.language,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth,

		isMac,
		isAndroid,
		isIos: /(iPhone|iPad|iPod|iOS)/i.test(ua) || isMac,
		isWeixin,
		isAlipay: /alipay/.test(ua.toLowerCase()),
		isMpWebWeixin: isWeixin && ua.includes('miniProgram')
	}
}
