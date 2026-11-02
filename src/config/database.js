import mongoose from "mongoose"

export const startDB = async () => {
    try {
        
        console.log("Conectado a la base de datos correctamente!")
    } catch (error) {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/integrador-3");
        console.log("No se pudo establecer la conexión con la base de datos.", error);
    }
};