const router = require("express").Router();
const userModels = require("../../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



//se for uma requisição get /login ele exibe o formulario de login
router.get("/login", (req, res) => {
  return res.render("login.ejs", { notice: "", colorSet: "" });
});

//se for uma requisição post /login ele faz a autenticação do usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Missing email or password" });
  }
  try {
    const user = await userModels.findOne({ email: email });
    if (!user) {
      return res.status(401).render("login.ejs", {
        notice: "Falha no login, verifique os dados",
        colorSet:
          "background-color:orange; padding:0.2rem; border:1px solid red;",
      });
    }
    
    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).redirect("/");
      }
      if (result) {
        let token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.cookie_pass,
          {
            expiresIn: "7d",
          }
        );
        console.log(token);
        res.cookie("token", token, {
          // Set the expiration time for the cookie to be one hour from now
          maxAge: 7 * 24 * 60 * 60 * 1000,
          // Set the cookie to be secure (only sent over HTTPS)
          secure: true,
          // Set the cookie to be accessible only to the server (not by JavaScript)
          httpOnly: true,
        });
        return res.status(200).redirect("/home");
        // console.log("Resposta enviada!");
      }
      return res.status(401).render("signup.ejs", {
        notice: "Falha no login, verifique os dados",
        colorSet:
          "background-color:orange; padding:0.2rem; border:1px solid red;",
      });
    });

    //return res.status(200).redirect("/home");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error + "erro desconhecido" });
  }
});

//se for uma requisição get / ele exibe o formulario de login
router.get("/", (req, res) => {
  const email = req.cookies.email;
  if (email) {
    return res.render("home.ejs");
  }
  res.render("login.ejs");
});

router.get("/logout", (req, res) => {
  res.clearCookie("email");
  res.redirect("/auth/login");
});

//se for uma requisição get /signup ele exibe o formulario de cadastro
router.get("/signup", (req, res) => {
  res.render("signup.ejs", { notice: "", colorSet: "" });
});

router.post("/signup", async (req, res) => {
  const { email, password: hash, passConfirm } = req.body;

  if (!email || !hash || !passConfirm) {
    return res.status(400).render("signup.ejs", {
      notice: "Todos os campos são obrigatórios",
      colorSet:
        "background-color:orange; padding:0.2rem; border:1px solid red;",
    });
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email)) {
  } else {
    return res.status(400).render("signup.ejs", {
      notice: "Este email não é valido",
      colorSet: "background-color:red; padding:0.2rem; border:1px solid red;",
    });
  }

  if (hash.length < 8) {
    return res.status(400).render("signup.ejs", {
      notice: "A senha deve ter pelo menos 8 caracteres",
      colorSet:
        "background-color:orange; padding:0.2rem; border:1px solid red;",
    });
  }

  if (typeof email !== "string" || typeof hash !== "string") {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  if (hash != passConfirm) {
    return res.status(400).render("signup.ejs", {
      notice: "A senha e a confirmação de senha devem ser iguais",
      colorSet:
        "background-color:orange; padding:0.2rem; border:1px solid red;",
    });
  }

  //verificar se email ja existe no banco de dados ------------------------------------

  const tryEmail = await userModels.findOne({ email: email });
  if (tryEmail) {
    return res.status(409).render("signup.ejs", {
      notice: "Este email ja está cadastrado!",
      colorSet:
        "background-color:orange; padding:0.2rem; border:1px solid red;",
    });
  }

  try {
    bcrypt.hash(hash, 12, async (errBcrypt, password) => {
      const userData = { email, password };
      userModels.create(userData);
      //res.cookie('email', JSON.stringify(req.body.email), { expires: new Date(2023, 1, 1), httpOnly: true });
      let token = jwt.sign(
        {
          id_user: user._id,
          email: user.email,
        },
        process.env.cookie_pass,
        {
          expiresIn: "5d",
        }
      );
      return res.status(200).send({ token }).redirect("/home");
    });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
});
module.exports = router;
