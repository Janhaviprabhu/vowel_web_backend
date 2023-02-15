const express = require("express");
require("dotenv").config();
const { Router } = require('express');
const { UserModel } = require("../models/UserModel");
const UserRouter = Router()

UserRouter.post('/signup',async(req,res)=>{
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.send({
                message: "User already exists! Please Try to Login",
                status: "Exist",
            });
        } else {

            // if (err) {
            //     res.send({ message: "Something went wrong", status: "Failed" });
            // } 
            // else {
                const new_user = new UserModel({
                    name: name,
                    email: email,
                    password: password,
                });
                await new_user.save();
                res.send({ message: "Signup Successfull", status: "Success" });
            
        }
    } catch (err) {
        res.send({ message: "Something went wrong", status: "Error" });
        console.log(err);
    }

}) 

UserRouter.post('/login',async(req,res)=>{
    const { email, password } = req.body;
    if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {

            if (user.email === email) {
                // console.log("reg_user",email,password)
                res.status(200).send({ message: "User Logged in Succefully!!" });
            } else {
                res.status(401).send({ message: "Incorrect! Enter correct password!!" });
            }
        } else {
            res.status(405).send({ message: "User not found with this email, need to register!" });
        }
    }

});


module.exports = {
    UserRouter
};
