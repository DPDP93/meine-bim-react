import React, { useState, useEffect } from "react";

// https://www.wienerlinien.at/ogd_realtime/monitor?&rbl=1212&rbl=1345&rbl=5568&rbl=2910&rbl=4203&rbl=4212&rbl=46&rbl=18&rbl=1303&rbl=3701

/**
 * Fetcher - React Component
 * GET data from API and show data in box. 
 */

const Fetcher = ({Haltestellen, boxData, handleBoxData}) => {
  const isVisible = boxData.isVisible;
  const station = boxData.station;
  let [data, setData] = useState({ lines: [] });

  const fetchData = async (station) => {
    let RBL = await Haltestellen.filter(e => e.NAME === station)[0].RBL;
    let url = "https://www.wienerlinien.at/ogd_realtime/monitor?" 
    for (let i = 0; i < RBL.length; i++) {
      url = `${url}&rbl=${RBL[i]}`;
    }
    try {
      let response = await fetch(url, {mode: 'cors'});
      let data = await response.json();
    } 
    finally {
      let d = await fetch("https://my-json-server.typicode.com/DPDP93/qando-db/db");
      return await d.json();
    }
  }

  useEffect(() => {
    fetchData(station)  // here must go RBL
      .then(x => {
        data = setData(x);
      });
  }, [station])

  return (
      <div className={`position-relative container ${isVisible}`} style={{zIndex: "102", height: "80vh", lineHeight: "1"}}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="bg-white py-3 px-4 col-lg-6 col-md-8 col-xs-10">
            <button type="button" className="close text-danger" onClick={() => handleBoxData({ isVisible: "invisible", station: station})}>x</button>
            <h4>{station}</h4>
            <br/>
            <table className="table table-striped table-hover table-borderless mx-auto">
              <thead>
                <tr>
                  <th>Line</th>
                  <th>Direction</th>
                  <th>[Min.]</th> 
                </tr>
              </thead>
              <tbody>
                { data.length === 0 
                  ? (<tr><td>loading...</td><td>loading...</td><td>loading...</td></tr> )
                  : ( data.lines.map(e => <tr key={JSON.stringify(e)}><td>{e.name}</td><td>{e.towards}</td><td>{e.departures[0]}, {e.departures[1]}</td></tr>) )
                } 
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Fetcher;
