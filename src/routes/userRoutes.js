const router = require("express").Router();
const userModels = require('../../models/user');
const bodyParser = require("body-parser");



//se for uma requisição get /login ele exibe o formulario de login
router.get("/login", (req, res) => {
    const emailCookie = req.cookies.email;
    console.log(emailCookie);
    if(emailCookie) {
        return res.redirect("/");
    }
    res.render("login.ejs");
});



//se for uma requisição post /login ele faz a autenticação do usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send({ error: "Missing email or password" });
    }
    try {
        const user = await userModels.findOne({ email: email, password: password });
        if(!user) {
            return res.status(400).send({ error: "User not found" });
        }
        
    // Set cookie with expiration date in the future
        await res.cookie('email', email, { expires: new Date(2023, 1, 1), httpOnly: true });
        res.status(200).redirect("/");
    } catch (error) {
        res.status(500).send({ error: error+"aqui" });
    }
});



//se for uma requisição get / ele exibe o formulario de login
router.get("/", (req, res) => {
    const email = req.cookies.email;
    if(email) {
        return res.render("index.ejs");
    }
    res.render("login.ejs");
});

router.get("/logout", (req, res) => {
    res.clearCookie('email');
    res.redirect("/auth/login");
});

//se for uma requisição get /signup ele exibe o formulario de cadastro
router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});



router.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send({ error: "Missing email or password" });
    }

    const userData = {email, password};
    try {
        await userModels.create(userData);
        res.cookie('email', JSON.stringify(email), { expires: new Date(2023, 1, 1), httpOnly: true });
        res.status(201).redirect("/");
    } catch (error) {
        res.status(500).send({ error: error });
    }

})
module.exports = router;