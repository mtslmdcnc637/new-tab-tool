const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const router = require("express").Router();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())



//importando todas as rotas --- ----- ---------------------------
const homRoutes = require("./src/routes/homeRoutes");
const userRoutes = require("./src/routes/userRoutes");
const shortLinksRoutes = require("./src/routes/shortLinksRoutes");
const shortcutRoutes = require("./src/routes/shortcutRoutes");
const initialRoutes = require("./src/routes/initialRoutes")


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
app.use("/home", homRoutes);
app.use("/add", shortcutRoutes);
app.use("/", initialRoutes)


//Client ID:
//b928612743378b2
//Client secret:
//b5e030128935d1f60cdbb8533dcd1a390f990303



router.post("/img",  (req, res) => {
   
  });
  
 
app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
