import { ref } from 'vue'
import { IContact } from '../models/ContactModel'
import { contactsList } from './contacts'

export const tags = ref<string[]>([])

export function makeTagsList(): void {
	const tagsList: string[] = []
	contactsList.value.forEach((item: IContact) => {
		if (item.tags?.length) {
			tagsList.push(...item.tags)
		}
	})
	const tagsListSet = new Set(tagsList)
	tags.value = [...tagsListSet]
}
