const mysql = require('mysql');

let con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"password",
	database:"studentinventory",
	multipleStatements:true
});

con.connect((err)=>{
	if(err)throw err
	console.log("connected with database")
});

module.exports = con;






















