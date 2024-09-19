import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import { Contact as Person } from '@/types'
import { updateContact } from '../contactsDataLayer'

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateContact(params.contactId, updates as Person)
  return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  const { contact } = useLoaderData() as { contact: Person }
  const navigate = useNavigate()

  return (
    <Form method='post' id='contact-form'>
      <p>
        <span>Name</span>
        <input placeholder='First' aria-label='First name' type='text' name='first' defaultValue={contact?.first} />
        <input placeholder='Last' aria-label='Last name' type='text' name='last' defaultValue={contact?.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type='text' name='twitter' placeholder='@jack' defaultValue={contact?.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder='https://example.com/avatar.jpg'
          aria-label='Avatar URL'
          type='text'
          name='avatar'
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name='notes' placeholder='some notes' defaultValue={contact?.notes} rows={6} />
      </label>
      <input type='hidden' name='favorite' value={contact?.favorite.toString()} />
      <p>
        <button type='submit'>Save</button>
        <button onClick={() => navigate(-1)} type='button'>
          Cancel
        </button>
      </p>
    </Form>
  )
}
