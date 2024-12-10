//  npm install express -E
// en caso de error, prefijar con 'sudo'

import express from 'express';
// npm i --save-dev @types/express

//  Creamos la aplicación a través del paquete express
//  y llamamos a su constructor
const app = express();

//  Configurar rutas para el acceso personal
import personalRutas from './routes/personalRutas';

//  Todo lo que regresa al usuario es tipo JSON
app.use(express.json());
//  Puerto para escuchar la petición del frontend
const PUERTO = 3001;
//  Activar la ruta base
app.use('/api/personal', personalRutas);

//  Ruta
//  guión bajo ignora el parámetro, para que no sea obligatorio
// app.get('/hola',(_req,res) =>{ //  request,response
//     let fecha = new Date().toLocaleDateString();
//     res.send('mundo con la fecha '+fecha+" con TypeScript");
// })

//  Encendemos el servidor y lo ponemos en escucha
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
})
//  npm install ts-node-dev -D
//  node build/index.js --watch <-- aún no

//  packagephobia para revisar pesos de dependencias