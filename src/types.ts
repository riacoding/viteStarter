export type Contact = {
  id: string
  first: string
  last: string
  avatar: string
  twitter: string
  notes: string
  favorite: boolean
  createdAt: number
}

export type GetContactParams = {
  contactId: string
}

export type ContactList = Contact[] | unknown

export type ContactListQuery = {
  contacts: Contact[] | unknown
  q: string | null
}
