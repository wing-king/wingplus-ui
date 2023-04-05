export default {
	title: "wingplus",
	description: "这是一个UI库",
	base: "/wingplus-ui/website",
	themeConfig: {
		siteTitle: "wingplusUI",
		description: "ddd",
		nav: [
			{ text: "首页", link: "/" },
			{ text: "指南", link: "/guild/" },
			{ text: "组件", link: "/components/button/" }
		],

		socialLinks: [{ icon: "github", link: "https://github.com/qddidi/easyest" }],
		sidebar: {
			"/guild/": [
				{
					text: "基础",
					items: [
						{
							text: "安装",
							link: "/guild/installation/"
						},
						{
							text: "快速开始",
							link: "/guild/quickstart/"
						}
					]
				},
				{
					text: "进阶",
					items: [
						{
							text: "xx",
							link: "/xx"
						}
					]
				}
			],
			"/components/": [
				{
					text: "基础组件",
					items: [
						{
							text: "Button",
							title: "按钮组件",
							link: "/components/button/"
						},
						{
							text: "Icon",
							link: "/components/icon/"
						}
					]
				}
			]
		}
	},
	locales: {
		"/": {
			lang: "zh-CN"
		}
	}
};
