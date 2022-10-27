<template>
	<div class="flex items-center flex-col">
		<div class="w-1/2">
			<div class="flex items-center justify-between mb-6">
				<h1 class="text-3xl font-bold">{{ props.actionType === 'create' ? 'Create contact' : 'Edit Contact' }}</h1>
				<i @click="router.go(-1)" class="material-icons text-md block p-1 text-black cursor-pointer hover:text-blue-500"
					>arrow_back</i
				>
			</div>
			<form @submit.prevent="submitForm($event)">
				<div class="mb-5">
					<input
						required
						class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
						type="text"
						placeholder="Full name"
						v-model="contact.fullName"
					/>
				</div>
				<div class="mb-5">
					<input
						required
						class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
						type="email"
						placeholder="Email"
						v-model="contact.email"
					/>
				</div>
				<div class="mb-5">
					<input
						required
						class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
						type="tel"
						placeholder="Phone"
						v-model="contact.phone"
					/>
				</div>
				<ContactTags class="mb-5" :tags="contact.tags"></ContactTags>
				<button type="submit" class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 font-bold">
					{{ props.actionType === 'create' ? 'Create contact' : 'Edit Contact' }}
				</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import ContactTags from '../components/ContactTags.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { IContact } from '../models/ContactModel'
import { addContact, editContact } from '../reactive/contacts'

const props = defineProps<{
	actionType: string
	contact?: IContact
}>()

const router = useRouter()

const contact = reactive({
	id: props.contact?.id || null,
	fullName: props.contact?.fullName || '',
	email: props.contact?.email || '',
	phone: props.contact?.phone || '',
	tags: props.contact?.tags || [],
})

const submitForm = (event: Event) => {
	if (props.actionType === 'edit') {
		editContact(contact as IContact)
	}

	if (props.actionType === 'create') {
		addContact(contact as IContact)
	}

	router.push('/contacts')
}
</script>
