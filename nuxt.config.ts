export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    'radix-vue/nuxt',
    '@nuxt/image'
  ],
  runtimeConfig: {
    discordClientId: process.env.DISCORD_CLIENT_ID,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    public: {
      discordGuildId: process.env.DISCORD_GUILD_ID,
      discordRoleId: process.env.DISCORD_ROLE_ID
    }
  }
})