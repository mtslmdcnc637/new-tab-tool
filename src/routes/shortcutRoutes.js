const axios = require("axios");
const shortcutModels = require("../../models/shortcutModels");
const router = require("express").Router();
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const login = require("../middleware/login");
const loginExtension = require("../middleware/loginExtension");

router.post("/extension/add/shortcut", loginExtension, async (req, res) => {
console.log(req.body.url)
    
  const user_id = req.user._id;
  var { url } = req.body;
  var title = "/";
  var imageUrl = "/"

  console.log(url + "user id" + user_id)


  if (!url.startsWith("https://")) {
    url = "https://" + url;
  }

  function getRandomColor() {
    // Gera números aleatórios entre 0 e 255 para cada canal de cor
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Constrói e retorna uma string de cor RGB
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  const bgColor = getRandomColor();

  

  try {
    const page = await axios.get(url);
    const urlString = JSON.stringify(page.data);
    //console.log(urlString)
    title = urlString.match(/<title>(.*?)<\/title>/)[1];
  } catch (error) {
    //console.log(error)
    title = "/";
  }
  //console.log(title);
  //console.log(typeof(title))
  const linkData = { url, title, user_id, bgColor };
  //console.log(linkData);
  try {
    await shortcutModels.create(linkData);
    res.json({message: "link cadastrado com sucesso", bgColor : "#7f7", textColor: "#0f0"} )
  } catch (error) {
    console.log(error);
    res.json({message: "erro no cadastro", bgColor : "#f77", textColor: "#f00"}) 
  }
});





router.post("/shortcut", login, async (req, res) => {
  const user_id = req.user._id;
  var { link: url } = req.body;
  var title = "/";
  var imageUrl = "/"


  if (!url.startsWith("https://")) {
    url = "https://" + url;
  }

  function getRandomColor() {
    // Gera números aleatórios entre 0 e 255 para cada canal de cor
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Constrói e retorna uma string de cor RGB
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  const bgColor = getRandomColor();

  

  try {
    const page = await axios.get(url);
    const urlString = JSON.stringify(page.data);
    //console.log(urlString)
    title = urlString.match(/<title>(.*?)<\/title>/)[1];
  } catch (error) {
    //console.log(error)
    title = "/";
  }
  //console.log(title);
  //console.log(typeof(title))
  const linkData = { url, title, user_id, bgColor };
  //console.log(linkData);
  try {
    await shortcutModels.create(linkData);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.data + "erro no cadastro do link" });
  }
});
module.exports = router;
