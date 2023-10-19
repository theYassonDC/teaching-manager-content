import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'
import { prisma } from "@/libs";
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const degrees = await prisma.degree.findMany()
    return NextResponse.json({ degrees }, {status: 200})
  } catch (error) {
    console.log(error)
    NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}