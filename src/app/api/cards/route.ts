import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get('search') ?? ''
  const page = !Number(searchParams.get('page')) ? 1 : Number(searchParams.get('page'))
  const skip = (page - 1) * 10

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
    take: 10,
    skip: skip,
    orderBy: {
      cardset: {
        releasedate: 'desc'
      }
    }
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
