import { ref } from 'vue'
import { defaultContactsList } from '../common/initialData'
import { AppStorage, CONTACTS_LIST_STORAGE } from '../common/storage'
import { generateId } from '../helpers/helpers'
import { IContact } from '../models/ContactModel'
import { makeTagsList } from './tags'

const storageData = AppStorage.getItem(CONTACTS_LIST_STORAGE)

export const contactsList = ref<IContact[]>(storageData || [])

export function setDefaultContactList(): void {
	contactsList.value = defaultContactsList
	AppStorage.setItem(CONTACTS_LIST_STORAGE, contactsList.value)
}

export function clearContactsList(): void {
	contactsList.value = []
	AppStorage.setItem(CONTACTS_LIST_STORAGE, [])
}

export function addContact(contact: IContact): void {
	contact.id = generateId()
	contactsList.value = [contact, ...contactsList.value]
	AppStorage.setItem(CONTACTS_LIST_STORAGE, contactsList.value)
	makeTagsList()
}

export function removeContact(id: number): void {
	contactsList.value = contactsList.value.filter((item) => item.id !== id)
	AppStorage.setItem(CONTACTS_LIST_STORAGE, contactsList.value)
	makeTagsList()
}

export function editContact(data: IContact): void {
	let contactIndex = contactsList.value.findIndex((item) => item.id === data.id)
	contactsList.value[contactIndex] = data
	AppStorage.setItem(CONTACTS_LIST_STORAGE, contactsList.value)
	makeTagsList()
}

export function getContactById(id: number): IContact | null {
	const contact = contactsList.value.find((item: IContact) => item.id === id)
	return contact || null
}
