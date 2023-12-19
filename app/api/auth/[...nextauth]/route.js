import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user.js"
import NextAuth from "next-auth/next";
import DiscordProvider from 'next-auth/providers/discord'

const authOptions = {
    providers: [
        DiscordProvider({
            callbackUrl: 'https://discord.com/api/oauth2/authorize?client_id=1164601849937137735&response_type=code&redirect_uri=https%3A%2F%2Fservet-test.vercel.app%2Fapi%2Fdiscord%2Fcallback&scope=identify+email',
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    callbacks: { //Получаем информацию о пользователе
        async signIn({user, account}) {
            console.log("User", user.id)
            console.log('Acc', account.provider)
            if (account.provider === 'discord') {
                const {id, name, email} = user;
                const balance = 300
                try{
                    await connectMongoDB();

                    const userExists = await User.findOne({name})
                    if (!userExists){
                        const res = await fetch('/api/user', {
                        method: "POST",
                        headers: {"Content-type": "application/json",},
                        body: JSON.stringify({id, name, email, balance})
                    })
                    if (res.ok) {
                        return user;
                    }
                    }
                    
                } catch (error){
                    console.log(error)
                }
            }
            return user;
        }
    }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}