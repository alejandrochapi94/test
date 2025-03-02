//Sistema de módulos ES6
import "dotenv/config";
import app from "./app.js";
//debemos usar dotenv para acceder a las variables de entorno
const PORT = process.env.PORT || 3000; //variable de entorno definida

const server = app.listen(PORT, () => {
    console.log(`Entorno actual: ${process.env.NODE_ENV}`);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default server; //para test