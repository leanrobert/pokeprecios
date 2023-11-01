import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get('search') ?? ''
  const take = 10
  const page = !Number(searchParams.get('page')) ? 1 : Number(searchParams.get('page'))
  const skip = (page - 1) * take

  const data = await prisma.pokemoncard.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: {
      cardprices: true,
      cardset: true
    },
    take: take,
    skip: skip,
    orderBy: [
      {
        cardset: {
          releasedate: 'desc'
        }
      },
      {
        number: 'asc'
      }
    ]
  })

  const amount = await prisma.pokemoncard.count({
    where: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    }
  })

  return NextResponse.json({ data, amount })
}
