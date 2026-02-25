import express from 'express'
import { formularioLogin, formularioRegistro, formularioRecuperacion } 
from '../controllers/usuarioController.js'

const router = express.Router()

// GET
router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.get('/recuperarPassword', formularioRecuperacion)

export default router