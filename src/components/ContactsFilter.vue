<template>
	<aside class="sticky top-[97px]">
		<h1 class="mb-6 text-2xl font-bold">Filter contacts</h1>
		<div class="mb-3">
			<div class="text-md font-bold mb-2">By name</div>
			<input
				class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
				type="text"
				:value="filterData.fullName"
				@input="inputChange($event, 'fullName')"
			/>
		</div>
		<div class="mb-3">
			<div class="text-md font-bold mb-2">By email</div>
			<input
				class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
				type="text"
				:value="filterData.email"
				@input="inputChange($event, 'email')"
			/>
		</div>
		<div class="mb-3">
			<div class="text-md font-bold mb-2">By phone</div>
			<input
				class="border-2 border-gray-400 rounded-md px-4 py-1 outline-none w-full placeholder:text-slate-600"
				type="text"
				:value="filterData.phone"
				@input="inputChange($event, 'phone')"
			/>
		</div>
		<div class="mb-3" v-if="tags.length">
			<div class="font-bold text-md mb-3">By tags</div>
			<div class="flex flex-wrap">
				<div
					class="flex items-center border-2 px-2 py-1 rounded-md font-bold mb-2 mr-2 cursor-pointer select-none"
					:class="filterData.tag === tag ? 'border-pink-500 text-pink-500' : 'border-sky-500 text-sky-500'"
					v-for="(tag, index) in tags"
					@click="tagClick(tag)"
					:key="tag"
				>
					{{ tag }}
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue'
import { makeTagsList, tags } from '../reactive/tags'
import { filterData } from '../reactive/filter'
import { debounce } from '../helpers/helpers'
import { useRoute, useRouter } from 'vue-router'

type FilterFieldsType = 'fullName' | 'email' | 'phone' | 'tag'

const route = useRoute()
const router = useRouter()

const routerPushQuery = (value: string, param: string) => {
	if (value) {
		router.push({ path: route.path, query: { ...route.query, [param]: value } })
		return
	}
	const params = { ...route.query }
	delete params[param]
	router.push({ path: route.path, query: params })
}

const tagClick = (tag: string) => {
	if (filterData.tag === tag) {
		filterData.tag = ''
	} else {
		filterData.tag = tag
	}
	routerPushQuery(filterData.tag, 'tag')
}

const inputChange = debounce((event: Event, key: FilterFieldsType) => {
	const target = event.target as HTMLInputElement
	filterData[key] = target.value
	routerPushQuery(target.value, key)
}, 200)

const setParamsFromUrl = () => {
	for (const param in route.query) {
		filterData[param] = route.query[param]
	}
}

onBeforeMount(() => {
	makeTagsList()
	setParamsFromUrl()
})

onUnmounted(() => {
	filterData.fullName = ''
	filterData.email = ''
	filterData.phone = ''
	filterData.tag = ''
})
</script>
