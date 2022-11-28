import { conn } from "../sfdb.js"
import dotenv from 'dotenv';
dotenv.config();

export const getAllEvents = (req, res) => {
    const SF_USERNAME = process.env.SF_USERNAME
    const SF_PASSWORD = process.env.SF_PASSWORD
    const SF_TOKEN = process.env.SF_TOKEN

    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
        if (err){
            console.log(err)
        } else {
            console.log("User ID: " + userInfo.id)
            console.log("Org ID: " + userInfo.organizationId)
        }
        console.log("before query")

        //GET ALL GROUP EVENTS 
        //  WHERE IsGroupEvent === true
        conn.query(`SELECT StartDateTime, EndDateTime, Description, ActivityDate FROM Event`, (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(data.records)
            // if (data.records[0] !== undefined) return res.status(409).json("User already exists!");
            return res.status(200).json("Fetched all events");
        })
    });
}