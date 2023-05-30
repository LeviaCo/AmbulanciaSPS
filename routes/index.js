const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

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

    const CLIENT_ID = "16137418587-rbno14t391pqfddbl1h2u03opjvmukoo.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = "1//046gzMxw_QZZBCgYIARAAGAQSNwF-L9IrxHSlBAGU3nMgdcLQduaMAbMoIvDI65ilgVaKqH7azmpZRtYPt8W3SCGscr-rwuWfcBo";

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    async function sendMail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "ambulanciasps.web@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const mailOptions = {
                from: "Web SPS Ambulancias <ambulanciasps.web@gmail.com>",
                to: "leviaconecta@gmail.com",
                subject: "Formulario web",
                html: contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (err) {
            console.log(err);
        }

        console.log("Correo electrónico a enviar:", contentHTML);
    }
    sendMail()
        .then(result => res.status(200).redirect("/success.html"))
        .catch(error => console.log(error.message));
});

module.exports = router;