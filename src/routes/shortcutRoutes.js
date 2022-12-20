const axios = require("axios");
const shortcutModels = require("../../models/shortcutModels");
const router = require("express").Router();
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const login = require("../middleware/login");
const getBodyFromURL = require("../functions/getBodyFromURL");
const convertBodyToImage = require("../functions/convertBodyToImage")


router.post("/shortcut", login, async (req, res) => {
  const user_id = req.user._id;
  var { link: url } = req.body;
  var title = "/";
  var imageUrl = "/"

  // começa o codigo que retorna um body 
  const bodyString = await getBodyFromURL(req.body.link)
  console.log(bodyString)
  const image = await convertBodyToImage(bodyString);
  console.log(image)













//client id b928612743378b2 
//client secret 924a18cb19422011bccdb4b8028a8814d0682c75

  // Substitua {{clientId}} pelo seu próprio ID do cliente do Imgur
  const clientId = '{{b928612743378b2}}';
  
  // Substitua a string codificada em base64 pelo conteúdo da sua própria imagem codificada em base64
  try{
  axios.post('https://api.imgur.com/3/image', {
    image
  }, {
    headers: {
      Authorization: `Client-ID ${clientId}`
    }
  })
    .then(response => {
      // A resposta é um conjunto de dados JSON com informações sobre a imagem enviada
      const imageData = response.data;
      console.log(imageData);
      imageUrl = image.data.link
      console.log(imageUrl)
    })
    .catch(error => {
      console.error(error);
    });
  }catch(error){
    console.log(error)
  }
  










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
  const linkData = { url, title, user_id, imageUrl, bgColor };
  //console.log(linkData);
  try {
    await shortcutModels.create(linkData);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.data + "erro no cadastro do link" });
  }
});
module.exports = router;
