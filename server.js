const express = require('express');
const app = express();
const mysql = require('mysql'); 
const port = 3003;
const hostname = "localhost";
const bodyParser = require('body-parser');
const path = require("path");
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "",
    database :"register_for_petsociety"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("Connected")
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) =>{
        con.query(sql,(err,result,fields) =>{
            if(err) reject(err);
            else 
                resolve(result)
        })
    } )
}

app.post('/data',async(req,res) => {
    let sql;
    sql = "CREATE TABLE IF NOT EXISTS register_for_petsociety.userInfo(fname VARCHAR(50), lname VARCHAR(50), gender VARCHAR(50), bd DATE, Pettype VARCHAR(50), email VARCHAR(50), username VARCHAR(50), password VARCHAR(50), confirmpassword VARCHAR(50))"
    sql = "CREATE TABLE IF NOT EXISTS register_for_petsociety.PostInfo (username VARCHAR(50), post VARCHAR(1000), likecount INT, wowcount INT)"
    let {Fname,Lname,gender,bd,Pettype,email,username,password,confirmpassword} = req.body;
    let result = await queryDB(sql);
    // let sql = `INSERT INTO userinfo (fname,lname,email,username,password,confirmpassword,Pettype,gender,bd) VALUES("${req.body.Fname}","${req.body.Lname}","${req.body.email}","${req.body.username}","${req.body.pass}","${req.body.confirmpass}",${pettype}",${gender}","${req.body.bd}")`;
    sql = `INSERT INTO register_for_petsociety.userinfo (fname,lname,gender,bd,Pettype,email,username,password,confirmpassword) VALUES ("${Fname}","${Lname}","${gender}","${bd}","${Pettype}","${email}","${username}","${password}","${confirmpassword}")`;
    result = await queryDB(sql);
    console.log("Save");
    return res.redirect('LogIn.html');
})

app.post('/checkLogin',async(req,res) =>{
    let userForm = req.body.username
    let passForm = req.body.password
    let sql = `SELECT * FROM register_for_petsociety.userinfo WHERE username = '${userForm}' AND password = '${passForm}'`
    let result = await queryDB(sql);
    if(result.length ==0){
        console.log("false")
        return res.redirect('LogIn.html?error=1')
    }
    else if(userForm == result[0].username && passForm == result[0].password){
        res.cookie('username',userForm)
        return res.redirect('Feed.html')
        console.log("LogedIn");
    }
})

// // for Feed 
// app.get("showinfo", async (req,res) =>{
//     let sql = `SELECT fname, lname, email FROM ${userinfo}`;
//     let result = await queryDB(sql);
//     result = Object.assign({},result);
//     res.json(result);
// })

app.post('/writepost',async(req,res) =>{
    let posttxt = req.body.post
    let sql = `INSERT INTO register_for_petsociety.postinfo (username, post) VALUES ("${req.cookies.username}", "${posttxt}")`;
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM register_for_petsociety.postinfo`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    res.json(result);
})


app.get('/readpost', async(req,res)=>{
    let sql = `SELECT username, post FROM register_for_petsociety.postinfo`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    res.json(result);

})

app.listen(port,hostname,()=>{
    console.log(`run : http://${hostname}:${port}/signUp.html `)
});