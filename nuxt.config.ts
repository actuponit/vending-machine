// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  compatibilityDate: '2025-01-28',

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://my-cinema-1.onrender.com'
    }
  }
})
