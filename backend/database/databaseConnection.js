import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, { dbName: process.env.DB_NAME })
        console.log(`database connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`Database connection failed ${error.message} `)
    }
}
export { dbConnection }