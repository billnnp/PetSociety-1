const { rejects } = require('assert/strict');
const mysql = require('mysql'); 
const { resolve } = require('node:path');
const { promises } = require('node:stream');

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
    return new Promise((resolve,rejects) =>{
        con.query(sql,(err,result,fields) =>{
            if(err) rejects(err);
            else 
                resolve(result)
        })
    } )
}

app.post('/data',async(req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS userInfo (fname VAECHAR(50),lname VARCHAR(50),gender VARCHAR(50),bd DATE), pettype VARCHAR(50),email VARCHAR(50),username VAECHAR(50),password VAECHAR(50),confirmpassword VAECHAR(50))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userinfo (fname,lname,email,username,password,confirmpassword) VALUES("${req.body.Fname}","${req.body.Lname}","${req.body.email}","${req.body.username}","${req.body.pass}","${req.body.confirmpass}")`;
    result = await queryDB(sql);
    console.log("Save");
    res.end("New saveed");

})