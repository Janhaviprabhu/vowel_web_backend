const express = require("express")
const cors = require("cors")
const { AdminRouter } = require("./routes/admin")
const { Connection } = require("./config/db")
const { CartRouter } = require("./routes/cart")
const ProductRouter = require("./routes/products")
const { UserRouter } = require("./routes/auth")
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/products', ProductRouter)
app.use('/admin', AdminRouter);
app.use('/cart', CartRouter);
app.use('/user', UserRouter)

app.listen(PORT, async () => {
    try {
        await Connection
        console.log("connection to DB successfull")
    }
    catch (err) {
        console.log("error in connecting to DB");
        console.log(err)
    }
    console.log(`listening to port http://localhost:${PORT}`);
})