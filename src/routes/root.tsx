/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom'
import { getContacts, createContact } from '@/contactsDataLayer'
import { ContactListQuery } from '@/types'

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { contacts, q }
}

export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts, q } = useLoaderData() as ContactListQuery
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const inputElement = document.getElementById('q') as HTMLInputElement
    if (inputElement) {
      inputElement.value = q // Assign the value here
    }
  }, [q])

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
              className={searching ? 'loading' : ''}
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div id='search-spinner' aria-hidden hidden={!searching} />
            <div className='sr-only' aria-live='polite'></div>
          </Form>
          <Form method='post'>
            <Button type='submit'>New</Button>
          </Form>
        </div>
        <nav>
          {Array.isArray(contacts) && contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div className={navigation.state === 'loading' ? 'loading' : ''} id='detail'>
        <Outlet />
      </div>
    </>
  )
}
