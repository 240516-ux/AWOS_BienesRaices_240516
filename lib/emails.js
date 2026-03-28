import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const { email, nombre, token } = datos

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Bienvenid@ a la Plataforma de Bienes Raíces - Confirma tu cuenta',
        html: `
            

        <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>
        <hr>
        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>

            <a href="http://localhost:${process.env.PORT}/auth/confirma/${token}">
            Confirmar Cuenta
            </a>

            <p>Si tú no creaste esta cuenta, ignora este correo.</p>
             `
    })
}

const emailResetearPassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const {email, nombre, token}= datos 

    await transport.sendMail({
        from: 'PowerCode BienesRaices <TU_CORREO@gmail.com>',
        to: email, 
        subject: 'Recuperación de contraseña - PowerCode',
        html: `
            <p>Hola ${nombre}, has solicitado restablecer tu contraseña</p>
            <hr>
            <p>Haz clic en el siguiente enlace:</p>
            <a href="http://localhost:${process.env.PORT}/auth/actualizarPassword/${token}">
            Restablecer contraseña
            </a>
        `
    });
}

export {
    emailRegistro,
    emailResetearPassword
}