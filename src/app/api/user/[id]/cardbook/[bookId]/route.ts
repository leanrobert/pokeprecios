import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { bookId: string }}) {
  const { bookId } = params

  const data = await prisma.cardbook.findUnique({
    where: {
      id: bookId
    },
    include: {
      user: true,
      cardQuantity: {
        include: {
          pokemoncard: {
            include: {
              cardset: true
            }
          }
        }
      },
    }
  })

  return NextResponse.json({ data })
}

export async function PUT(req: Request, { params }: { params: { bookId: string }}) {
  const { bookId } = params
  const { pokemonCards } = await req.json()

  try {
    await prisma.cardquantity.deleteMany({
      where: {
        cardbookId: bookId
      }
    })

    const updatedCardBook = await prisma.cardbook.update({
      where: {
        id: bookId
      },
      data: {
        cardQuantity: {
          create: pokemonCards.map((card: { id: string, quantity: number }) => ({
            quantity: card.quantity,
            pokemoncard: {
              connect: {
                id: card.id
              }
            },
          }))
        }
      },
      include: {
        cardQuantity: {
          include: {
            pokemoncard: {
              include: {
                cardset: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ updatedCardBook })
  } catch (error) {
    console.log(error);

    return NextResponse.error()
  }
}

export async function DELETE(req: Request, { params }: { params: { bookId: string }}) {
  const { bookId } = params

  try {
    const deletedCardBook = await prisma.cardbook.delete({
      where: {
        id: bookId
      }
    })

    return NextResponse.json({ deletedCardBook })
  } catch (error) {
    console.log(error);

    return NextResponse.error()
  }

}