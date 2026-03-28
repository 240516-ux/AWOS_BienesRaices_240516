import express from 'express'
import { 
    formularioLogin, 
    formularioRegistro, 
    formularioRecuperacion, 
    registrarUsuario,
    paginaConfirmacion,
    resetearPassword,
    formularioActualizacionPassword
} from '../controllers/usuarioController.js'

const router = express.Router()

// GET
router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.get('/recuperarPassword', formularioRecuperacion)
router.get("/confirma/:token", paginaConfirmacion)
router.get("/actualizarPassword/:token", formularioActualizacionPassword)

//POST
router.post("/registro", registrarUsuario)
router.post("/recuperarPassword", resetearPassword)

export default router