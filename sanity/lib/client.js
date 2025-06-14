import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '6oyttiv3',
  dataset: 'jb_prints',
  apiVersion: '2024-03-19', // Using current date
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Add token if you have one
  ignoreBrowserTokenWarning: true, // Add this to prevent token warnings
})
