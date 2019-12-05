import React, { useState, useEffect } from "react";

const Fetcher = () => {
  return (
    <div className="position-relative container" style={{zIndex: "102", height: "80vh", lineHeight: "1"}}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="bg-white py-3 px-3">
          <button type="button" className="close text-danger">x</button>
          <h4>Next...</h4>
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
