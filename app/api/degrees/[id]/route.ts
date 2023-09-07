import { GetServerSidePropsContext } from "next";
import { prisma } from "@/libs";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: GetServerSidePropsContext) {
  try {
    const idString: string | any = context.params?.id
    const id = parseInt(idString)
    const degree = await prisma.degree.findFirst({ where: { id } })
    return NextResponse.json({ degree })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found degree' }, { status: 404 })
  }
}