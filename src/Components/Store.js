import L from "leaflet";

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({
          enabled: true, 
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        })
      }, error => {
        reject(error);
      }, 
        {
         enableHighAccuracy: true,
         timeout: 10000,
         maximumAge: 0
       });
     } 
  });  
}

export const setMapView = (pos, myMap, locationMarker, locationCircle) => {
  let location = [pos.latitude, pos.longitude];
  let accuracy = pos.accuracy;
  myMap.setView(location, 17);

  if (accuracy !== undefined) {
    // Remove previous location markers
    if (locationMarker !== undefined) {
      myMap.removeLayer(locationMarker);
      myMap.removeLayer(locationCircle);
    }

    // Show my location with a circle
    locationMarker = L.marker(location);    
    locationCircle = L.circle(location, {
        color: "blue",
        fillColor: "blue",
        opacity: 0.4,
        fillOpacity: 0.1,
        radius: accuracy * 0.5
      });

      myMap.addLayer(locationMarker);
      myMap.addLayer(locationCircle);
      locationMarker.bindPopup(`Ich bin hier. (±${accuracy} m)`).openPopup();
  }
}