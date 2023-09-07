import { GetServerSidePropsContext } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs";

export async function DELETE(request: Request, context: GetServerSidePropsContext) {
  try {
    const idString: string | any = context.params?.id
    const id = parseInt(idString)
    const degree = await prisma.degree.delete({ where: { id } })
    return NextResponse.json({ message: `¡¡Degree ID: ${degree.id} deleted succesfly!!` })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found degree' }, { status: 404 })
  }
}