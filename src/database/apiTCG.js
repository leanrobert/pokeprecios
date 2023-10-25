const BASE_URL = 'https://api.pokemontcg.io/v2';

const fetchPokemonSets = async () => {
  const response = await fetch(`${BASE_URL}/sets?orderBy=-releaseDate`)
  return await response.json()
}

const fetchCardsForSet = async (setId) => {
  const response = await fetch(`${BASE_URL}/cards?q=set.id:${setId}`)
  return await response.json()
}

const fetchCardsForSetPage2 = async (setId) => {
  const response = await fetch(`${BASE_URL}/cards?q=set.id:${setId}&page=2`)
  return await response.json()
}

module.exports = {
  fetchCardsForSet,
  fetchCardsForSetPage2,
  fetchPokemonSets
}