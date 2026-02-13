import express from 'express'

const router = express.Router();

// GET
router.get("/", (req, res)=>{
    console.log("Se esta procesando una petición del tipo GET");
    res.json({
        status:200, 
        message: "Bienvenido al Sistema de Bienes Raices"
    })
})

// POST
router.post("/createUser", (req, res)=>{
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

// PUT
router.put("/actualizarOferta/", (req,res)=>{
    console.log("Se esta procesando una petición del tipo PUT");

    const ofertaCompra = {
        clienteID: 5158,
        propiedad: 1305,
        montoOfertado:"$125,300.00"
    }

    const nuevaOferta = {
        clienteID: 1578,
        propiedad: 1305,
        montoOfertado: "$130,000.00"
    }

    res.json({
        status:200,
        message: `Se ha actualizado la mejor oferta de ${ofertaCompra.montoOfertado} a ${nuevaOferta.montoOfertado}`
    })
})

// PATCH
router.patch("/actualizarPassword/:nuevoPassword", (req, res)=>{
    console.log("Se esta procesando una petición del tipo PATCH");

    const usuario = {
        nombre: "Chris Bumsted",
        correo: "CBUM@gmail.com",
        password: "123456789"
    }

    const {nuevoPassword} = req.params;

    res.json({
        status:200,
        message: `La contraseña ${usuario.password} fue actualizada a ${nuevoPassword}`
    })
})

// DELETE
router.delete("/borrarPropiedad/:id", (req, res)=>{
    console.log("Se esta procesando una petición del tipo DELETE");

    const {id} = req.params;

    res.json({
        status:200,
        message: `Se ha eliminado la propiedad con id: ${id}`
    })
})

export default router
