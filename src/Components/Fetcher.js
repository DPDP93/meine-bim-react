import React, { useState, useEffect } from "react";

const Fetcher = ({fetcherData, handleFetcher}) => {
  const isVisible = fetcherData.isVisible;
  const station = fetcherData.station;
  let [data, setData] = useState({ lines: [] });

  const fetchData = async (station) => {
    let response = await fetch("https://my-json-server.typicode.com/DPDP93/qando-db/db");
    let data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchData(station)
      .then(x => {
        data = setData(x);
      });
  }, [station])

  return (
      <div className={`position-relative container ${isVisible}`} style={{zIndex: "102", height: "80vh", lineHeight: "1"}}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="bg-white py-3 px-4 col-lg-6 col-md-8 col-xs-10">
            <button type="button" className="close text-danger" onClick={() => handleFetcher({ isVisible: "invisible", station: station})}>x</button>
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
