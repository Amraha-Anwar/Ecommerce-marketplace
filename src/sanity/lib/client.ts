import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "u36foj41",
  dataset: "production",
  apiVersion: "2024-12-28",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  
})
