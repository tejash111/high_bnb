const express = require("express")
const app = express()
const mongoose = require("mongoose")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test/highbnb');
}

main().then( () => {
    console.log(`connected to db`)
}).catch( (err) => {
    console.log(err);
    
})

app.get("/" , (req,res) => {
    res.send("hi i am groot")
})


app.listen(8080, () => {
    console.log(`server is listening to port 8080`)
})