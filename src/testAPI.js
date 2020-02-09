import moment from "moment";

const sendData = async (pos) => {
  let position = await pos;
  let timestamp = moment().format();
  let payLoad = {
    latitude: position.latitude.toFixed(7),
    longitude: position.longitude.toFixed(7),
    time: timestamp
  }
  
  let response = await fetch("https://meine-bim-node.herokuapp.com/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include",
    body: JSON.stringify(payLoad)
  });

  let result = await response.json();
  console.log(result);
}

export default sendData;