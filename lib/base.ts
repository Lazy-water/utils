export const toString = (v: any) => Object.prototype.toString.call(v)

export const libLogWarn = (message?: any, ...optionalParams: any[]) => {
	console.warn('ltUtils:', message, ...optionalParams)
}

/**
 * 合并异步任务的并发，即“相等”的异步任务并发情况下仅执行一次
 * @param fn 异步函数，请使用箭头函数避免上下文问题
 */
export function mergeConcurrent<T extends any[]>(fn: (...args: T) => Promise<unknown>) {
	const resolverList: { resolve: Function; reject: Function }[] = []
	let inProgress = false

	return (...args: T) => {
		return new Promise(async (resolve, reject) => {
			resolverList.push({ resolve, reject })
			if (inProgress) return

			inProgress = true
			try {
				const ret = await fn(...args)
				resolverList.forEach((li) => li.resolve(ret))
			} catch (e) {
				resolverList.forEach((li) => li.reject(e))
			}
			resolverList.length = 0
			inProgress = false
		})
	}
}

/**
 * 生成一个随机ID，伪唯一
 * @param opt -{ prefix?: 前缀 }
 */
export function createUniqueId(opt?: { prefix?: string }) {
	return '' + (opt?.prefix || '') + Math.floor(Math.random() * 10e5).toString(36)
}

/**
 * 节流函数
 */
export function throttle(fn: Function, wait = 150) {
	let last = 0
	return function (...args: any) {
		const now = Date.now()
		if (now - last > wait) {
			fn.apply(this, args)
			last = now
		}
	}
}

/**
 * 防抖函数
 */
export function debounce(fn: Function, wait = 200, immediate = false) {
	let timer: ReturnType<typeof setTimeout> | null

	return function (...args: any) {
		if (timer) clearTimeout(timer)
		if (immediate) {
			timer = null
			return fn.apply(this, args)
		}
		timer = setTimeout(() => fn.apply(this, args), wait)
	}
}

/**
 * 等待
 * @param time 等待时间，ms
 */
export const sleep = (time = 0) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), time)
	})
}

/**
 * 动态加载JS文件
 * @param url
 * @param props -给script标签添加属性
 * @returns 加载完成
 */
export const loadJs = (url: string, props?: Record<string, any>) => {
	return new Promise((resolve, reject) => {
		const el = document.createElement('script')
		if (props) {
			for (let k in props) {
				el.setAttribute(k, props[k])
			}
		}
		el.src = url
		el.onload = resolve
		el.onerror = (e) => {
			document.head.removeChild(el)
			reject(e)
		}
		document.head.appendChild(el)
	})
}
