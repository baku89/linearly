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
		logo: '/logo.svg',
		repo: 'baku89/linearly',
		locales: {
			'/': {
				selectLanguageName: 'English',
				navbar: [
					{text: 'Home', link: '/'},
					{text: 'Guide', link: '/guide'},
					{text: 'API', link: '/api/'},
				],
			},
			'/ja/': {
				selectLanguageName: '日本語',
				navbar: [
					{text: 'ホーム', link: '/ja/'},
					{text: 'ガイド', link: '/ja/guide'},
					{text: 'API', link: '/api/'},
				],
			},
		},
	}),
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Linearly',
			description:
				'A collection of utility functions related to linear algebra and graphics programming',
		},
		'/ja/': {
			lang: 'ja-JP',
			title: 'Linearly',
			description: 'グラフィックスプログラミングのための線形代数関数ライブラリ',
		},
	},
	bundler: viteBundler({}),
	markdown: {
		//@ts-ignore
		linkify: true,
		typographer: true,
	},
})
