import { getRandomNumber, parseBoolean, capitalizeFirstLetter } from '@/lib/utils'
import { Contact as Person } from '@/types'

let contacts = [
  {
    id: 1,
    first: 'Bob',
    last: 'Jones',
    avatar: 'https://robohash.org/1.png?size=200x200',
    twitter: '@bobbyjones',
    notes: 'Some notes',
    favorite: true,
  },
  {
    id: 2,
    first: 'Tina',
    last: 'Fey',
    avatar: 'https://robohash.org/2.png?size=200x200',
    twitter: '@tinafey',
    notes: 'Some notes',
    favorite: true,
  },
]

export async function getContacts() {
  return contacts
}

/**
 * @param {Contact} contact
 * @returns {void}
 */
export async function createContact() {
  const newContact = {
    id: getRandomNumber(),
    first: '',
    last: '',
    avatar: 'https://robohash.org/you.png?size=200x200',
    twitter: '',
    notes: '',
    favorite: false,
  }

  contacts.push(newContact)
  console.log('contacts', JSON.stringify(contacts, null, 2))
  return newContact
}

/**
 * @param {Contact} contact
 * @returns {void}
 */
export async function updateContact(contactId: number, contact: Person) {
  console.log('update contact', contactId, contact)
  const updateIndex = contacts.findIndex((c) => c.id === contactId)
  console.log('index', updateIndex)
  if (updateIndex !== -1) {
    contacts[updateIndex] = {
      ...contact,
      id: contactId,
      first: capitalizeFirstLetter(contact.first),
      last: capitalizeFirstLetter(contact.last),
      favorite: parseBoolean(contact.favorite),
    }
  }
  return contact
}

export async function updateFavorite(contactId: number, favorite: boolean) {
  console.log('updateFavorite', contactId)
  const updateIndex = contacts.findIndex((c) => c.id === contactId)
  console.log('update fave index', updateIndex)
  if (updateIndex !== -1) {
    contacts[updateIndex] = {
      ...contacts[updateIndex],
      favorite: favorite,
    }
  }
  return contactId
}

/**
 * @param {id} number
 * @returns {Contact}
 */
export async function getContact(id: number) {
  const result = contacts.find((contact) => contact.id === id)
  if (result) {
    return result
  }
  return null
}

/**
 * @param {id} number
 * @returns {void}
 */
export async function deleteContact(id: number) {
  console.log('deleting contact', id)
  contacts = contacts.filter((contact) => contact.id !== id)
  console.log('contacts after delete', contacts)
}

/**
 * @typedef {{ id: number; first: string; last: string; avatar: string, twitter:string, notes:string, favorite:boolean; }} Contact
 */
