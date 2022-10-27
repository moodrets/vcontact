<template>
	<div
		class="transition-all p-4 flex justify-between items-center relative z-10 group mb-1 shadow-md hover:shadow-xl hover:border-sky-500"
	>
		<router-link class="absolute inset-0 z-10" :to="`/contacts/${props.contact.id}`"></router-link>
		<div>
			<div class="font-bold text-md text-sky-500">{{ props.contact.fullName }}</div>
			<div class="font-bold text-md text-gray-700">{{ props.contact.email }}</div>
			<div class="text-xl font-bold">{{ props.contact.phone }}</div>
		</div>
		<div class="flex items-center space-x-4 relative z-20">
			<router-link
				:to="`/contacts/edit/${props.contact.id}`"
				class="material-icons text-md block p-1 text-green-500 cursor-pointer hover:text-green-600"
			>
				edit
			</router-link>
			<i
				@click="removeContactHandler(props.contact)"
				class="material-icons text-md block p-1 text-red-500 cursor-pointer hover:text-red-600"
			>
				delete
			</i>
		</div>
	</div>
</template>

<script setup lang="ts">
import { IContact } from '../models/ContactModel'
import { DELETE_THIS_CONTACT } from '../common/messages'
import { removeContact } from '../reactive/contacts'

const props = defineProps<{
	contact: IContact
}>()

const removeContactHandler = (contact: IContact) => {
	if (confirm(DELETE_THIS_CONTACT)) {
		removeContact(contact.id as number)
	}
}
</script>
