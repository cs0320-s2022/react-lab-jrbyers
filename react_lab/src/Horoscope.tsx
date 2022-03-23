import React, {useState} from 'react';
import './App.css';
import TextBox from "./TextBox";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from 'axios'


function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");


    //TODO: Fill in the ? with appropriate names/values for a horoscope.
    //HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.
    const [horoscope, setHoroscope] = useState(["", "", "", "", ""]); // 5 given responses assigned to a list in line 133 of main

    const requestHoroscope = () => {
        const toSend = {
            //TODO: Pass in the values for the data. Follow the format the route expects!
            sun : sun,
            moon : moon,
            rising: rising,
    };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then(response => {
                console.log(response.data);
                //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
                //Note: It is very important that you understand how this is set up and why it works!
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="Horoscope">
            <header className="Horoscope-header">
                <h1>Get Your Horoscope!</h1>
            </header>
            <TextBox label={"Sun Sign:  "} change={setSun}/>
            <TextBox label={"Moon Sign:  "} change={setMoon}/>
            <TextBox label={"Rising Sign:  "} change={setRising}/>

            <AwesomeButton onPress={requestHoroscope}>Get Horoscope</AwesomeButton>

            {horoscope.map((s: String) => (<p>{s}</p>))}
        </div>

    );
}



export default Horoscope;
