import React, { useState } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Store.js";
import Map from "./Components/Map.js";


function App() {
  let [position, setPosition] = useState({});

  // get location coordinates
  getLocation().then(pos => {
    setPosition(pos)
  })

  return (
    <div className="container-fluid" style={{width:"100vw", height:"100vh"}}>
      <div className="row">
        <p className="position-relative" style={{zIndex: 1}}>{JSON.stringify(position)}</p>
        <Map Haltestellen={Haltestellen} position={position}/> 
      </div>
    </div>
  );
}

export default App;
