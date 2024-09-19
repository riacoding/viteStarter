import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'
import { Contact } from '@/types'

export async function updateFavorite(contactId: number, favorite: boolean) {
  const contact = await getContact(contactId)
  contact.favorite = favorite
  return await updateContact(contactId, contact)
}

export async function getContacts(query?: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`)

  // Specify that the return type is either an array of contacts or null
  let contacts = await localforage.getItem<Contact[]>('contacts')

  // Handle the case where contacts are null
  if (!contacts) contacts = []

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }

  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  await fakeNetwork()
  const id = Math.random().toString(36).substring(2, 9)
  const contact = {
    id,
    first: '',
    last: '',
    twitter: '',
    avatar: '',
    notes: '',
    favorite: false,
    createdAt: Date.now(),
  }
  const contacts = await getContacts()
  contacts.unshift(contact)
  console.log('contact create', contacts)
  await set(contacts)
  return contact
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`)
  const contacts = await localforage.getItem<Contact[]>('contacts')
  if (contacts.length > 0) {
    const contact = contacts.find((contact) => contact.id === id)
    return contact
  }
  return null
}

export async function updateContact(id, updates) {
  console.log('updating contact', id, updates)
  await fakeNetwork()
  const contacts = await localforage.getItem<Contact[]>('contacts')
  const contact = contacts.find((contact) => contact.id === id)
  if (!contact) throw new Error(`No contact found for ${id}`)
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export async function deleteContact(id) {
  const contacts = await localforage.getItem<Contact[]>('contacts')
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index > -1) {
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

function set(contacts) {
  return localforage.setItem('contacts', contacts)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800)
  })
}
