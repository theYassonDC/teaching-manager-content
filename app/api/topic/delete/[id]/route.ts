import { GetServerSidePropsContext } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs";

export async function DELETE(request: Request, context: GetServerSidePropsContext) {
  try {
    const idString: string | any = context.params?.id
    const id = parseInt(idString)
    const topic = await prisma.topics.delete({ where: { id } })
    return NextResponse.json({ message: `¡¡Topic ID: ${topic.id} deleted succesfly!!` })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found topic' }, { status: 404 })
  }
}