const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Importa Nodemailer
const bodyParser = require('body-parser');
const app = express();

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./server/routes/cliente.routes')(app);
require('./server/routes/venta.routes')(app);

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",

    auth: {
        user: 'oz.store200@gmail.com',
        pass: 'yrurhjenwzyvuunj',
    },
});

// Ruta para enviar correo
app.post('/enviar-correo', async (req, res) => {
    const { nombreCliente, correoCliente, mensaje } = req.body;

    const mailOptions = {
        from: 'oz.store200@gmail.com',
        to: correoCliente,
        subject: `Mensaje de ${nombreCliente}`,
        text: mensaje,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado exitosamente');
        }
    });
});

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
