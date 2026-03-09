import { check, validationResult } from 'express-validator'
import Usuario from '../Models/Usuario.js'
import { generarToken } from '../lib/tokens.js'

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Inicia sesión"
    });
}

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Registrate con nosotros :)"
    });
}

const registrarUsuario = async (req, res) => {

    console.log("Intentando registrar a un Usuario Nuevo con los datos del formulario:");
    console.log(req.body);

    await check('nombreUsuario')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .run(req)

    await check('emailUsuario')
        .isEmail()
        .withMessage('El correo no es válido')
        .run(req)

    await check('passwordUsuario')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener mínimo 8 caracteres')
        .run(req)

    const resultadoValidacion = validationResult(req)

    const existeUsuario = await Usuario.findOne({
    where: { email: req.body.emailUsuario }
})

if (existeUsuario) {
    return res.render("auth/registro", {
        pagina: "Registrate con nosotros :)",
        errores: [{ msg: "El usuario ya está registrado" }]
    })
}

    if (!resultadoValidacion.isEmpty()) {
        return res.render("auth/registro", {
            pagina: "Registrate con nosotros :)",
            errores: resultadoValidacion.array()
        })
    }

    const data =
{
    nombre: req.body.nombreUsuario,
    email: req.body.emailUsuario,
    password: req.body.passwordUsuario,
    token: generarToken()
}

    const usuario = await Usuario.create(data)

    res.json(usuario)
}

const formularioRecuperacion = (req, res) => {
    res.render("auth/recuperarPassword", {
        pagina: "Te ayudamos a restaurar tu contraseña"
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrarUsuario,
    formularioRecuperacion
}