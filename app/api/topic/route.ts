import { prisma } from "@/libs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const topics = await prisma.topics.findMany()
    return NextResponse.json({ topics }, {status: 200})
  } catch (e) {
    console.log(e)
    NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}