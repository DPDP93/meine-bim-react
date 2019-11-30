import React, { useState } from "react";
import { Haltestellen } from "./Components/Haltestellen.js";
import { getLocation } from "./Components/Store.js";
import Map from "./Components/Map.js";


function App() {
  let [position, setPosition] = useState({});
  let [map, setMap] = useState({});

  // get location coordinates
  getLocation().then(pos => {
    setPosition(pos)
  })

  // get leaflet map object from child
  const handleMap = (m) => { setMap(m) };

  return (
    <div className="container-fluid">
      <div className="row">
        <p>{JSON.stringify(position)}</p>
        <Map Haltestellen={Haltestellen} position={position} getMap={handleMap}/> 
      </div>
    </div>
  );
}

export default App;
