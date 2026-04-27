// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  base: "/blog",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "d38rfkes",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
    useCdn: true,
    apiVersion: "2024-01-01",
  })]
});