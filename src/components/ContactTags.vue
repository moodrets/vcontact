<template>
	<div class="flex items-center flex-wrap">
		<div
			class="flex items-center border-2 border-sky-500 px-2 py-1 rounded-md font-bold text-sky-500 mb-2 mr-2"
			v-for="(tag, index) in tags"
			:key="tag"
		>
			<div>{{ tag }}</div>
			<i @click="removeTag(index)" class="material-icons flex-none text-base cursor-pointer ml-2">close</i>
		</div>
		<input
			@keydown.enter="addTag($event)"
			@keydown.tab="addTag($event)"
			class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none flex-1 mb-2 placeholder:text-slate-600"
			type="text"
			v-model="inputValue"
			:placeholder="props.tags.length ? '' : 'Tags'"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	tags: string[]
}>()

const inputValue = ref('')

const removeTag = (index: number) => {
	props.tags.splice(index, 1)
}

const addTag = (event: Event) => {
	if (props.tags.includes(inputValue.value)) {
		event.preventDefault()
		inputValue.value = ''
		return
	}

	if (inputValue.value) {
		event.preventDefault()
		props.tags.push(inputValue.value)
		inputValue.value = ''
	}
}
</script>
