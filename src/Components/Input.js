import React, { useState, useEffect } from "react";
import { getNearestStops } from "./Helpers.js";

/**
 * Input - React Component
 * controls the search box and filters through station list
 */
const Input = ({ Haltestellen, position, returnInput }) => {
  const [nearestStops, setNearestStops] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [input, setInput] = useState("");
  
  // when position changes - search nearest stops
  useEffect(() => {
    let s = getNearestStops(position, Haltestellen)
    setNearestStops(s);
    setDisplayList(s);
  }, [position]);

  /**
   * regexSearchStations - filtered array with stations where regex pattern is true
   * @param {string} searchBoxInput - e.g. "Schottentor"
   * @param {Array} stations  - array with all Stations
   * @return {Array} - returns filtered array
   */
  const regexSearchStations = (searchBoxInput, stations) => {
    let pattern = new RegExp(searchBoxInput, "i");
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
    const searchBoxInput = event.target.value;
    let filteredStops = [];
    if (searchBoxInput.length > 3) {
      filteredStops = regexSearchStations(searchBoxInput, Haltestellen);
      setDisplayList(filteredStops);
    } else {
      setDisplayList(nearestStops);
    }
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  }

  const handleButton = (event) => {
    event.preventDefault();
    let selectedStation = [];
    if (input.length !== 0) {
      selectedStation = regexSearchStations(input, Haltestellen)[0];
    } 
    returnInput(selectedStation);
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
                  {displayList.length !== 0 
                    ? displayList.map(e => <option key={e.DIVA} value={e.NAME}>🚊 {e.NAME}</option>)
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