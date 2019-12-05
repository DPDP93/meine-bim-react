import React, { useState, useEffect } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Store.js";
import Map from "./Components/Map.js";
import Input from "./Components/Input.js";


function App() {
  let [position, setPosition] = useState({});
  
  // first render - get geolocation
  useEffect(() => {
    getLocation().then(pos => {
      setPosition(pos);
      console.log(pos);
    })
  }, []);

  return (
    <div className="container-fluid" style={{width:"100vw", height:"100vh"}}>
      <div className="row">
        <Input Haltestellen={Haltestellen} position={position} />
        <Map Haltestellen={Haltestellen} position={position}/> 
      </div>
    </div>
  );
}

export default App;
