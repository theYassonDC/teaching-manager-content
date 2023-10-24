import { prisma } from "@/libs";
import { ITopics } from "./topic";
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

export async function POST(request: Request) {
  const body = await request.json()
  const { title, content, degreeId }: ITopics = body
  try {
    await prisma.topics.create({
      data: {
        title,
        content,
        degreeId
      }
    })
    return NextResponse.json({ message: 'Created topic!' }, { status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: 'Invalid credentials'}, {status: 404})
  }
}