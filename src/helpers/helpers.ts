export const phoneLinkFormat = (phone: string): string => {
	let formatedPhone = phone.trim()
	formatedPhone = formatedPhone.replace(/\s/g, '')
	formatedPhone = formatedPhone.replace(/[()\-+]/g, '')
	return formatedPhone
}

export const generateId = (): number => {
	return Math.ceil(Date.now() / Math.ceil(Math.random() * 100))
}

export const debounce = (fn: any, delay = 0, immediate = false) => {
	let timeout: any
	return (...args: any) => {
		if (immediate && !timeout) fn(...args)
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}
