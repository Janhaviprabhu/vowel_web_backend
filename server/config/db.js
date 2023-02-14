const mongoose =require("mongoose")

require("dotenv").config();
mongoose.set('strictQuery', true)
const Connection = mongoose.connect(process.env.MONGODB_URL)

module.exports = {
    Connection
}