
const axios = require("axios");
const shortcutModels = require('../../models/shortcutModels');
const router = require("express").Router();
const bodyParser = require("body-parser");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.post("/shortcut", async (req, res) => {
    const user_email = req.cookies.email;
    const { link:url } = req.body;


    const options = {
        method: 'GET',
        url: 'https://site-scrapper.p.rapidapi.com/fetchsitetitle',
        params: { url: url },
        headers: {
            'X-RapidAPI-Key': '149c43278amsh91c50075c7d36eep11f161jsn59ba85274cc7',
            'X-RapidAPI-Host': 'site-scrapper.p.rapidapi.com'
        }

    };

    await axios.request(options).then(function (response) {
        const title = response.data;
        const linkData = { url, title, user_email };
        try {
            shortcutModels.create(linkData);
            res.redirect("/");
        } catch (error) {
            res.status(500).send({ error: error + "erro na requisição do titulo" });
        }
    })

})
module.exports = router;