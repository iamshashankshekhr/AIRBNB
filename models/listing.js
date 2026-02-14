const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/492629561/photo/sunset-at-maldivian-beach.jpg?s=1024x1024&w=is&k=20&c=ACoFMi9nGJeSExqoOXpEev_StUeIF1LRkUbd8FaXXzk=",
        set: (v) =>
            v === "" ? "https://media.istockphoto.com/id/492629561/photo/sunset-at-maldivian-beach.jpg?s=1024x1024&w=is&k=20&c=ACoFMi9nGJeSExqoOXpEev_StUeIF1LRkUbd8FaXXzk="
                : v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;