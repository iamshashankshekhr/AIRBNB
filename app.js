const express = require("express");
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing.js");
const path = require("path")
const methodOverride = require("method-override");




MONGO_URL = "mongodb://127.0.0.1:27017/AIRBNB";

main().then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));





app.get("/",(req,res) => {
    res.send("Hii i am root");
})

//Index Route

app.get("/listings",async(req,res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//New Route
app.get("/listings/new",(req,res) =>{
    res.render("listings/new.ejs");
})


//Show Route

app.get("/listings/:id",async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route

app.post("/listings",async(req,res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save()
    res.redirect("/listings");
});

//Edit Route

app.get("/listings/:id/edit",async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//Update Route

app.put("/listings/:id",async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing})
    res.redirect(`/listings/${id}`);
})


// app.get("/test",async(req,res) =>{
//     let sampleListing = new Listing({
//         title: "My new villa",
//         dscription: "By the beach",
//         price: 1200,
//         location: "Calangute , goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample is saved")
//     res.send("Successful")
// })



app.listen(8080,() =>{
    console.log("Server is listening on port 8080");
})