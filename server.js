const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");


const register= require("./controllers/register");
const signin= require("./controllers/signin");
const profile= require("./controllers/profile");
const image = require("./controllers/image");


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "diego",
    password: "prueba",
    database: "eyesUpHere",
  },
});


// METODO COMENTADO, SOLO MUESTRA LOS USUARIOS DELA BD
// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });


// MIDDLEWARES
const app = express();
app.use(bodyParser.json());
app.use(cors());


//GET REQUEST , TODAVÍA NO LE INVENTE NADA INTERESANTE

app.get("/", (req, res) => {
  res.send('welcome');
});


//SIGNIN
app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

// REGISTER
app.post("/register", (req, res)=> {register.handleRegister(req, res, db, bcrypt)})

//OBTENER UN PERFIL (NO SE SI LO SIGO NECESITANDO DE MOMENTO)
app.get("/profile/:id", (req,res) => {profile.handleProfileGet(req, res, db)});



//METODO PARA INCREMENTAR LAS ENTRIES CUANDO SE SUBE UNA IMAGEN
app.put("/image", (req,res)=> {image.handleImage(req, res, db)});
app.post("/imageurl", (req,res)=> {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000 , () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
