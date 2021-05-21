const express = require('express');
const app = express();
const mysql = require('mysql'); 
const port = 3003;
const hostname = "localhost";
const bodyParser = require('body-parser');
const path = require("path");
var cookieParser = require('cookie-parser');
const multer = require('multer');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//add img
const storage = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,__dirname);
    },

    filename:(req,file,cb) =>{
    cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
}})

const imgFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        req.fileValidationerror = "Only img";
        return cb(new Error("Only img"),false);
    }
    cb(null,true);
}



const con = mysql.createConnection({
    host: "localhost",
    user : "Dumbell",
    password: "Bella120243!",
    database :"register_for_petsociety"

    // host: "localhost",
    // user : "root",
    // password: "",
    // database :"register_for_petsociety"
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
    sql = "CREATE TABLE IF NOT EXISTS register_for_petsociety.PostInfo (username VARCHAR(50), post VARCHAR(1000), likecount INT, wowcount INT , img VARCHAR(100))"
    let {Fname,Lname,gender,bd,Pettype,email,username,password,confirmpassword} = req.body;
    let result = await queryDB(sql);
    // let sql = `INSERT INTO userinfo (fname,lname,email,username,password,confirmpassword,Pettype,gender,bd) VALUES("${req.body.Fname}","${req.body.Lname}","${req.body.email}","${req.body.username}","${req.body.pass}","${req.body.confirmpass}",${pettype}",${gender}","${req.body.bd}")`;
    sql = `INSERT INTO register_for_petsociety.userinfo (fname,lname,gender,bd,Pettype,email,username,password,confirmpassword,img) VALUES ("${Fname}","${Lname}","${gender}","${bd}","${Pettype}","${email}","${username}","${password}","${confirmpassword}", "avatar.png")`;
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

app.post('/profilepic',(req,res) => {
    let upload = multer({storage: storage,fileFilter:imgFilter}).single('Mypic');
    let user = req.cookies.username

    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let filename = req.file.filename
        updateImg(user, filename).then(()=>{
            res.cookie('img', filename)
            return res.redirect('feed.html')
        })
    })
})

const updateImg = async (username, filen) => {
    let sql = `UPDATE register_for_petsociety.userinfo SET img = '${filen}' WHERE username = '${username}'`;
    let result = await queryDB(sql);
    console.log(username);
    let sql2= `UPDATE postinfo SET img='${filen}' WHERE username='${username}'`
    let result1 = await queryDB(sql2);
}

app.post('/writepost',async(req,res) =>{
    let posttxt = req.body.post
    let sql = `INSERT INTO register_for_petsociety.postinfo (username, post, img ) VALUES ("${req.body.username}", "${posttxt}","${req.body.img}")`;
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM register_for_petsociety.postinfo`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    res.json(result);
    console.log(result)
    console.log(req.body)
    
})

app.post("/postprofile",async(req,res)=>{
    let sql = `SELECT username,password,email FROM register_for_petsociety.userinfo WHERE username="${req.cookies.username}"`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    res.json(result[0]);
})

app.get('/readpost', async(req,res)=>{
    let sql = `SELECT username, post ,img FROM register_for_petsociety.postinfo`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    res.json(result);

})

app.post('/editprofile', async(req,res) =>{
    console.log(req.body)
    let {username, password, email, oldusername}= req.body
    let sql = `UPDATE register_for_petsociety.userinfo SET username='${username}', password='${password}', email='${email}' WHERE username = '${oldusername}'`;
    res.clearCookie("username");
    res.cookie('username', username, {overwrite: true});
    let result = await queryDB(sql);
    res.status(200).send(result);
    result = Object.assign({},result);
})

// app.post('/likecount',async(req,res)=>{
//     let sql= `SELECT likecount FROM register_for_petsociety.postinfo WHERE post="${posttxt}"`;
//     let result = await queryDB(sql);
//     result = Object.assign({},result);
// })

app.listen(port,hostname,()=>{
    console.log(`run : http://${hostname}:${port}/signUp.html `)
});