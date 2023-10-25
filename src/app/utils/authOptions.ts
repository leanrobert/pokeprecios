import prisma from '@/database/client'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_APP_SECRET as string,
		})
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await prisma.user.findUnique({
				where: {
					email: session.user?.email as string
				}
			})

			session.user.id = sessionUser?.id
			session.user.ispremium = sessionUser?.ispremium

			return session
		},
		async signIn({ profile }) {
			try {
				const userExists = await prisma.user.findUnique({
					where: {
						email: profile?.email
					}
				})

				if (!userExists) {
					await prisma.user.create({
						data: {
							name: profile?.name || 'Usuario',
							email: profile?.email || '',
							ispremium: false,
						}
					})
				}

				return true
			} catch (e) {
				console.error(e);
				return false
			}
		}
	},
	pages: {
		signIn: '/signin'
	},
}