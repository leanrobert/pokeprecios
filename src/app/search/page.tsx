
import CardsGrid from "@/components/CardsGrid";
import PaginationControl from "@/components/PaginationControl";
import SearchInput from "@/components/SearchInput";

const fetchCards = async (search: string | null, page: string) => {
	const url = 'http://oltmanager.westnet.com.ar:3002/api/cards'

  try {
    const res = await fetch(`${url}?search=${search ?? ''}&page=${page ?? null}`, { cache: 'no-cache' })

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

export default async function Search({ searchParams } : { searchParams?: { search?: string, page: string }}) {
	const search = searchParams?.search ?? null
	const page = searchParams?.page ?? '1'

	const { data: cards, amount } = await fetchCards(search, page)

	return (
		<div className='flex flex-col items-center h-screen'>
			<SearchInput />

			<CardsGrid cards={cards} />

			<PaginationControl page={page} search={search ?? ''} amount={amount} />
		</div>
	)
}