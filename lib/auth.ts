
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-p9w7mcs-shard-00-00.v3ivgdl.mongodb.net:27017,ac-p9w7mcs-shard-00-01.v3ivgdl.mongodb.net:27017,ac-p9w7mcs-shard-00-02.v3ivgdl.mongodb.net:27017/?ssl=true&replicaSet=atlas-sptajs-shard-0&authSource=admin`
)

const db = client.db("hireloop")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "seeker",
        input: true,
      },
    },
  },

  baseURL: process.env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
