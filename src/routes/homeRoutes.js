const router = require("express").Router();
const bodyParser = require("body-parser");
const shortcurModel = require('../../models/shortcurModels');
const login = require("../middleware/login");

router.get("/", login, async (req, res, next) => {

    const id = req.user._id;
    const links = await shortcurModel.find({user_id: id})
    res.status(200).render("home.ejs", {links: links});
    next();

})



module.exports = router;