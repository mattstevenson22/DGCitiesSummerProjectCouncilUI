//CSS imports
import "leaflet/dist/leaflet.css";

//Component imports
import {useEffect, useState} from "react"; 
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";

//Asset imports
import pin from "../images/red-pin.png";

export default function Map(){

  // ----- 0: Fetch data from backend to begin -----
  
  //api url, change to our actual one
  const apiUrl = "https://meowfacts.herokuapp.com/?id=3";

  //function that retrieves complaint data
  async function getComplaintData() {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // call get complaint data and assign it to a variable.
  useEffect(() => {
    let experimentwithapi = getComplaintData();
    console.log(experimentwithapi);
  }, []);
  
  // ----- 1: Boilerplate Setup -----

  // var to store the state of whether the extra info popup is shown or not
  const [buttonPopup, setButtonPopup] = useState(false);

  // var to store state of current complaint key for use in generating the extra info popup
  const [currentComplaintKey, setCurrentComplaintKey] = useState("");

  // create an empty array to store the complaint markers (possibly change to state variable not sure)
  let complaint_markers = [];

  // marker icon
  const customIcon = new Icon({
      iconUrl: pin,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
  });

  // ----- 2: Functional components used within this component -----

  // maps the complaint markers array to actual marker components in react leaflet.
  function Markers({ data }) {

    const map = useMap();

    return (
      data.map((marker) => {
        return (
          <Marker key={marker.key} eventHandlers={{click: () => {map.setView(marker.geocode, 18)}}} position={marker.geocode} icon={customIcon}>
            <Popup >{marker.popUp} </Popup>
          </Marker>
        );
      })
    );
  }

  // displays more info about each complaint in the popup window
  function InfoPopup(props) {

    let complaint_info = complaints_json[props.currentComplaintKey];

    return (props.trigger) ? (
      // <div className="info-popup">
        <div className="info-popup-inner">
          <h3 className="BoxTitleText"> {complaint_info.address} </h3>
          <p className="BoxRegularText"> Category: {complaint_info.category} </p>
          <p className="BoxRegularText"> Full Complaint: {complaint_info.full_complaint} </p>
          <p className="BoxRegularText"> Date: {complaint_info.timestamp} </p>
          <p className="BoxRegularText"> Sentiment: {complaint_info.sentiment} </p>
          <p className="BoxRegularText"> Email Address: {complaint_info.email} </p>
          <p className="BoxRegularText"> Telephone: {complaint_info.telephone} </p>
          <button className="btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
      // </div>
    ) : "";
}


  // ----- 3: Data Pipeline -----

  //dummy complaints json for experimentation
  let complaints_json = {
    complaint1: {
      full_complaint: "blah",
      timestamp: "blah",
      name: "barack",
      address: "123 Wallaby Way, SE10 8DX", 
      geocode: [51.483, 0.0001], 
      email: "hello@hello.com",
      telephone: "blah",
      category: "Damp",
      summary: "There is damp issues in the bathroom and kitchen.",
      sentiment: "Negative"
    },

    complaint2: {
      full_complaint: "blah",
      timestamp: "blah",
      name: "obama",
      address: "64 Zoo Lane, SE10 8DX", 
      geocode: [51.481, 0.014], 
      email: "blah",
      telephone: "120129412912",
      category: "Bins",
      summary: "There is no bin collection from my house at the moment.",
      sentiment: "Neutral"
    },

    complaint3: {
      full_complaint: "blah",
      timestamp: "blah",
      name: "barack",
      address: "123 Wallaby Way, SE10 8DX", 
      geocode: [51.483, 0.04], 
      email: "hello@hello.com",
      telephone: "blah",
      category: "Damp",
      summary: "There is damp issues in the bathroom and kitchen.",
      sentiment: "Negative"
    }
  
  };


  // iterate through each complaint in the JSON response and add a corresponding marker to the complaint markers array
  for (let c_key in complaints_json) {
    if (complaints_json.hasOwnProperty(c_key)) {
        let complaint = complaints_json[c_key];
        if (true){ //here is where i will add checking conditions to ensure only ones that match filters are rendered
            complaint_markers.push({
            key: c_key,
            geocode: complaint.geocode,
            popUp:  <> <h4 className="PopupTitleText"> {complaint.address} </h4> <p className="PopupRegularText"> Category: {complaint.category} </p> <p className="PopupRegularText"> Summary: {complaint.summary} </p> <p className="PopupRegularText"> Sentiment: {complaint.sentiment} </p> <button className="btn" onClick={() => {setCurrentComplaintKey(c_key); setButtonPopup(true);}}> See more </button> </>
      });
    }}}

  // ----- 4: return JSX -----

  return (
    <>

    <MapContainer center={[51.476852, 0.015]} zoom={13.5}>

      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png' />

      
      <MarkerClusterGroup chunkedLoading> 

        <Markers data={complaint_markers} />

      </MarkerClusterGroup>

    </MapContainer>

    <InfoPopup trigger={buttonPopup} setTrigger={setButtonPopup} currentComplaintKey={currentComplaintKey} />

    </>
  );
}




// Notes:
// when giving a co-ordinate, latitude (north or south) comes before longitude (east or west).
// marker clustering has to be turned off for the pop up to work - needs sorting, but popup is top priority i think.