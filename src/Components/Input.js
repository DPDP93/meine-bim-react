import React, { useState, useEffect } from "react";
import { getNearestStops } from "./Store.js";


const Input = ({ Haltestellen, position, returnInput }) => {
  const [nextStop, setNextStop] = useState([]);
  const [displayStop, setDisplayStop] = useState([]);
  const [input, setInput] = useState("");
  
  // search nearest stops on position change
  useEffect(() => {
    let s = getNearestStops(position, Haltestellen)
    setNextStop(s);
    setDisplayStop(s);
  }, [position]);

  // regex search stations
  const regexSearch = (val, stations) => {
    let pattern = new RegExp(val, "i");
    let filterStations = [];
    for (let i = 0; i < stations.length; i++) {
      if (pattern.test(stations[i].NAME)) {
        filterStations = [...filterStations, Haltestellen[i]];
      }
      // artificial limit: show only 10 stations max
      if (filterStations.length >= 10) {
        break;
      } 
    }
    return filterStations
  } 

  const handleInput = (event) => {
    event.preventDefault();
    const val = event.target.value;
    let s = [];
    if (val.length > 3) {
      s = regexSearch(val, Haltestellen);
      setDisplayStop(s);
    } else {
      setDisplayStop(nextStop);
    }
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  }

  const handleButton = (event) => {
    event.preventDefault();
    let s = [];
    if (input.length !== 0) {
      s = regexSearch(input, Haltestellen)[0];
    } 
    returnInput(s);
  }

  return (
    <>
      <div className="col-12 position-relative" style={{zIndex: 100, top: "5rem"}}>
        <div className="d-flex flex-row justify-content-center" >
          <form className="flex-grow-1" style={{maxWidth: "500px"}}>
            <div className="form-row">
              <div className="col-9">
                <input className="form-control" id="location" type="text" list="stations" placeholder="🔍 Station auswählen"
                autoComplete="off" onInput={handleInput} value={input} onChange={handleInputChange}/>
                <datalist id="stations">
                  {displayStop.length !== 0 
                    ? displayStop.map(e => <option key={e.DIVA} value={e.NAME}>🚊 {e.NAME}</option>)
                    : <option value="Schottentor">🚊 Schottentor</option> 
                  }
                </datalist>
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-primary" onClick={handleButton}>Go</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};



export default Input;