const mysql = require("../config/mySQL");

// function to render Sign In page
module.exports.signin = function(req, res){
   res.render('signIn',{
      title: 'Sign In'
   })
}

// function to create SESSION
module.exports.createSession = function (req, res) {
  console.log("Logged In Successfully");
  res.redirect("/");
};

//  function to logout user
module.exports.logout = function (req, res) {
  req.logout();
  return res.redirect("/users/signin");
};

// function stored university details
module.exports.storeUniversityDetails = function (req, res) {
  if (req.xhr) {
    mysql.query(
      "SELECT * FROM uni_details WHERE uniname = ? ",
      [req.body.uniname],
      function (err, rows) {

         if (rows.length) {
          return res.status(400).json({
            message: 'UNIVERISTY EXISTS'
         });
        } else {
          mysql.query(
            "INSERT INTO uni_details (uniname, registeration_date, expiry_date, imageurl, number_of_students, email, weburl, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              req.body.uniname,
              req.body.registeration_date,
              req.body.expiry_date,
              req.body.imageurl,
              req.body.number_of_students,
              req.body.email,
              req.body.weburl,
              req.body.contact_number,
            ],

            function (err, rows) {
              if (err) {
                console.log("error in creating user - > mysql", err);
              }
             return res.status(200).json({
                data: {
                  rows: rows
                },
                message: 'STORED SUCCESSFULLY !! '
             });
            }
         );
        }
      }
    );
  }
};

// function fetches the data for the table
module.exports.loadTable = function(req, res){
  if(req.xhr){
    let queryFromDatabse = mysql.query("SELECT * FROM uni_details LIMIT 3 OFFSET "+req.query.start , function(err, rows){
      return res.status(200).json({
        data : {
          table : rows
        },
        message: "Table retrieved"
      });
    });

  }
}

//  function deletes the university name form database
module.exports.delete = function(req, res){
  
  if(req.xhr){
    let queryFromDatabse = mysql.query("DELETE FROM uni_details WHERE uid = ?", req.query.id , function(err, rows){

      if(err){
        console.log('error in deletion');
        return res.status(400).json({
          message: 'error'
        })
      }

      console.log('SUCCESFULLY DELETD');
      return res.status(200).json({
        message: "Successfully Deleted"
      });
    });
  }
}

// function upadates information in database
module.exports.update = function(req, res){
  if(req.xhr){
    mysql.query(
      "UPDATE uni_details SET registeration_date = ?, expiry_date = ?, imageurl = ?, number_of_students = ?, email = ?, weburl = ?, contact_number = ? WHERE uniname = ?",
      [
        req.body.registeration_date.substring(0,10),
        req.body.expiry_date.substring(0,10),
        req.body.imageurl,
        req.body.number_of_students,
        req.body.email,
        req.body.weburl,
        req.body.contact_number,
        req.body.uniname,
      ],

      function (err, rows) {
        if (err) {
          console.log("error in creating user - > mysql", err);
        }
       return res.status(200).json({
          data: {
            rows: rows
          },
          message: 'UPDATED SUCCESSFULLY !! '
       });
      }
   );
  }
}