const router = require("express").Router();
const login = require("../middleware/login");
const cookieParser = require("cookie-parser");
const shortcutModels = require("../../models/shortcutModels");

router.get("/shortcut/:id", login, async (req, res) => {
    const user_id = req.user._id;

  const { id } = req.params;
  //console.log(id);    
  
  try {
    await shortcutModels.findOneAndDelete({ _id: id, user_id: user_id  });
    res.redirect("/home");
  } catch (error) {
    //console.log(error);
   // console.log("erro no cadastro do link" + error);
    res.status(500).send({ error: error + "erro na deleção do link" });
    
  }
});
module.exports = router;