import React, { useState, useEffect } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Store.js";
import Map from "./Components/Map.js";
import Input from "./Components/Input.js";
import Fetcher from "./Components/Fetcher.js";


function App() {
  let [position, setPosition] = useState({});
  let [input, setInput] = useState([]);
  let [fetcher, setFetcher] = useState({ isVisible: "invisible", station: "Schottentor" });
   
  // first render - get geolocation
  useEffect(() => {
    getLocation()
      .then(pos => {
        setPosition(pos);
        console.log(pos);
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
        <Fetcher data={fetcher} handleFetcher={handleFetcher}/>
      </div>
    </div>
  );
}

export default App;
