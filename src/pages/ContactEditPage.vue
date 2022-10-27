<template>
	<div class="centered">
		<ContactForm action-type="edit" :contact="contact"></ContactForm>
	</div>
</template>

<script lang="ts" setup>
import ContactForm from '../components/ContactForm.vue'

import { useRoute } from 'vue-router'
import { IContact } from '../models/ContactModel'
import { getContactById } from '../reactive/contacts'

const route = useRoute()
const contactId = +route.params.id
const contact = getContactById(contactId) as IContact
</script>
