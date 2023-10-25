const { PrismaClient } = require("@prisma/client")
const { fetchCardsForSet, fetchCardsForSetPage2, fetchPokemonSets } = require("./apiTCG.js")

const prisma = new PrismaClient()

const seedCardSets = async () => {
  const { data: sets } = await fetchPokemonSets()

  for (const set of sets) {
		try {
			await prisma.cardset.create({
				data: {
					id: set.id,
					name: set.name,
					series: set.series,
					printedtotal: set.printedTotal,
					total: set.total,
					releasedate: new Date(set.releaseDate),
					updatedat: new Date(set.updatedAt),
					images_symbol: set.images.symbol,
					images_logo: set.images.logo,
				}
			})
		} catch (e) {
			console.log(e.message, 'Already exists')
		}
	}
}

const seedPokemonCards = async () => {
  const { data: sets } = await fetchPokemonSets()

  for (const set of sets) {
    const { data: cards } = await fetchCardsForSet(set.id)

    for (const card of cards) {
			try {
				await prisma.pokemoncard.create({
					data: {
						id: card.id,
						name: card.name,
						supertype: card.supertype,
						subtypes: card.subtypes?.join(', '),
						rules: card.rules?.join(', '),
						set_id: card.set.id,
						number: Number(card.number),
						images_small: card.images.small,
						level: Number(card.level),
						hp: Number(card.hp),
						types: card.types?.join(', '),
						nationalpokedexnumbers: Number(card.nationalPokedexNumbers?.shift()),
					},
				})


      card.attacks?.forEach(async (attack) => {
        await prisma.cardattacks.create({
          data: {
            attacks_name: attack.name,
						attacks_cost: attack.cost.join(', '),
						attacks_convertedenergycost: attack.convertedEnergyCost,
						attacks_damage: attack.damage,
						attacks_text: attack.text,
						pokemoncard_id: card.id,
          }
        })
      })

      card.abilities?.forEach(async (ability) => {
        await prisma.cardattacks.create({
          data: {
						abilities_name: ability.name,
						abilities_text: ability.text,
						abilities_type: ability.type,
						pokemoncard_id: card.id,
					}
        })
      })

			} catch (e) {
				console.log(e.message, 'Already exists')
			}
    }
  }
}

const seedPokemonCardsPage2 = async () => {
  const sets = ['sm11', 'sm12', 'swsh8', 'sv1', 'sv2']

  sets.map(async (set) => {
    const { data: cards } = await fetchCardsForSetPage2(set)

    for (const card of cards) {
			try {
				await prisma.pokemoncard.create({
					data: {
						id: card.id,
						name: card.name,
						supertype: card.supertype,
						subtypes: card.subtypes?.join(', '),
						rules: card.rules?.join(', '),
						set_id: set,
						number: Number(card.number),
						images_small: card.images.small,
						level: Number(card.level),
						hp: Number(card.hp),
						types: card.types?.join(', '),
						nationalpokedexnumbers: Number(card.nationalPokedexNumbers?.shift()),
					},
				})

				card.attacks?.forEach(async (attack) => {
					await prisma.cardattacks.create({
						data: {
							attacks_name: attack.name,
							attacks_cost: attack.cost.join(', '),
							attacks_convertedenergycost: attack.convertedEnergyCost,
							attacks_damage: attack.damage,
							attacks_text: attack.text,
							pokemoncard_id: card.id,
						}
					})
				})

				card.abilities?.forEach(async (ability) => {
					await prisma.cardattacks.create({
						data: {
							abilities_name: ability.name,
							abilities_text: ability.text,
							abilities_type: ability.type,
							pokemoncard_id: card.id,
						}
					})
				})
			} catch (e) {
				console.log(e.message, 'Already exists')
			}
    }
  })
}

async function main() {
  await seedCardSets()
  await seedPokemonCards()
  await seedPokemonCardsPage2()
}

main()
  .then(async () => {
    console.log('DB Populated correctly!')
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })