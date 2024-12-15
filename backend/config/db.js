import mongoose from "mongoose";

const connectDB = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {} );

        const url = `${conn.connection.host}:${conn.connection.port}`;
        console.log(`La conexión hacia mongo ha sido exitosa!: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;