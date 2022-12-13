const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const db = () => {
        const links = fs.readFileSync('./data/links.json', 'utf-8');
        return JSON.parse(links);
    }
router.get("/on", (req, res) => {
    const links = db();
    
    res.render("index", { links });


})





router.get("/", (req, res) =>{
    res.render("login.ejs");

})




router.post("/", (req, res) =>{
    const {email, password} = req.body;
    const user = process.env.userDB_user;
    const pass = process.env.userDB_pass;
    // Adicione o seguinte comando para desativar a mensagem de aviso
    mongoose.set('strictQuery', false);
    
    
    const conection = mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.wx03ego.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

    if (conection){
        console.log("conectado");
    }

    
});


router.get("/sendmail", async (req, res) =>{

//const { email } = req.body;
//const number = Math.random()*10;

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'authentication@newtabtool.tech',
      pass: 'uMGqxxUxRwiB',
    },
    tls:{
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    }
  });
  const mailOptions = {
    from: 'Autenticação - New Tab Tool <authentication@newtabtool.tech>', // sender address
    to: 'mtslmdcnc637@gmail.com',
    subject: 'auth', // Subject line
    text: 'Autenticação',
    html:'<p>test</p>', // plain text body
   };

   await transporter.sendMail({mailOptions});
   console.log("enviado")
  

res.send({msg: "email enviado"})
}) // fom do req res

router.post("/add", (req, res) => {
    const{link} = req.body;
    const userId = Math.random().toString(36).substr(2, 30);
    const links = db();
    

    const options = {
      method: 'GET',
      url: 'https://site-scrapper.p.rapidapi.com/fetchsitetitle',
      params: {url: link},
      headers: {
        'X-RapidAPI-Key': '149c43278amsh91c50075c7d36eep11f161jsn59ba85274cc7',
        'X-RapidAPI-Host': 'site-scrapper.p.rapidapi.com'
      }
    
}
    axios.request(options).then(function (response) {
        const title = response.data;
        links.push({title, link, userId});
    fs.writeFileSync('./data/links.json', JSON.stringify(links), 'utf-8');
    res.redirect("/");
    }).catch(function (error) {
       const title = link.split("/")[2];
       links.push({title, link, userId});
    fs.writeFileSync('./data/links.json', JSON.stringify(links), 'utf-8');
    res.redirect("/");

    });



    
})
 
app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
