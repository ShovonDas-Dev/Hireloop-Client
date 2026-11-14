// lib/auth-client.ts
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { auth } from "./auth"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
   
   plugins: [inferAdditionalFields<typeof auth>({
    
      user: {
        role: {
          type: "string"
        }
      }
  
   })],
})

export const { signIn, signUp, signOut, useSession } = authClient