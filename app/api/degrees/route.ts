import { NextResponse } from "next/server";
import { prisma } from "@/libs";
import { IDegree } from './degree'

async function getDegrees(): Promise<any[]> {
  const degrees = await prisma.degree.findMany()
  return degrees
}

export async function GET(request: Request) {
  try {
    const list = await getDegrees()
    return NextResponse.json({ list }, {status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}

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