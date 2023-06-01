const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

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

async function getNewAccessTokenFromRefreshToken(refreshToken) {
    const oAuth2Client = new OAuth2Client({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI,
        refreshToken: refreshToken
    });

    const { tokens } = await oAuth2Client.refreshToken(refreshToken);

    return tokens.access_token;
}

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

    const oAuth2Client = new OAuth2Client({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI,
        refreshToken: REFRESH_TOKEN,

        refreshAccessTokenFn: async () => {
            try {
                const newAccessToken = await getNewAccessTokenFromRefreshToken(REFRESH_TOKEN);
                return newAccessToken;
            } catch (error) {
                console.error('Error al obtener un nuevo token de acceso:', error);
                throw new Error('Error al obtener un nuevo token de acceso');
            }
        }
    });

    async function sendMail() {
        try {
            let accessToken = (await oAuth2Client.getAccessToken()).token;
            oAuth2Client.setCredentials({
                access_token: accessToken
            });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "leviapages@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                    accessUrl: "https://oauth2.googleapis.com/token"
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