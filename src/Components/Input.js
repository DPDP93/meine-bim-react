import React, { useState, useEffect } from "react";
import { getNearestStops } from "./Store.js";


const Input = ({ Haltestellen, position }) => {
  const [nextStop, setNextStop] = useState([]);
  
  useEffect(() => {
    let x = getNearestStops(position, Haltestellen)
    setNextStop(x);
    console.log(x)
  }, [position]);

  const handleInput = (event) => {
    console.log(event.target.value);
  }

  return (
    <>
      <div className="col-12 position-relative" style={{zIndex: 100, top: "5rem"}}>
        <div className="d-flex flex-row justify-content-center" >
          <form className="flex-grow-1" style={{maxWidth: "500px"}}>
            <div className="form-row">
              <div className="col-9">
                <input className="form-control" id="location" type="text" list="stations" placeholder="🔍 Station auswählen"
                autoComplete="off" onInput={handleInput}/>
                <datalist id="stations">
                  {nextStop.length !== 0 
                    ? nextStop.map(e => <option key={e.DIVA} value={e.NAME}>🚊 {e.NAME}</option>)
                    : <option value="Schottentor">🚊 Schottentor</option> 
                  }
                </datalist>
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-primary">Go</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};



export default Input;