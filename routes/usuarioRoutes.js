import express from 'express'
import { formularioLogin, formularioRegistro, formularioRecuperacion, registrarUsuario } 
from '../controllers/usuarioController.js'

const router = express.Router()

// GET
router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.get('/recuperarPassword', formularioRecuperacion)

//POST
router.post("/registro", registrarUsuario)

export default router