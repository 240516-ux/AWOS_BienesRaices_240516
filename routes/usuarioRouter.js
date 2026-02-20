import express from 'express'
import { login, registro } from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/login', login)
router.get('/registro', registro)

export default router