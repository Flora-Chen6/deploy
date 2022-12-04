import { conn } from "../sfdb.js"
import dotenv from 'dotenv';
import { json } from "express";
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
        conn.query(`SELECT StartDateTime, EndDateTime, Description, ActivityDate, DurationInMinutes FROM Event WHERE DurationInMinutes = 120 LIMIT 5 `, (err, data) => {
            if (err) return res.status(500).json(err);
            const fetched = (data.records)
            // const fetched = (data.records[0].Description)
            console.log(typeof json(fetched))
            // if (data.records[0] !== undefined) return res.status(409).json("User already exists!");
            return res.status(200).json(fetched);
        })
    });
}

export const allEvents = () => {
    [
        {
            title: "sprint meeting",
            // allDay: true,
            start: new Date(2022,11,14),
            end: new Date(2022,11,14)
        },
        {
            title: "zoom meeting" ,
            // allDay: true,
            start: new Date(2022,10,24),
            end: new Date(2022,10,24)
        },
        {
            title: "client meeting",
            // allDay: true,
            start: new Date(2022,10,25),
            end: new Date(2022,10,25)
        },
        {
            title: "showcase",
            // allDay: true,
            start: new Date(2022,11,5),
            end: new Date(2022,11,5)
        }
    ]
}