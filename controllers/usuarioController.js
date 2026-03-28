import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarToken } from '../lib/tokens.js'
import { emailRegistro, emailResetearPassword } from '../lib/emails.js'

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

const formularioActualizacionPassword = (req,res) => {
    res.render("auth/resetearPassword", {pagina: "Ingresa tu nueva contraseña"});
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
        name: req.body.nombreUsuario,
        email: req.body.emailUsuario,
        password: req.body.passwordUsuario,
        token: generarToken()
    }
    
    const usuario = await Usuario.create(data)

    //Enviar correo
     emailRegistro({
        nombre: usuario.name,
        email: usuario.email,
        token: usuario.token
     })
      res.render("templates/mensaje",{
         title: "¡Bienvenid@ a BienesRaíces!",
         msg: `La cuenta asociada al correo: ${req.body.emailUsuario}, se ha creado exitosamente, revisa tu correo para confirmarla.`
        })

    }


    const formularioRecuperacion = (req, res) => {
    
        res.render("auth/recuperarPassword", {
        pagina: "Te ayudamos a restaurar tu contraseña"
    });
}
const paginaConfirmacion = async (req, res) => {

    const { token: tokenCuenta } = req.params
    console.log("Confirmando la cuenta asociada al token:", tokenCuenta)

    const usuarioToken = await Usuario.findOne({
        where: { token: tokenCuenta }
    })

    if (!usuarioToken) {

        return res.render("templates/mensaje", {
            title: "Error al confirmar la cuenta",
            msg: "El código de verificación no es válido, intenta nuevamente."
        })
    }

    // Confirmar cuenta
    usuarioToken.token = null
    usuarioToken.confirmed = true
    await usuarioToken.save()

    res.render("templates/mensaje", {
        title: "Confirmación exitosa",
        msg: `La cuenta de ${usuarioToken.name}, asociada al correo ${usuarioToken.email} se ha confirmado correctamente.`
    })

}

const resetearPassword = async(req, res) => {
    const {emailUsuario:usuarioSolicitante} = req.body
    await check('emailUsuario')
        .notEmpty().withMessage("El correo no puede ir vacío")
        .isEmail().withMessage("Formato inválido")
        .run(req)

    const resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render("auth/recuperarPassword", {
            pagina: "Error",
            errores: resultado.array(),
            usuario: { emailUsuario: req.body.emailUsuario }
        })
    }

    const usuario = await Usuario.findOne({where: { email: usuarioSolicitante}});
    if(!usuario) {
        return res.render("templates/mensaje",{
            title: "Error",
            msg: `No existe una cuenta con ese correo`,
            buttonVisibility: true,
            buttonText: "Intentar de nuevo",
            buttonURL: "/auth/recuperarPassword"
        });
    }

    if (!usuario.confirmed) {
        return res.render("templates/mensaje",{
            title: "Cuenta no confirmada",
            msg: `Debes confirmar tu cuenta primero`,
            buttonVisibility: true,
            buttonText: "Intentar de nuevo",
            buttonURL: "/auth/recuperarPassword"
        });
    }

    usuario.token = generarToken();
    await usuario.save();

    await emailResetearPassword({
        nombre: usuario.name,
        email: usuario.email,
        token: usuario.token
    });

    res.render("templates/mensaje",{
        title: "Correo enviado",
        msg: `Revisa tu correo para continuar`,
        buttonVisibility: false
    });
}

const actualizarPassword = async(req, res) => {

    const { emailSolicitante, passwordUsuario, confirmacionUsuario } = req.body

    // validaciones
    await check('passwordUsuario')
        .notEmpty().withMessage("La contraseña no puede ir vacía")
        .isLength({ min: 8 }).withMessage("Mínimo 8 caracteres")
        .run(req)
        
        await check('confirmacionUsuario')
        .equals(passwordUsuario).withMessage("Las contraseñas no coinciden")
        .run(req)
        
        const resultado = validationResult(req)
        
        if(!resultado.isEmpty()){
            return res.render("auth/resetearPassword", {
            pagina: "Error",
            errores: resultado.array()
        })
    }

    // Actualizar usuario
    const usuario = await Usuario.findOne({ where: { email: emailSolicitante } })

    usuario.password = passwordUsuario
    usuario.token = null

    await usuario.save()
    
    res.render("templates/mensaje",{
        title: "Contraseña actualizada",
        msg: "Tu contraseña se actualizó correctamente",
        buttonVisibility: true,
        buttonText: "Iniciar sesión",
        buttonURL: "/auth/login"
    })
}

export {
    formularioLogin,
    formularioRegistro,
    registrarUsuario,
    formularioRecuperacion,
    paginaConfirmacion,
    resetearPassword,
    formularioActualizacionPassword,
    actualizarPassword
}