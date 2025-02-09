const mongoose = require("mongoose")
const schema = mongoose.Schema;

const listingschema = new schema({
    title :{
        type : String,
        required : true,
    } ,
    description : String,
    
    Image : {
      type:  String,
      default : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
      set : (v) => v === "" ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D" : v,
    },
    price : Number,
    location : String,
    country : String,
});

const listing = mongoose.model("listing",listingschema)
module.exports = listing;