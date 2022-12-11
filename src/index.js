const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const router = express.Router();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const db = () => {
        const links = fs.readFileSync('./data/links.json', 'utf-8');
        return JSON.parse(links);
    }
router.get("/", (req, res) => {
    const links = db();
    
    res.render("index", { links });


})

router.post("/add", (req, res) => {
    const{link} = req.body;
    const userId = Math.random().toString(36).substr(2, 30);
    const links = db();
    const title = link.split("/")[2];
    links.push({title, link, userId});
    fs.writeFileSync('./data/links.json', JSON.stringify(links), 'utf-8');
    res.redirect("/");
})
 
app.use(router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
