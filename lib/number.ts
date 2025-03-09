/**
 * 四舍五入，Number.toFixed 是四舍六入五取偶
 * @param num     [待处理数字]
 * @param decimal [需要保留的小数位]
 * @param opt     {floor: 处理精度、舍入时是否向下取“整” 默认false}
 */
export const roundNumber = (num: number | string, decimal = 2, opt?: { floor?: boolean }): number => {
	const n = Number(num)
	if (isNaN(n)) {
		return 0
	}
	const { floor } = opt || {}
	const p1 = Math.pow(10, decimal + 1)
	const p2 = Math.pow(10, decimal)
	return (!floor ? Math.round((n * p1) / 10) : Math.floor((n * p1) / 10)) / p2
}

/**
 * 给数字补齐长度
 * @param n 数字
 * @param width 位数，也就是最终字符串的长度
 * @param opt { right: 是否从右侧补, sign: 默认补0 }
 */
export const padNumber = (n: number, width = 2, opt?: { right?: boolean; sign?: string }) => {
	const { right, sign = '0' } = opt || {}
	const nStr = String(n)
	let padStr = ''
	const padN = width - nStr.length
	if (padN > 0) {
		for (let i = 0; i < padN; i++) {
			padStr += sign
		}
	}
	return !right ? `${padStr}${nStr}` : `${nStr}${padStr}`
}

/**
 * 把数字转成带单位的字符串：99->"99"，99999->"9.99万"
 * @param n 数值
 * @param opt { plusSign: 加单位后是否在末尾补加号; lang: zh|es 默认zh中文单位; decimal: 小数位数 默认lang=zh时为2，否则为1; floor: 是否向下取整 默认true }
 */
export const unitNumber = (
	n: number,
	opt?: { lang?: string; plusSign?: boolean; decimal?: number; floor?: boolean }
) => {
	const { lang = 'zh', plusSign = false, decimal, floor = true } = opt || {}
	const piece = lang === 'zh' ? 10000 : 1000
	const theDecimal = typeof decimal === 'number' ? decimal : lang === 'zh' ? 2 : 1
	if (n < piece) {
		if (plusSign) {
			if (n > 1000) return `${Math.floor(n / 1000) * 1000}+`
			if (n > 100) return `${Math.floor(n / 100) * 100}+`
		}
		return roundNumber(n, theDecimal, { floor }) + ''
	}
	let val: number | string
	if (lang === 'zh') {
		const units = ['', '万', '亿', '万亿']
		const i = Math.floor(Math.log(n) / Math.log(piece))
		val = roundNumber(n / Math.pow(piece, i), theDecimal, { floor }) + units[i]
	} else {
		if (n >= 1000000) val = roundNumber(n / 1000000, theDecimal, { floor }) + 'm'
		else if (n >= 10000) val = roundNumber(n / 10000, theDecimal, { floor }) + 'w'
		else val = roundNumber(n / 1000, theDecimal, { floor }) + 'k'
	}
	return `${val}${!plusSign ? '' : '+'}`
}

/**
 * 把数字转换成三位逗号分隔的字符串(最多支持小数点三位)
 * @param n 要转化的数字
 * @returns 123,231
 */
export const partNumber = (n: number | string) => Number(n).toLocaleString()
