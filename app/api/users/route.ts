import { prisma } from '@/libs'
import { NextResponse } from "next/server";
import { IUserWeb } from './user';
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nickname, mail, password, avatar }: IUserWeb = body
    const salt = bcrypt.genSaltSync(10)
    const passwordHashed = bcrypt.hashSync(password, salt)
    await prisma.user.create({
      data: {
        nickname,
        mail,
        password: passwordHashed,
        avatar
      }
    })
    return NextResponse.json({ message: 'User register successfly!'}, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error in parameters'}, { status: 404 })
  }
}