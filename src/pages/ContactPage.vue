<template>
	<div class="centered">
		<div class="flex justify-center">
			<div class="w-1/2">
				<div class="flex items-center justify-between mb-6">
					<h1 class="text-3xl font-bold">{{ contact?.fullName }}</h1>
					<div class="flex items-center space-x-2 relative z-20">
						<router-link
							:to="`/contacts/edit/${contact?.id}`"
							class="material-icons text-md block p-1 text-green-500 cursor-pointer hover:text-green-600"
						>
							edit
						</router-link>
						<i
							@click="removeContactHandler(contact)"
							class="material-icons text-md block p-1 text-red-500 cursor-pointer hover:text-red-600"
							>delete</i
						>
						<i @click="router.go(-1)" class="material-icons text-md block p-1 text-black cursor-pointer hover:text-blue-500"
							>arrow_back</i
						>
					</div>
				</div>
				<a :href="linkPhone" class="inline-block text-2xl font-semibold mb-6 hover:text-blue-500">{{ contact?.phone }}</a>
				<div class="text-2xl font-semibold mb-6">{{ contact?.email }}</div>
				<div class="flex flex-wrap space-x-2">
					<router-link
						v-for="tag in contact.tags"
						:key="tag"
						:to="`/contacts/?tag=${tag}`"
						class="border-2 border-sky-500 px-2 py-1 rounded-md font-bold text-sky-500"
						>{{ tag }}</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { DELETE_THIS_CONTACT } from '../common/messages'
import { phoneLinkFormat } from '../helpers/helpers'
import { IContact } from '../models/ContactModel'
import { getContactById, removeContact } from '../reactive/contacts'

const route = useRoute()
const router = useRouter()
const contactId = +route.params.id
const contact = getContactById(contactId) as IContact

const removeContactHandler = (contact: IContact) => {
	if (confirm(DELETE_THIS_CONTACT)) {
		removeContact(contact.id as number)
		router.push('/contacts/')
	}
}

const linkPhone = phoneLinkFormat(contact.phone)
</script>
