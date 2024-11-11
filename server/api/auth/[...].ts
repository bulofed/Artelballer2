import { NuxtAuthHandler } from '#auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET as string,
    providers: [
        // @ts-expect-error
        DiscordProvider.default({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
            
        })
    ],
})