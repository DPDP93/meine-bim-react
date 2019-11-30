import React from "react";
import L from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.Haltestellen = this.props.Haltestellen;
    this.style = {
      width: "100vw",
      height: "100vh"
    }
  }

  initMap () {
    // Create map and point to Stephansdom
    let steffl = [48.20849, 16.37317];
    let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
    let myMap = L.map("map");
    L.tileLayer(url, {attribution: attr, minZoom: 15, maxZoom: 18}).addTo(myMap);
    myMap.setView(steffl, 15);
    this.Haltestellen.map(e => {
      let myIcon = L.divIcon({className: "my-icon", html: '<div style="font-size:1.5rem">🚊</div>' });
      let marker = L.marker([e.LATITUDE, e.LONGITUDE], {icon: myIcon}).addTo(myMap);
      marker._id = e.NAME;
      marker.on("click", (event) => {
        // code here
      });
    })
    this.map = myMap;
  }

  componentDidMount() {
    this.initMap();
    this.props.getMap(this.map);
  }

  render () {
    return ( 
    <>
      <div id="map" className="col-12" style={this.style}></div>
    </>
    )
  }
}



export default Map;