import prisma from "@/database/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const data = await prisma.cardset.findMany({
    where: {
      id: params.id
    }
  })

  return NextResponse.json({ data })
}