/* eslint-disable react-refresh/only-export-components */
import { Form, useLoaderData, useFetcher } from 'react-router-dom'
import { Contact as Person } from '@/types'
import { getContact, updateFavorite } from '../contactsDataLayer'

export async function loader({ params }) {
  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Contact Not Found',
    })
  }
  return { contact }
}

export async function action({ request, params }) {
  const formData = await request.formData()
  return updateFavorite(params.contactId, formData.get('favorite') === 'true')
}

export default function Contact() {
  const { contact } = useLoaderData() as { contact: Person }

  if (!contact) return <div className='font-bold'>No Contact Found</div>
  return (
    <div id='contact'>
      <div>
        <img key={contact.avatar} src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target='_blank' href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>
          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

type FavoriteProps = {
  contact: Person
}

function Favorite({ contact }: FavoriteProps) {
  const fetcher = useFetcher()
  const favorite = fetcher.formData ? fetcher.formData.get('favorite') === 'true' : contact.favorite
  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
