import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string }}) {
  const { id } = params
  const { ispremium } = await req.json()

  const data = await prisma.user.update({
    where: {
      id
    },
    data: {
      ispremium: ispremium || false
    }
  })

  return NextResponse.json({ data })
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {
  const { id } = params

  const data = await prisma.user.delete({
    where: {
      id
    }
  })

  return NextResponse.json({ data })
}