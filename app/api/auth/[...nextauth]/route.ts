import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const prismaClient = new PrismaClient()

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log(user, account, profile)
            
            if (!user.email) {
                return false
            }

            try {
                const existingUser = await prismaClient.user.findUnique({
                    where: { email: user.email },
                })

                if (!existingUser) {
                    await prismaClient.user.create({
                        data: {
                            email: user.email,
                            provider: "Goggle", // Note: Your schema has "Goggle" enum value
                        },
                    })
                }
            } catch (error) {
                console.error("Error creating user:", error)
                return false
            }

            return true
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }