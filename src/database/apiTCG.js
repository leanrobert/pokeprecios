const BASE_URL = 'https://api.pokemontcg.io/v2';

const fetchPokemonSets = async () => {
  const response = await fetch(`${BASE_URL}/sets?orderBy=-releaseDate`,
  {
    headers: {
      'X-Api-Key': process.env.TCG_API_KEY
    }
  })
  return await response.json()
}

const fetchCardsForSet = async (setId) => {
  const response = await fetch(`${BASE_URL}/cards?q=set.id:${setId}`,
  {
    headers: {
      'X-Api-Key': process.env.TCG_API_KEY
    }
  })
  return await response.json()
}

const fetchCardsForSetPage2 = async (setId) => {
  const response = await fetch(`${BASE_URL}/cards?q=set.id:${setId}&page=2`,
  {
    headers: {
      'X-Api-Key': process.env.TCG_API_KEY
    }
  })
  return await response.json()
}

const fetchCardPrices = async (cardId) => {
  const response = await fetch(`${BASE_URL}/cards/${cardId}`,
  {
    headers: {
      'X-Api-Key': process.env.TCG_API_KEY
    }
  })
  return await response.json()
}

module.exports = {
  fetchCardsForSet,
  fetchCardsForSetPage2,
  fetchPokemonSets,
  fetchCardPrices
}