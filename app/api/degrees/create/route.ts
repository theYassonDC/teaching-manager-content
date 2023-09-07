import { prisma } from '@/libs'
import { IDegree } from './degree'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { matter, degree, teacherId }: IDegree = body
    await prisma.degree.create({
      data: {
        matter,
        degree,
        teacherId
      }
    })

    return NextResponse.json({ message: '¡Created degree succesfly!'}, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error in parameters'}, { status: 404 })
  }
}