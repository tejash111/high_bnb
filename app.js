const express = require("express")
const app = express()
const mongoose = require("mongoose")
const listing = require("./models/listing")
const path = require("path")
const methodOverride = require("method-override")
app.use(methodOverride('_method'));
const ejsmate = require("ejs-mate")

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
app.engine("ejs" ,ejsmate)
app.use(express.static(path.join(__dirname, "/public")));

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
    const foundlisting = await listing.findById(id);
    res.render("listings/show.ejs", { listing : foundlisting });
});

//create route
app.post("/listings" ,async (req,res) => {
    //let {title, description , image , price , country , location } = req.body 
    const newlisting = new listing(req.body.listing)
    await newlisting.save();
    res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit" , async (req,res) => {
    let {id } = req.params;
    const foundlisting = await listing.findById(id);
    res.render("listings/edit.ejs" , {listing : foundlisting})

})

//update route
app.put("/listings/:id" ,async (req,res) => {
    let {id } = req.params
    await listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`)
})

//delte route
app.delete("/listings/:id" ,async(req,res) => {
    let {id} = req.params;
    let deltedlisting = await listing.findByIdAndDelete(id);
    res.redirect("/listings")
})

app.listen(8080, () => {
    console.log(`server is listening to port 8080`)
})