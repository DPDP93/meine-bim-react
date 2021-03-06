import React from "react";
import L from "leaflet";


/**
 *  Map - React Component
 *  contains map and location button, sets map view
 */
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.Haltestellen = this.props.Haltestellen;
    this.map = {};
    this.leafletLayers = {
      marker: undefined,
      circle: undefined
    }

    this.mapStyle = {
      width: "100vw",
      height: "100vh",
      zIndex: "0"
    };

    this.buttonStyle = {
      zIndex: "100",
      bottom: "1rem",
      left: "1rem"
    }

    this.oldInput = "";
  }

  withinVienna(pos) {
    let Vienna = {
      minLatitude: 47.5,
      maxLatitude: 48.8,
      minLongitude: 15.5,
      maxLongitude: 17.1
    };
    if (pos.latitude > Vienna.minLatitude && 
        pos.latitude < Vienna.maxLatitude && 
        pos.longitude > Vienna.minLongitude && 
        pos.longitude < Vienna.maxLongitude) {
      return true
    };
    return false
  }

  // initialize leaflet map
  initMap () {
    // Create map and point to Stephansdom
    let steffl = [48.20849, 16.37317];
    let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
    let myMap = L.map("map");
    L.tileLayer(url, {attribution: attr, minZoom: 15, maxZoom: 18}).addTo(myMap);
    myMap.setView(steffl, 15);
    
    // Add markers, icons and event handler for each station
    this.Haltestellen.map(e => {
      let myIcon = L.divIcon({className: "my-icon", html: '<div style="font-size:1.5rem">🚊</div>' });
      let marker = L.marker([e.LATITUDE, e.LONGITUDE], {icon: myIcon}).addTo(myMap);
      marker._id = e.NAME;
      marker.on("click", (event) => {
        // code here
        this.props.handleBoxData({ isVisible: "visible", station: marker._id});
      });
    })

    this.map = myMap;
  }

  // take position and map object and show location on map
  setMapView (pos, map) {
    if (pos.enabled === true) {
      let location = [pos.latitude, pos.longitude];
      let accuracy = pos.accuracy;
      let { marker, circle } = this.leafletLayers;

      // if accuracy < 200m, show my exact location
      if (accuracy !== undefined || Math.abs(accuracy) < 200) {
        if (this.withinVienna(pos)) {
          map.setView(location, 17);
        }    
        // Remove previous location markers
        if (marker !== undefined) {
          map.removeLayer(marker);
          map.removeLayer(circle);
        }
        // Set new markers
        marker = L.marker(location);    
        circle = L.circle(location, {
            color: "blue",
            fillColor: "blue",
            opacity: 0.4,
            fillOpacity: 0.1,
            radius: accuracy * 0.5
          });
          map.addLayer(marker);
          map.addLayer(circle);
          marker.bindPopup(`Ich bin hier. (±${accuracy} m)`).openPopup();
          this.leafletLayers = { marker, circle };
      }
    }
  }

  handleLocationButton = () => {
    this.setMapView(this.props.position, this.map);
  }

  componentDidMount() {
    this.initMap();
    //setTimeout(() => this.setMapView(this.props.position, this.map), 7000);
  }

  componentDidUpdate() {
    // set map view to station
    let input = this.props.input;
    if (input.length !== 0 && this.oldInput !== input) {
      this.map.setView([input.LATITUDE, input.LONGITUDE], 17);
      this.oldInput = input;
    }
  }

  render () {
    return ( 
    <>
      <div id="map" className="col-12 position-fixed" style={this.mapStyle}></div>
      <button type="button" className="btn btn-secondary btn-sm position-fixed" style={this.buttonStyle} onClick={this.handleLocationButton}>🔎 Location</button>
    </>
    )
  }
}



export default Map;