import React, { useState, useEffect } from "react";

const Fetcher = ({data, handleFetcher}) => {
  const isVisible = data.isVisible;
  const station = data.station;

  return (
      <div className={`position-relative container ${isVisible}`} style={{zIndex: "102", height: "80vh", lineHeight: "1"}}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="bg-white py-3 px-3">
            <button type="button" className="close text-danger" onClick={() => handleFetcher({ isVisible: "invisible", station: station})}>x</button>
            <h4>{station}</h4>
            <br/>
            <table className="table table-striped table-hover w-75 mx-auto">
              <th>Line</th>
              <th>Direction</th>
              <th>[Min.]</th> 
              <tr>
                <td>8</td>
                <td>Hauptbahnhof</td>
                <td>9</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Hauptbahnhof</td>
                <td>9</td>
              </tr>  
            </table>
          </div>
        </div>
      </div>
  );
};

export default Fetcher;
