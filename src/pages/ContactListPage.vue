<template>
	<div class="centered">
		<div class="flex">
			<div class="w-1/4 pr-5" v-if="contactsList.length">
				<ContactsFilter></ContactsFilter>
			</div>
			<div class="flex-1">
				<h1 class="mb-6 text-3xl font-bold">Your contacts</h1>
				<div v-if="contactsList.length">
					<ContactItem v-for="contact in filteredContacts" :key="contact.id" :contact="contact"></ContactItem>
				</div>
				<div v-else>
					<div class="text-2xl mb-5">Contacts not found</div>
					<router-link to="/contacts/create" class="px-4 py-2 bg-green-500 rounded-md text-white"
						>Create New Contact</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ContactItem from '../components/ContactItem.vue'
import ContactsFilter from '../components/ContactsFilter.vue'
import { phoneLinkFormat } from '../helpers/helpers'
import { IContact } from '../models/ContactModel'
import { contactsList } from '../reactive/contacts'
import { filterData } from '../reactive/filter'

const filteredContacts = computed(() => {
	let resultData: IContact[] = contactsList.value

	if (filterData.fullName) {
		resultData = resultData.filter((item: IContact) => {
			const fullNameLowercase = item.fullName.toLocaleLowerCase()
			const filterFullNameLowercase = filterData.fullName.toLocaleLowerCase()
			if (fullNameLowercase.includes(filterFullNameLowercase)) {
				return item
			}
		})
	}

	if (filterData.email) {
		resultData = resultData.filter((item: IContact) => {
			if (item.email.includes(filterData.email)) {
				return item
			}
		})
	}

	if (filterData.phone) {
		resultData = resultData.filter((item: IContact) => {
			const itemPhoneFormat = phoneLinkFormat(item.phone)
			const filterPhoneFormat = phoneLinkFormat(filterData.phone)
			if (itemPhoneFormat.includes(filterPhoneFormat)) {
				return item
			}
		})
	}

	if (filterData.tag) {
		resultData = resultData.filter((item: IContact) => item.tags?.includes(filterData.tag))
	}

	return resultData
})
</script>
