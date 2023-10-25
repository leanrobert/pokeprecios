import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const { id } = params

  const data = await prisma.cardbook.findMany({
    where: {
      userId: id
    },
    include: {
      cardQuantity: {
        include: {
          pokemoncard: true
        }
      }
    }
  })

  return NextResponse.json({ data })
}

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const { id } = params
  const { name } = await req.json()

  const data = await prisma.cardbook.create({
    data: {
      name,
      user: {
        connect: {
          id
        }
      }
    }
  })

  return NextResponse.json({ data })
}