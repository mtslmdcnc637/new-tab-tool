const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const router = require("express").Router();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var parser = cookieParser(process.env.cookie_pass);
app.use(parser);

//importando todas as rotas --- ----- ---------------------------
const homRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const shortLinksRoutes = require("./routes/shortLinksRoutes");
const shortcutRoutes = require("./routes/shortcutRoutes");




//terminando de importar todas as rotas ----------------------------

async function conection(){
    const pass = process.env.userDB_pass;
    const user = process.env.userDB_user;
     try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.wx03ego.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.log(error);
    }
}
conection();


app.use("/auth", userRoutes);
app.use("/", homRoutes);
app.use("/add", shortcutRoutes);




router.post("/add", (req, res) => {
   



    
})
 
app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
