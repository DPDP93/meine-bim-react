import React, { useState, useEffect } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Store.js";
import Map from "./Components/Map.js";
import Input from "./Components/Input.js";


function App() {
  let [position, setPosition] = useState({});
  let [input, setInput] = useState([]);
  
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
  const getInput = (data) => {
    setInput(data);
  }

  return (
    <div className="container-fluid" style={{width:"100vw", height:"100vh"}}>
      <div className="row">
        <Input Haltestellen={Haltestellen} position={position} returnInput={getInput}/>
        <Map Haltestellen={Haltestellen} position={position}/> 
      </div>
    </div>
  );
}

export default App;
