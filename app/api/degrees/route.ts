// import { NextResponse } from "next/server";
import { prisma } from "@/libs";
import { GetServerSidePropsContext } from "next";

export async function GET(request: Request, context: GetServerSidePropsContext) {
  try {
    const degrees = await prisma.degree.findMany()
    return Response.json({ degrees }, {status: 200})
  } catch (error) {
    console.log(error)
    Response.json({ error: 'Not found' }, {status: 404})
  }
}