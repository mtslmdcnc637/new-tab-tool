const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");


const {email} = req.body;
const number = Math.random()*10;

function sendMail(){
const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'newtabtool@gmail.com',
        pass:'rwhpussnjfemhvpn',
    }
});

transport.sendMail({
    from: 'New tab tool <newtabtool@gmail.com>',
    to: email,
    subject: 'Autenticação - New Tab Tool',
    html: '<h3>Olá! copie o código abaixo e cole no campo indicado la na plataforma</h3><br><br><br><h1>'+numer+'</h1>',
    text: 'Olá! copie o código abaixo e cole no campo indicado la na plataforma'+numer
})
.then(()=> console.log("enviado"))
.catch(console.log("erro"));
}