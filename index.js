const express = require('express');
const mysql = require('mysql');
const connection = require('./connection');
const app = express();
const jwt = require('jsonwebtoken');

// app.use(express.json())


const bodyparser = require('body-parser');
app.use(bodyparser.json());

//1. End point for inserting the data into the database

app.post('/signup',(req,res)=>{
	var id = req.body.id
	var Name = req.body.Name;
	var DOB = req.body.DOB;
	var Gender = req.body.Gender;
	var Phone = req.body.Phone;
	var hai = req.body.class;

	connection.query("insert into sd(id,Name,DOB,Gender,Phone,class) values (?,?,?,?,?,?)",[id,Name,DOB,Gender,Phone,hai],(err,rows)=>{
		if(err)throw err
		res.send('you successfully entering the data!')
	})
})

//2. End point for getting the data from database

app.get('/totaldata',(req,res)=>{
	connection.query("select * from sd",(err,rows)=>{
		if(err)throw err
		res.send(rows)
	})
})

// 3.end point for login

app.get('/login',(req,res)=>{
	var Name = req.query.Name;
	var id = req.query.id;
	connection.query("select * from sd",(err,rows)=>{
		if(err) throw err
		var data = rows;
		data.forEach(function(item){
			if (item.id == id){
				if(item.Name == Name){
					res.send({"your successfully login to your account":item});
				}else{
					res.send("Name is wrong!!")
				}
			}else{
				res.send("id is wrong!!!")
			}
		})
	})
})

// 4.deleting of accout by admin and user only for this i have to create json web token

app.delete('/delete/:id',Tv,(req,res)=>{
	var id = req.params.id;
	connection.query('delete from sd where id = ?',[id],(err,rows)=>{
		if(err)throw err
		res.send("successfully deleted your details!!")
	})
})

// 5.token creating:

app.get('/createtoken/:id',(req,res)=>{
	var id = req.params.id;
	connection.query("select * from sd",(err,rows)=>{
		if(err) throw err
		var data = rows;
		console.log(data);
		data.forEach(function(item){
			if (item.id == id){
				res.send({"token":jwt.sign(item.id,"my_secrete_key")})
			}
		})
	})
})

// middle ware function for admin and user

function Tv(req,res,next){
	var header = req.headers['authorization'];
	var decode = jwt.verify(header,"my_secrete_key")
	if(decode == 1){
		next()
	}else if(decode == req.params.id){
		next()
	}else{
		res.send("you can't deletet or update all the details!")
	}
}

//6.updating of account:

app.put('/update/:id',Tv,(req,res)=>{
	var Main = req.params.id;
	var id = req.body.id;
	var Name = req.body.Name;
	var DOB = req.body.DOB;
	var Phone = req.body.Phone;
	var hai = req.body.class;
	var Gender = req.body.Gender;

	connection.query('update sd set id=?,Name=?,DOB=?,Phone=?,Gender=?,class=? where id = ?',[id,Name,DOB,Phone,Gender,hai,Main],(err,rows)=>{
		if(err)throw err
		res.send("your are successfully update your account")
	})
})



app.listen(2000,(err)=>{
	if(err)throw err
	console.log("your port is working!");
})




































