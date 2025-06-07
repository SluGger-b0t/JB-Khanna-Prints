import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '6oyttiv3',
  dataset: 'jb_prints',
  apiVersion: '2025-06-02', // Use 'latest' instead of a date string
  useCdn: true,
})
