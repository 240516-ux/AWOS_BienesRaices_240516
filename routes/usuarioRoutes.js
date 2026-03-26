import express from 'express'
console.log(" RUTAS DE USUARIO CARGADAS");
import { 
    formularioLogin, 
    formularioRegistro, 
    formularioRecuperacion, 
    registrarUsuario,
    paginaConfirmacion
} from '../controllers/usuarioController.js'

const router = express.Router()

// GET
router.get('/login', (req, res) => {
    res.send(" LOGIN ROUTE FUNCIONA");
});
router.get('/registro', formularioRegistro)
router.get('/recuperarPassword', formularioRecuperacion)
router.get('/confirma/:token', paginaConfirmacion)

// POST
router.post('/registro', registrarUsuario)

export default router