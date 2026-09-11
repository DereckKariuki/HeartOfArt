import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Netlify sets NETLIFY=true in its build environment. Only a build that
    // came from there can post to Netlify Forms, so the flag is baked in at
    // build time; every other build falls back to the visitor's mail app.
    // See src/lib/enquiry.js.
    __NETLIFY_FORMS__: JSON.stringify(process.env.NETLIFY === 'true'),
  },
})
