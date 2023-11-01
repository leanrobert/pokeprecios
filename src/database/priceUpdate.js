const { PrismaClient } = require("@prisma/client");
const { fetchPokemonSets, fetchCardsForSet, fetchCardsForSetPage2 } = require("./apiTCG");

const prisma = new PrismaClient();

const updatePrices = async () => {
  const data = await fetch('https://api.bluelytics.com.ar/v2/latest')
  const dolar = await data.json()
  const blue = dolar.blue.value_avg

  const sets = await fetchPokemonSets();

  for (const set of sets.data) {
    const cards = await fetchCardsForSet(set.id);
    const cardsPage2 = await fetchCardsForSetPage2(set.id);
    const allCards = [...cards.data, ...cardsPage2.data];

    for (const card of allCards) {
      if (!card.tcgplayer) {
        continue;
      }

      for (const cardRarity in card.tcgplayer.prices) {
        try {
          //if exists update, otherwise create
          const price = await prisma.prices.findFirst({
            where: {
              pokemoncard_id: card.id,
              rarity: cardRarity
            }
          })

          if (price) {
            await prisma.prices.update({
              where: {
                id: price.id
              },
              data: {
                price: card.tcgplayer.prices[cardRarity].market * blue
              }
            })
            console.log(`Updated ${cardRarity} price for ${card.name}`)
          } else {
            await prisma.prices.create({
              data: {
                pokemoncard_id: card.id,
                price: card.tcgplayer.prices[cardRarity].market * blue,
                rarity: cardRarity
              }
            })
          }
          console.log(`Added ${cardRarity} price for ${card.name}`)
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

updatePrices()