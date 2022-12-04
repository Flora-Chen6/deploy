import { conn } from "../sfdb.js"
import dotenv from 'dotenv';
dotenv.config();
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

export const register = (req, res) => {
     
     const SF_USERNAME = process.env.SF_USERNAME
     const SF_PASSWORD = process.env.SF_PASSWORD
     const SF_TOKEN = process.env.SF_TOKEN

     const inputEmail = req.body.email;
     console.log(inputEmail);
    //  const insertPassword = req.body.password;

     conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
        if (err){
            console.log(err)
        } else {
            console.log("User ID: " + userInfo.id)
            console.log("Org ID: " + userInfo.organizationId)
        }
        console.log("before query")

        //CHECK EXISTING USER 
        conn.query(`SELECT Name FROM UserPassword__c WHERE Name LIKE '${ inputEmail }' `, (err, data) => {
            if (err) return res.status(500).json(err);
            // console.log(data.records[0])
            if (data.records[0] !== undefined) return res.status(409).json("User already exists!");
                conn.sobject("UserPassword__c").create({ Name : insertEmail, Password__c: insertPassword }, function(err, data) {
                    console.log(data.records)
                    
                    if (err) return res.status(409).json(err);
                    // return res.status(200).json("User has been created.");
                });
            return res.status(200).json("User has been created.");
        })
    });
/*
    // db.query(q, [req.body.email], (err, data) => {
    //     if (err) return res.json(err);
    //     if (data.length) return res.status(409).json("User already exists!");
    //     if (err){
    //         console.log(err)
    //     } else {
    //         console.log("User ID: "+ data.id)
    //         console.log("email: " + data.email)
    //     }
    //     // HASH PASSWORD

    //     const salt = bcrypt.genSaltSync(10);
    //     const hash = bcrypt.hashSync(req.body.password, salt);
    // });
    */

};

export const login = (req, res) => {
    const SF_USERNAME = process.env.SF_USERNAME
    const SF_PASSWORD = process.env.SF_PASSWORD
    const SF_TOKEN = process.env.SF_TOKEN

    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    console.log(inputEmail);

    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
       if (err){
           console.log(err)
       } else {
           console.log("User ID: " + userInfo.id)
           console.log("Org ID: " + userInfo.organizationId)
       }
       console.log("before query")

       //CHECK REGISTERED USER 
       conn.query(`SELECT Name, Password__c FROM UserPassword__c WHERE Name LIKE '${ inputEmail }' `, (err, data) => {
           console.log(data.records[0].Password__c)
           if (err) return res.status(500).json(err);
        // CHECK REGISTERED
           if (data.records[0] === undefined) return res.status(409).json("User Not Found. Please Register");
        // CHECK PASSWORD
           if (inputPassword !== data.records[0].Password__c)  return res.status(409).json("Wrong password");
        //    const currentUser = {"email": inputEmail, "password": inputPassword} 
           return res.status(200).json(inputEmail);
       })
   });
    /*
    db.query(q,[req,body,email],(err,data)=>{
        if(err) return res.json(err);
        if (data.length === 0) return res.status(404).json("user not found!");
    })

    //Check password
    // const isPasswordCorrect = bcrypt.compareSync(
    //     req.body.password,
    //     data[0].password
    // );
    // if (!isPasswordCorrect)
    //   return res.status(400).json("Wrong username or password!");
    */
};

export const logout = (req, res) => {

};

export const home = (req, res) => {
    console.log(req);
};