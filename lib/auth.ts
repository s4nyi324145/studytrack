
import { betterAuth } from "better-auth";
import pool from "./db";

export const auth = betterAuth({
   database: pool,
   emailAndPassword: { enabled: true },
   socialProviders: { 
    google: {
        prompt: "select_account",
        clientId: process.env.GOOGLE_CLIENT_ID as string , 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET },
},
});

//TODO:  Mentsem el a leirast és az osszefoglalast a better authrol (auth-client stb) a geminibol