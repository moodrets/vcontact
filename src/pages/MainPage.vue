<template>
	<div class="centered flex flex-col items-center">
		<h1 class="text-3xl font-bold">Welcome to <span class="text-blue-500">VContact</span> Application</h1>
		<p class="my-6 leading-relaxed">This application will help you store contacts and work with them conveniently</p>

		<div class="flex space-x-4 font-bold mb-6">
			<button @click="setTestContactList()" class="px-4 py-2 bg-sky-500 rounded-md text-white">
				Set default contacts list (for testing)
			</button>
			<button @click="clearList()" class="px-4 py-2 bg-red-500 rounded-md text-white">Clear contacts list</button>
		</div>
		<div class="flex space-x-4 font-bold">
			<button @click="contactsListPage()" class="px-4 py-2 bg-blue-500 rounded-md text-white">Contacts List Page</button>
			<router-link to="/contacts/create" class="px-4 py-2 bg-green-500 rounded-md text-white"
				>Create New Contact</router-link
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DELETE_ALL_CONTACTS } from '../common/messages'
import { setDefaultContactList, clearContactsList } from '../reactive/contacts'

const router = useRouter()

const setTestContactList = () => {
	setDefaultContactList()
	router.push('/contacts/')
}

const clearList = () => {
	if (confirm(DELETE_ALL_CONTACTS)) {
		clearContactsList()
		router.push('/contacts/')
	}
}

const contactsListPage = () => {
	router.push('/contacts/')
}
</script>
