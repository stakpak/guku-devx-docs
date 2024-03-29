// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Develop faster. Deploy Right.',
    // tagline: 'Make ALL your configurations portable and easy to use.',
    // tagline: 'A single meta-configuration tool to generate, share, and validate ALL your workflows and configurations.',
    tagline: 'A single configuration tool to generate, share, and validate ALL your workflows and infrastructure code.',
    url: 'https://devx.stakpak.dev',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'stakpak', // Usually your GitHub org/user name.
    projectName: 'devx', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                // blog: {
                //     showReadingTime: true,
                //     routeBasePath: "/tutorials",
                //     path: "./tutorials",
                //     // Please change this to your repo.
                //     // Remove this to remove the "edit this page" links.
                //     // editUrl:
                //     //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                // },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                gtag: {
                    trackingID: 'G-25VHT9FGDN',
                    anonymizeIP: false,
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            announcementBar: {
                id: 'taskfile-1',
                content:
                    'DevX now supports <a target="_blank" href="https://taskfile.dev">Taskfiles</a> to run and share your workflows, <a href="/docs/workflows-taskfile">check the docs</a>.',
                backgroundColor: 'var(--ifm-color-primary)',
                textColor: 'var(--cta-color)',
                isCloseable: true,
            },
            navbar: {
                title: '{ DevX }',
                // logo: {
                //     alt: 'My Site Logo',
                //     src: 'img/logo.svg',
                // },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Docs',
                    },
                    {
                        to: 'tutorials',
                        position: 'left',
                        label: 'Tutorials',
                    },
                    // {
                    //     to: 'catalog',
                    //     position: 'left',
                    //     label: 'Catalog',
                    // },
                    {
                        href: 'https://github.com/stakpak/devx',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                // style: 'dark',
                links: [
                    // {
                    //     title: 'Docs',
                    //     items: [
                    //         {
                    //             label: 'Docs',
                    //             to: '/docs/intro',
                    //         },
                    //     ],
                    // },
                    // {
                    //     title: 'Community',
                    //     items: [
                    //         {
                    //             label: 'Slack',
                    //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                    //         },
                    //         {
                    //             label: 'Discord',
                    //             href: 'https://discordapp.com/invite/docusaurus',
                    //         },
                    //         {
                    //             label: 'Twitter',
                    //             href: 'https://twitter.com/docusaurus',
                    //         },
                    //     ],
                    // },
                    // {
                    //     title: 'More',
                    //     items: [
                    //         // {
                    //         //     label: 'Blog',
                    //         //     to: '/blog',
                    //         // },
                    //         {
                    //             label: 'GitHub',
                    //             href: 'https://github.com/stakpak/devx',
                    //         },
                    //     ],
                    // },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Stakpak Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['hcl', 'yaml', 'cue'],
            },
            zoom: {
                selector: '.markdown :not(em) > img',
                config: {
                    // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
                    background: {
                        light: 'rgb(255, 255, 255)',
                        dark: 'rgb(50, 50, 50)'
                    }
                }
            }
        }),

    plugins: [
        [
            '@docusaurus/plugin-content-blog',
            {
                id: 'tutorials',
                routeBasePath: 'tutorials',
                path: './tutorials',
            },
        ],
        async function myPlugin(context, options) {
            return {
                name: "docusaurus-tailwindcss",
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer.
                    postcssOptions.plugins.push(require("tailwindcss"));
                    postcssOptions.plugins.push(require("autoprefixer"));
                    return postcssOptions;
                },
            };
        },
        require.resolve("docusaurus-plugin-image-zoom"),
    ],
};

module.exports = config;
