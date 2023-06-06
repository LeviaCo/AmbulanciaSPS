const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { GoogleAuth } = require('google-auth-library');

const fs = require('fs');
const credentialsPath = './credentials.json';
const credentialsData = fs.readFileSync(credentialsPath);
const credentials = JSON.parse(credentialsData);
const {
    client_email,
    private_key,
} = credentials;

require('dotenv').config();
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });
if (result.error) {
    console.error('Error al cargar las variables de entorno:', result.error);
} else {
    console.log('Variables de entorno cargadas correctamente');
}

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

router.post("/send-email", (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const contentHTML = `
    <h1>Formulario de contacto</h1>
    <ul>
        <li>Nombre: ${nombre}</li>
        <li>E-mail: ${email}</li>
        <li>Asunto: ${asunto}</li>
    </ul>
    <p>${mensaje}</p>
  `;

    const auth = new GoogleAuth({
        credentials: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            client_email: credentials.client_email,
            private_key: credentials.private_key,
            redirect_uri: REDIRECT_URI,
            refresh_token: REFRESH_TOKEN
        }
    });

    async function sendMail() {
        try {
            const client = await auth.getClient();

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "leviapages@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    credentials: {
                        client_email: client_email,
                        private_key: private_key
                    }
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: "Web SPS Ambulancias <leviapages@gmail.com>",
                to: "leviaconecta@gmail.com",
                subject: "Formulario web",
                html: contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);

            console.log("Correo electrónico a enviar:", contentHTML);
            return result;
        } catch (err) {
            console.log(err.message);
            throw new Error("Error al enviar el correo electrónico");
        }
    }
    sendMail()
        .then(result => {
            res.redirect(302, "/success.html");
        })
        .catch(error => {
            res.status(500).send("Error al enviar el correo electrónico");
        });
});

module.exports = router;