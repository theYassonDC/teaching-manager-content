import { prisma } from "@/libs";
import { GetServerSidePropsContext } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: GetServerSidePropsContext) {
  try {
    const search: string | any = context.params?.search
    const getDegree: object | null = await prisma.degree.findUnique({
      where: {
        id: Number(search)
      }
    })
    if(!getDegree) return NextResponse.json({ error: 'Not found degree' })
    return NextResponse.json(getDegree)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found' })
  }
}