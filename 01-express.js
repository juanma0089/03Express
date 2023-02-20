"use strict";



let express = require("express"),
bodyPaser = require('body-parser'),
  app = express();
const { default: mongoose } = require("mongoose");
// Parse-------
  app.use(bodyPaser.urlencoded({extended:false}));
  app.use(bodyPaser.json());
// .env--------
  require('dotenv').config();
  let port = process.env.PORT||3000;
//Static files-----
app.use(express.static(__dirname + "public/"));
// View
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");
// Routes--------
app.use("/", require("./router/rutas"));
app.use("/pokemon", require("./router/pokemon"));
// MongoDB
mongoose.set('strictQuery', false);
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.jow1pac.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));




app;

// .get('/', (req, res)=>{
//     res.render("index", {titulo: 'mi título dinámico'})
// })

// .get('/contacto', (req, res)=>{
//     res.render("contacto", {tituloContacto: 'Estamos en contacto de manera dinámica'})
// })

app
  .use((req, res) => {
    res
      .status(404)
      .render("404", { titulo: "Error 404", descripcion: "Page Not Found" });
  })
.listen(port);
  
console.log("Server listening on port " + port);
