import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import HeadNav from "../components/HeadNav/index";
import LeftNav from "../components/LeftNav/index";

import axios from "axios";


const myEventsList = [
    {
        title: "sprint meeting",
        // allDay: true,
        start: new Date(2022,11,14),
        end: new Date(2022,11,14)
    }
]

const localizer = momentLocalizer(moment)

export default function Event() {
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         console.log("before axios")
    //         await axios.post("/auth/register", inputs)
    //         // console.log(res)
    //         navigate("/login"); 
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    //     console.log("registration submitted")
    // };
return (
    <div className="myCustomHeight">
        {HeadNav()}
        <div className="d-flex justify-content-between container h-100">

        {LeftNav()}
        <Calendar
            localizer={ localizer }
            events={ myEventsList }
            startAccessor="start"
            endAccessor="end"
            style = {{height:600, width:1000, marginTop: "50px"}}
        />
    </div>
    </div>
)
}