import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Connect DB ok 👋')
} catch (error) {
    console.log('Error de conexión a MongoDB:' + error)
}