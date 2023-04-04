const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.urlencoded({extended:false}));

//import our animal model
const Animal = require("../models/animal.js")

// this route is /animals becuase it is the animals router
router.get("/", async (req, res)=>{
    const animals = await Animal.find({})
    res.render("animals/index.ejs", {animals})
});

//CREATE
router.get("/new", (req, res)=>{
    res.render("animals/new.ejs")
})

// POST route
router.post("/", async (req, res)=>{
// create a new animal using the informaiton stored in req.body from create route
// locic for checkbox
    req.body.extinct = req.body.extinct === "on" ? true : false;
    const animal = await Animal.create(req.body);
    res.redirect('/animals');
    
})

// edit
router.get("/edit/:id", async (req, res)=>{
    const animal = await Animal.findById(req.params.id);
    res.render("animals/edit.ejs", {animal})
});

// UPDATE route
router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    req.body.extinct = req.body.extinct === "on" ? true : false;
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.redirect("/animals");
})

//SEEDING with data
router.get("/seed", async (req, res) =>{
    res.send("seeding route")
})

//SHOW route
router.get("/:id", async (req, res)=>{
    const animal = await Animal.findById(req.params.id);
    res.render("animals/show.ejs", {animal})

});

//delete
// router.delete("/:id", async (req, res)=>{
//     console.log(req.params.id);
//     const animal = await Animal.findByIdAndDelete(req.params.id);
//     console.log(animal);
//     res.redirect("/animals")
// })

router.get("/:id/delete", async (req, res)=>{
    const animalToDelete = await Animal.findById(req.params.id);
    res.render("animals/delete.ejs", {animalToDelete})
})

router.delete("/:id", (req, res)=>{
    console.log(req.params.id);
    Animal.findByIdAndDelete(req.params.id)
    .then(result=>{
        console.log("/////////////////made it/////////////////")
        console.log(result)
        res.redirect("/animals")
    })
})

module.exports = router;