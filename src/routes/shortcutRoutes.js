const axios = require("axios");
const shortcutModels = require("../../models/shortcutModels");
const router = require("express").Router();
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const login = require("../middleware/login");

router.post("/shortcut", login, async (req, res) => {
  const user_id = req.user._id;
  const { link: url } = req.body;

  function getRandomColor() {
    // Gera números aleatórios entre 0 e 255 para cada canal de cor
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Constrói e retorna uma string de cor RGB
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  const bgColor = getRandomColor();

  const options = {
    method: "GET",
    url: "https://site-scrapper.p.rapidapi.com/fetchsitetitle",
    params: { url: url },
    headers: {
      "X-RapidAPI-Key": "149c43278amsh91c50075c7d36eep11f161jsn59ba85274cc7",
      "X-RapidAPI-Host": "site-scrapper.p.rapidapi.com",
    },
  };
  try {
    await axios.request(options).then(async function (response) {
      var title = await response.data;
    });
  } catch (error) {
    var title = " ";
    
  }

  const linkData = { url, title, user_id, bgColor };
  console.log(linkData)
  try {
    await shortcutModels.create(linkData);
    res.redirect("/home");
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ error: error.data + "erro no cadastro do link" });
  }
});
module.exports = router;
