import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const data = await prisma.pokemoncard.findMany({
    where: {
      id: params.id
    },
    include: {
      cardprices: true,
      cardset: true,
      cardattacks: true
    },
  })

  return NextResponse.json({ data })
}