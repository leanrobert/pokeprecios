import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = !Number(searchParams.get('page')) ? 1 : Number(searchParams.get('page'))
  const skip = (page - 1) * 10

  const data = await prisma.cardset.findMany({
    take: 10,
    skip: skip,
    orderBy: {
      releasedate: 'desc'
    }
  })

  return NextResponse.json({ data })
}