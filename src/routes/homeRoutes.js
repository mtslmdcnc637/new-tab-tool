const router = require("express").Router();
const bodyParser = require("body-parser");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const shortcut = require('../../models/shortcutModels');

router.get("/", async (req, res) => {

    const email = req.cookies.email;
    const links = await shortcut.find({email: email});

    if(!email) {
        return res.redirect("/auth/login");
    }
    res.render("index.ejs", {links: links});
    

})


    module.exports = router;