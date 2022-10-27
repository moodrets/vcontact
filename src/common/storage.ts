export const CONTACTS_LIST_STORAGE = 'contacts_list_storage'

export class AppStorage {
	public static setItem(key: string, data: any): void {
		localStorage.setItem(key, JSON.stringify(data))
	}
	public static getItem(data: any): any {
		const item = localStorage.getItem(data)
		return item ? JSON.parse(item) : null
	}
	public static removeItem(key: string): void {
		localStorage.removeItem(key)
	}
	public static clear(): void {
		localStorage.clear()
	}
}
