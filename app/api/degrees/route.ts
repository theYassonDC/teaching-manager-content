import { NextResponse } from "next/server";
import { prisma } from "@/libs";

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

export async function PUT(request: Request) {}