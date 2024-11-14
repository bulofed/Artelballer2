import { NuxtAuthHandler } from '#auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET as string,
    providers: [
        // @ts-expect-error
        DiscordProvider.default({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: "https://discord.com/oauth2/authorize?scope=guilds.members.read+identify+guilds+email"
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }: any) {
            if (account) {
                token.accessToken = account.access_token;
                token.tokenType = account.token_type;
            }
            if (profile) {
                token.profile = profile;
            }
            return token;
          },
        async session({ session, token, user }: any) {
            if (session) {
                session.accessToken = token.accessToken;
                session.tokenType = token.tokenType;
                session.discordUser = token.profile;
            }
        return session;
        },
    }
})