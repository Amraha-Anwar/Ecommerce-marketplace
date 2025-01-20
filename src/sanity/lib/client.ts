import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "u36foj41",
  dataset: "production",
  apiVersion: "2024-12-28",
  token:"sk5XBJgDC3kYmqPnvFOITYZt29RScv3CzInc7YFs6NT6C5DZOxOIdDj6i4bYeZYbiZs934v7HquanWAyTIUCz7gD4vV0iqEH2rGbdaZ7jwuyFpBL1Exz5AYzJFjO75hzh5XyVXtvQHwh89Hbe5h00SV70kw3Eno55k8Qi28OvqRiqeNV60KK",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  
})
