//console.log("Hola desde JS");
import express from 'express'
import { connectDB } from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js' 

import session from "express-session"
import cookieParser from "cookie-parser"
import csurf from "@dr.pogodin/csurf"

// Crea una instancia del contenedor web 
const app = express();
const PORT = process.env.PORT ?? 4000;

// HABILITAR LECTURA DE FORMULARIOS
app.use(express.urlencoded({extended: true}))  

// Activar cookies
app.use(cookieParser())

// Permitir JSON
app.use(express.json())

// Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || "PC-BienesRaices_csrf_secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }
}))

//Activar CSRF
app.use(csurf())

// Habilitar los tokens CSRF para cualquier formulario
app.use((req, res, next) => {

    res.locals.csrfToken = req.csrfToken();
    next();

})

// RUTAS DE USUARIO
app.use("/auth", usuarioRoutes)  

// GET
app.get("/", (req, res)=>{
    res.json({
        status:200, 
        message: "Bienvenido al Sistema de Bienes Raices"
    })
})


// POST
app.post("/createUser", (req, res) =>{
    console.log("Se esta procesando una petición del tipo POST")
    const nuevoUsuario = {
        nombre:"Alan Cruz Baltazar",
        correo:"alancruzbaltazar4@gmail.com"
    }

    res.json({
        status:200, 
        message: `Se ha solicitado la creación de un nuevo usuario con nombre: ${nuevoUsuario.nombre} y correo: ${nuevoUsuario.correo}`
    })
})
    

// PUT - Actualización Completa
app.put("/actualizarOferta/",(req, res)=>{
    console.log("Se esta procesando una petición del tipo PUT");
    
    const mejorOfertaCompra = {
        clienteID: 5158,
        propiedad: 1305,
        montoOfertado: "$125,300.00"
    }
    
    const nuevaOferta = {
        clienteID: 1578,
        propiedad: 1305,
        montoOfertado: "$130,000.00"
    }

    res.json({
        status:200, 
        message: `Se ha actualizado la mejor oferta, de un valor de ${mejorOfertaCompra.montoOfertado} a ${nuevaOferta.montoOfertado} por el cliente: ${mejorOfertaCompra.clienteID}`
    })
})


// PATCH  - Actualización Parcial
app.patch("/actualizarPassword/:nuevoPassword", (req, res)=>{
    console.log("Se esta procesando una petición del tipo PATCH");
    
    const usuario = {
        nombre: "Cris Bumsted",
        correo: "CBUM@gmail.com", 
        password: "123456789"        
    }

    const {nuevoPassword} = req.params;

    res.json({
        status:200,
        message: `La contraseña: ${usuario.password} ha sido actualizada a: ${nuevoPassword}`
    })
})


// DELETE
app.delete("/borrarPropiedad/:id", (req, res)=>{
    console.log("Se esta procesando una petición del tipo DELETE");
    const {id} = req.params;

    res.json({
        status:200, 
        message: `Se ha eliminado la propiedad con id : ${id}`
    })
})


await connectDB();
app.listen(PORT, ()=> {
    console.log(`El servidor esta iniciado en el puerto ${PORT}`)
})
