const express = require("express")
const app = express()
const mongoose = require("mongoose")
const listing = require("./models/listing")
const path = require("path")



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/highbnb');
}
main().then( () => {
    console.log(`connected to db`)
}).catch( (err) => {
    console.log(err);
});

app.set("view engine" ,"ejs" );
app.set("views" , path.join(__dirname, "views"))
app.use(express.urlencoded ({extended : true}))

app.get("/" , (req,res) => {
    res.send("hi i am groot")
})

//index route
app.get("/listings",async (req,res) => {
    const alllistings =await listing.find({});
    res.render("listings/index.ejs" ,{alllistings})
})

//new route
app.get("/listings/new" , (req,res) => {
    res.render("listings/new.ejs")
})

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    res.render("listings/show.ejs", { listing: foundListing });
});

//create route
app.post("/listings" ,async (req,res) => {
    //let {title, description , image , price , country , location } = req.body 
    const newlisting = new listing(req.body.listing)
    await newlisting.save();
    res.redirect("/listings")
})


// app.get("/testlisting" , async (req,res) => {
//     let samplelisting = new listing({
//         title : "my new villa",
//         description : "by the beach",
//         price : 1200,
//         location : "calangaute, goa",
//         country : "india",
//     });
//     await samplelisting.save();
//     console.log(`sample was saved`)
//     res.send("connecting successfull")
   
// })

app.listen(8080, () => {
    console.log(`server is listening to port 8080`)
})