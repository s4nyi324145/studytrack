
import { betterAuth } from "better-auth";
import pool from "./db";

export const auth = betterAuth({
   database: pool,
   emailAndPassword: { enabled: true },
   socialProviders: { 
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string , 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET },
},
});

