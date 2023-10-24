import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/libs'
import bycryptjs from 'bcryptjs';

declare module 'next-auth' {
  interface User {
    id: number; // <- here it is
  }
}

const handle = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mail: { label: "Mail", type: "text", placeholder: "Write email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const userFound = await prisma.user.findUnique({ where: { mail: credentials!.mail } })
        if (!userFound) throw new Error('Invalid credentials')
        const passwordSuccess = await bycryptjs.compare(credentials!.password, userFound.password)

        if (!passwordSuccess) throw new Error('Invalid password')
        const user = {
          id: userFound.id,
          username: userFound.nickname,
          mail: userFound.mail,
          avatar: userFound.avatar
        }
        return user
      }
    })
  ],
  // pages: {
  //   signIn: '/login'
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if(user) token.user = user
      return token
    },
    session({ account, token, user, profile, session }: any) {
      return token
    }
  }
})

export { handle as GET, handle as POST }