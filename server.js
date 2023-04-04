// DEPENDENCIES
const express = require("express");
const app = express();
const {PORT, DATABASE_URL} = require(("./config"));  //SET UP config.js file with iportant data, and nodemon.json
const mongoose = require("mongoose");
const methodOverride = require("method-override");


//require the router to use the controller
const animalsController = require("./controllers/animals");
// tell the browser to use /animals given the controller object
app.use("/animals", animalsController);


// MIDDLEWARE
// app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

// ROUTES

//default/index route
app.get("/", (req, res)=>{
    res.send("default route")
})


// use mongoose to connect to mongo and then listen on the port
mongoose.connect(DATABASE_URL).then(
    ()=>{
        app.listen(PORT, () => console.log(`express is listeinnig on port ${PORT}`))
    }
)