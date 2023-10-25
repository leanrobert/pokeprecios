import { CardBookProvider } from '@/app/providers/cardBookProvider'
import { authOptions } from '@/app/utils/authOptions'
import CardBookHeader from '@/components/CardBookHeader'
import MyCardBook from '@/components/MyCardBook'
import { CardBook } from '@/utils/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const getCardBook = async (id: string, bookId: string) => {
  try {
    const res = await fetch(`http://localhost:3002/api/user/${id}/cardbook/${bookId}`)

    if (res.ok) {
      const data = await res.json()
      return data
    } else {
			return []
		}
  } catch (e) {
    console.error(e)
  }
}

export default async function BookDetial({ params }: { params: { bookId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  const { data: cardbook }: { data: CardBook} = await getCardBook(session.user.id, params.bookId)

  return (
    <CardBookProvider>
      <div className='flex flex-col h-screen max-w-screen-xl p-4'>
        <CardBookHeader cardbook={cardbook} />
        <div className='flex-1 flex gap-4 overflow-hidden'>
          <MyCardBook userId={cardbook.userId} bookId={cardbook.id} />
        </div>
      </div>
    </CardBookProvider>
  )
}