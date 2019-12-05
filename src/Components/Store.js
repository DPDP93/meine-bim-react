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



export const getNearestStops = (pos, stations) => {
  let latitude = Number(pos.latitude);
  let longitude = Number(pos.longitude);
  let stops = [];
  const maxDistance = 0.005;

  // compute distance
  for (let i in stations) {
    stations[i].DISTANCE = Math.sqrt(
      (stations[i].LATITUDE - latitude) ** 2 +
        (stations[i].LONGITUDE - longitude) ** 2
    );
  }

  // sort from lowest to highest
  stations.sort((a, b) => a.DISTANCE - b.DISTANCE);

  // return stations within max distance
  for (let i = 0; i < stations.length; i++) {
    if (stations[i].DISTANCE <= maxDistance) {
      stops = [...stops, stations[i]];
    }
  }
  return stops;
}