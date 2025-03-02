//Sistema de módulos ES6
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoutes from "./routes/usersRoutes.js";
import ticketRoutes from "./routes/ticketsRoutes.js";
const app = express();

const DB_URL = (process.env.NODE_ENV === "dev"
? 'mongodb://localhost:27017/003_apirest_test'
: process.env.DB_URL || "mongodb://localhost:27017/003_apirest");


mongoose.connect(DB_URL)
.then(() => {
    console.log(`Conectado a la base de datos: ${DB_URL}`);
})
.catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
})

//middlewares

app.use(morgan("dev")); //middlewares para ver las solicitudes
app.use(express.json()); //middlewares para interpretar json

app.get("/", (req, res) => {
    res.send("¡Hola, Node.js!");
});
app.get("/inicio", (req, res) => {
    //podemos enviar un código de estado
    res.status(200).send("¡Hola, Node.js, estamos en la ruta de inicio!");
    //403 prohibido el paso
    //404 no encontrado
    //500 error interno
});

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

export default app;