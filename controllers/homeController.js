const mysql = require('../config/mySQL');

// function to render home page
module.exports.home = function(req, res){

   return res.render("home", {
      title: "home Page",
    });
}
