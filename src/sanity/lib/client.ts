import { createClient } from 'next-sanity'


export const client = createClient({
  projectId: "u36foj41",
  dataset: "production",
  apiVersion: "2023-08-01",
  useCdn: true,
  token: "sk0kjcmBWOjoYklMK4WShPikbECAQiKpooBZ56x3C1sAcx2HKvERjDTiD9AIlX5LqrN1sYuCcecjHwCbC6qvwXrTlPKF5J44UURaKXgQYJIfpWPbwtNUqJBz9eW88cPgMtOyKEQjFUyJQ2wpk3W97fTFM4ulEfwUl0POO7IhnzZb2SWZgpI4",
})
