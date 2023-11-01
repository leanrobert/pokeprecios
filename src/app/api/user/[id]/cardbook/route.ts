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

  const books = await prisma.cardbook.findMany({
    where: {
      userId: id
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (user?.ispremium === false && books.length >= 5) {
    return NextResponse.json({ error: "Ya tienes 5 carpetas" }, { status: 400 })
  }

  if (user?.ispremium && books.length >= 50) {
    return NextResponse.json({ error: "Ya tienes 50 carpetas" }, { status: 400 })
  }

  const data = await prisma.cardbook.create({
    data: {
      name,
      user: {
        connect: {
          id
        }
      },
    }
  })

  return NextResponse.json({ data })
}