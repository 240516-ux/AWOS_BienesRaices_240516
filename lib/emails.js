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

            <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>

            <a href="http://localhost:${process.env.PORT}/auth/confirma/${token}">
                Confirmar Cuenta
            </a>

            <p>Si tú no creaste esta cuenta, ignora este correo.</p>
        `
    })
}

export {
    emailRegistro
}