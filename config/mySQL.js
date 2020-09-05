const mysql = require('mysql');


var mysqlConnection = mysql.createConnection({
   host: "localhost",
   user: 'root',
   password: "password",
   database: 'starwisp',
   multipleStatements: true
})

mysqlConnection.connect(function(err){
   if(err){
      console.log('error in connecting with mySQL Database', err);
      return;
   }

   console.log('succesfully Connected with Database');

});

module.exports = mysqlConnection;
