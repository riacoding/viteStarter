import { redirect } from 'react-router-dom'
import { deleteContact } from '../contactsDataLayer'

export async function action({ params }) {
  await deleteContact(params.contactId)
  return redirect('/')
}
