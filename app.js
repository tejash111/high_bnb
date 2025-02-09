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

app.get("/" , (req,res) => {
    res.send("hi i am groot")
})

//index route
app.get("/listings",async (req,res) => {
    const alllistings =await listing.find({});
    res.render("listings/index.ejs" ,{alllistings})
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