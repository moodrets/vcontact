import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Default from './layouts/Default.vue'
import MainPage from './pages/MainPage.vue'
import ContactPage from './pages/ContactPage.vue'
import ContactListPage from './pages/ContactListPage.vue'
import ContactCreatePage from './pages/ContactCreatePage.vue'
import ContactEditPage from './pages/ContactEditPage.vue'

const routes: RouteRecordRaw[] = [
	{ path: '/', component: Default, children: [{ path: '', component: MainPage }] },
	{ path: '/contacts/', component: Default, children: [{ path: '', component: ContactListPage }] },
	{ path: '/contacts/create', component: Default, children: [{ path: '', component: ContactCreatePage }] },
	{ path: '/contacts/edit/:id', component: Default, children: [{ path: '', component: ContactEditPage }] },
	{ path: '/contacts/:id', component: Default, children: [{ path: '', component: ContactPage }] },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'is-active',
})

export default router
