const jwt = require("jsonwebtoken");
const userModels = require("../../models/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();


module.exports = async (req, res, next) =>{
        const token = req.cookies.token;
        //console.log(token);
      
    
        if (!token) {
          return res.status(401).res.render("login.ejs", {
            notice: "Faça login para acessar essa página",
            colorSet:
              "background-color:orange; padding:0.2rem; border:1px solid red;",
          });
        }
      
        // Verify the token and get the user ID from the payload
        try {
          const decoded = jwt.verify(token, process.env.cookie_pass);
          if(decoded){
          const _id = decoded._id;
       
          // Check if the user exists in the database
          const user = await userModels.findOne({_id : _id});
          if (!user) {
            return res.render("login.ejs", {
              notice: "Faça login para acessar essa página",
              colorSet:
                "background-color:orange; padding:0.2rem; border:1px solid red;",
            });
          }
      
        
          // The user is authenticated, so you can proceed with the request -----------
          req.user = user;
          next();
        }

        } catch (error) {
          console.log(error)
          return res.status(401).send({ error: error });
        }
    
      
}