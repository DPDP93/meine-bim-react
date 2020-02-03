import React, { useState, useEffect } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Helpers.js";
import Map from "./Components/Map.js";
import Input from "./Components/Input.js";
import Fetcher from "./Components/Fetcher.js";
import sendData from "./testAPI.js";


/**
 * App - Parent React Element containing the App 
 * sets default state of position, textbox input and visibility of white box fetcher
 */

function App() {
  let [position, setPosition] = useState({});
  let [input, setInput] = useState([]);
  let [fetcher, setFetcher] = useState({ isVisible: "invisible", station: "Schottentor" });
   
  // side effect first render - get geolocation
  useEffect(() => {
    getLocation()
      .then(pos => {
        setPosition(pos);
        sendData(pos);
      })
      .catch(error => {
        setPosition({ enabled: false, latitude: undefined, longitude: undefined, accuracy: undefined });
      })
  }, []);

  // get map object
  const getInput = (s) => {
    setInput(s);
  }

  // set visibility
  const handleFetcher = (data) => {
    setFetcher(data);
  }

  return (
    <div className="container-fluid" style={{width:"100vw", height:"100vh"}}>
      <div className="row">
        <Input Haltestellen={Haltestellen} position={position} returnInput={getInput}/>
        <Map Haltestellen={Haltestellen} position={position} input={input} handleFetcher={handleFetcher}/> 
        <Fetcher fetcherData={fetcher} handleFetcher={handleFetcher}/>
      </div>
    </div>
  );
}

export default App;
