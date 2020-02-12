import React, { useState, useEffect } from "react";
// json-server --watch monitor.json --port 3004
// https://www.wienerlinien.at/ogd_realtime/monitor?&rbl=1212&rbl=1345&rbl=5568&rbl=2910&rbl=4203&rbl=4212&rbl=46&rbl=18&rbl=1303&rbl=3701

/**
 * Fetcher - React Component
 * GET data from API and show data in box. 
 */

const Fetcher = ({Haltestellen, boxData, handleBoxData}) => {
  const isVisible = boxData.isVisible;
  const station = boxData.station;
  let [data, setData] = useState({ lines: [] });

  // fetch data from API
  const fetchData = async (station) => {
    let RBL = await Haltestellen.filter(e => e.NAME === station)[0].RBL;
    let url = "";
    for (let i = 0; i < RBL.length; i++) {
      if (i === 0) {
        url = `rbl=${RBL[i]}`;
      } else {
        url = `${url}&rbl=${RBL[i]}`;
      }
    };
    let response = await fetch("https://meine-bim-node.herokuapp.com/bim/monitor?" + url, {mode: 'cors'});
    let data = await response.json();
    return data; 
  }

  // extract data from API response
  const formatData = async (d) => {
    // d.monitors[0].lines[0].departures.departure[0].departureTime.countdown
    let data = { lines:[] };
    d.data.monitors.map(e => {
      let line = {};
      line.name = e.lines[0].name;
      line.towards = e.lines[0].towards;
      line.departures = [ e.lines[0].departures.departure[0].departureTime.countdown, 
                          e.lines[0].departures.departure[1].departureTime.countdown
                        ];
      data.lines = [...data.lines, line];
    });
    return data;
  }

  // when station changes, fetch and prepare new data
  useEffect(() => {
    fetchData(station) 
      .then(newData => formatData(newData))
      .then(data => {
        console.log(data);
        setData(data);
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
