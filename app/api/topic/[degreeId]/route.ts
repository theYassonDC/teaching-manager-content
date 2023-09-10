import { GetServerSidePropsContext } from "next";
import { prisma } from "@/libs";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: GetServerSidePropsContext) {
  try {
    const idString: string | any = context.params?.degreeId
    const id = parseInt(idString)
    const topic = await prisma.topics.findMany({ where: { degreeId: id }, include: { degree: true }})
    return NextResponse.json({ topic })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found topic' }, { status: 404 })
  }
}