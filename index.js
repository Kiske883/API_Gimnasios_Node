// Server creation and configuration
import http from 'node:http';
import app from './src/app.js';
import pool from './src/config/db.js';
import dotenv from 'dotenv';

// Hemos de tener en cuenta que lo primero que hemos de hacer si o si
// es leer nuestro fichero de configuración .env
// Config .env
dotenv.config();

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on("listening", async () => {
    console.log(`Server listening on port ${PORT}`);

    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos MySQL exitosa!');
        connection.release();
    } catch (error) {
        console.error('Error conectando a la base de datos:', error.message);
    }     
});

server.on("error", (error) => {
    console.log(error);
});