const express = require('express');
const app = express();
const mysql = require('mysql'); 
const port = 3003;
const hostname = "localhost";
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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
    
    let {Fname,Lname,gender,bd,Pettype,email,username,password,confirmpassword} = req.body;
    // let result = await queryDB(sql);
    // let sql = `INSERT INTO userinfo (fname,lname,email,username,password,confirmpassword,Pettype,gender,bd) VALUES("${req.body.Fname}","${req.body.Lname}","${req.body.email}","${req.body.username}","${req.body.pass}","${req.body.confirmpass}",${pettype}",${gender}","${req.body.bd}")`;
    let sql = `INSERT INTO register_for_petsociety.userinfo (fname,lname,gender,bd,Pettype,email,username,password,confirmpassword) VALUES ("${Fname}","${Lname}","${gender}","${bd}","${Pettype}","${email}","${username}","${password}","${confirmpassword}")`;
    result = await queryDB(sql);
    console.log("Save");
    res.end("New saveed");

})

app.listen(port,hostname,()=>{
    console.log(`run : http://${hostname}:${port}/signUp.html `)
});