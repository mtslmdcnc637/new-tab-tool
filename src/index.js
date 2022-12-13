const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const router = express.Router();
const axios = require("axios");
require('dotenv').config();

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

router.post("/add", (req, res) => {
    const{link} = req.body;
    const userId = Math.random().toString(36).substr(2, 30);
    const links = db();
    const title = link.split("/")[2];
    links.push({title, link, userId});
    fs.writeFileSync('./data/links.json', JSON.stringify(links), 'utf-8');
    res.redirect("/");
})




router.get("/sendmail", (req, res) => { 
    const user = process.env.user;
    const pass = process.env.pass;
    console.log(user);
    console.log(pass);

    const auth = {username: user, password: pass};
    
    const config = {
        method: 'post',
        url: 'https://mail.zoho.com/api/accounts/1000.C8IMNYNU1VXNBM3IF5W6ZVABDH76HI/messages',
        auth,
        data: {
            "fromAddress": "authentication@newtabtool.tech",
            "toAddress": "mtslmdcnc637@gmail.com",
            "subject": "Email - Always and Forever",
            "content": "Email can never be dead. The most neutral and effective way, that can be used for one to many and two way communication.",
            "askReceipt" : "yes",
},
    };

    axios(config)
    .then(response =>{
        //console.log(JSON.stringify(response.data));
        console.log("feito")
        res.send("email sent");
    })
    .catch(error => {
        console.log(error);
    });


//send email with axios
////axios.post('https://mail.zoho.com/api/accounts/798051982/messages',{
  
   // "fromAddress": "authentication@newtabtool.tech",
  //  "toAddress": "mtslmdcnc637@gmail.com",
 //   "ccAddress": "authentication@newtabtool.tech",
   // "bccAddress": "authentication@newtabtool.tech",
 //   "subject": "Email - Always and Forever",
   // "content": "Email can never be dead. The most neutral and effective way, that can be used for one to many and two way communication.",
   // "askReceipt" : "yes",
    //"encoding": "utf-8",
    //"mailFormat": "html",
 
//})

//res.send("email sent");
});




app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
