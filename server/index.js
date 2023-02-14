const express=require("express")
const cors=require("cors")


const app=express()


app.get("/",(req,res)=>{
    res.send("welcome to cart backend")
})

app.listen(8080,()=>{
    console.log(`listening on port @ http://localhost:8080`)
})