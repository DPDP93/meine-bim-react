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