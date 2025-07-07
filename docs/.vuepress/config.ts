import {defineUserConfig} from 'vuepress'
import {path} from '@vuepress/utils'
import {defaultTheme} from '@vuepress/theme-default'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
	title: 'Linearly',
	base: '/linearly/',
	head: [
		['link', {rel: 'icon', href: './logo.svg'}],
		['link', {rel: 'preconnect', href: 'https://fonts.googleapis.com'}],
		[
			'link',
			{rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
		],
		[
			'link',
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
				crossorigin: 'anonymous',
			},
		],
	],
	theme: defaultTheme({
		navbar: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'API',
				link: '/api/',
			},
		],
		logo: '/logo.svg',
		repo: 'baku89/linearly',
	}),
	locales: {
		'/': {
			lang: 'English',
			title: 'Linearly',
			description:
				'A collection of utility functions that relates to linear algebra and graphics programming',
		},
	},
	bundler: viteBundler({}),
	markdown: {
		//@ts-ignore
		linkify: true,
		typographer: true,
	},
})
