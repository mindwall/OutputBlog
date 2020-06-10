import path from 'path'
import getDynamicPaths from './server/fetchRoutes'
import createSitemap from './server/sitemap'

export default async () => {
  // Create an array of all dynamic pages for nuxt generate
  // tags will be handled differently
  const dynamicRoutes = await getDynamicPaths({
    '': 'posts/*.md',
    '/tag': 'posts/*.md'
  })
  await createSitemap(dynamicRoutes)
  return {
    generate: {
      routes: dynamicRoutes
    },
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/firebase.js'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://axios.nuxtjs.org/usage
      '@nuxtjs/axios',
      // Doc: https://github.com/nuxt-community/dotenv-module
      '@nuxtjs/dotenv',
      // Doc: https://www.npmjs.com/package/vue-social-sharing
      'vue-social-sharing/nuxt'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
      extend(config, ctx) {
        config.node = {
          fs: 'empty'
        }
        config.module.rules.push({
          test: /\.md$/,
          include: path.resolve(__dirname, 'content'),
          loader: 'frontmatter-markdown-loader'
        })
      }
    }
  }
}
