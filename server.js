const express = require('express');
const app = express();
const mysql = require('mysql'); 
const port = 3003;
const hostname = "localhost";
const bodyParser = require('body-parser');

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
    let {pettype,gender} = req.body;
    let sql = "CREATE TABLE IF NOT EXISTS userInfo(fname VAECHAR(50), lname VARCHAR(50), gender VARCHAR(50), bd DATE), pettype VARCHAR(50), email VARCHAR(50), username VAECHAR(50), password VAECHAR(50), confirmpassword VAECHAR(50))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userinfo (fname,lname,email,username,password,confirmpassword,pettype,gender) VALUES("${req.body.Fname}","${req.body.Lname}","${req.body.email}","${req.body.username}","${req.body.pass}","${req.body.confirmpass}",${pettype}",${gender}")`;
    result = await queryDB(sql);
    console.log("Save");
    res.end("New saveed");

})

app.listen(port,hostname,()=>{
    console.log(`run : http://${hostname}:${port}/signUp.html `)
});