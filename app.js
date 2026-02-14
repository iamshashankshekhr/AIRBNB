const express = require("express");
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing.js");
const path = require("path")




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





app.get("/",(req,res) => {
    res.send("Hii i am root")
})

//Index Route

app.get("/listing",async(req,res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//Show Route

app.get("/listing/:id",async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
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