import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {getLogEntries} from "./API";
import AddEntryForm from "./components/AddEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null); 
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 47.8534,
    longitude: 2.3488,
    zoom: 5
  });

const getEntries = async () => {
  const logEntries = await getLogEntries();
  setLogEntries(logEntries) ;
}

useEffect(() => {
  (async () => {
    getEntries();
  })();
}, []);

const showAddMarkerPopup = (e) => {
  const [longitude, latitude] = e.lngLat;
  setAddEntryLocation({
    latitude,
    longitude
  })
};

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken="pk.eyJ1IjoicmFwaGFlbC1mb2doYSIsImEiOiJjazVvMXB3ZmMxMTJvM2tydzNqMjI1dHg1In0.eqrE2UOUguECzcVPmomKSw"
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry =>(
          <Fragment
          key={entry._id}>
          <Marker 
            
            latitude={entry.latitude} 
            longitude={entry.longitude} 
           
           >

         <div
           onClick={() => setShowPopup({
           // ...showPopup,
            [entry._id] : true,
          })}>
           <img className="marker"src="https://i.imgur.com/y0G5YTX.png" alt="marker"/>
         </div>
        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude} 
              longitude={entry.longitude} 
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              dynamicPosition={true}
              anchor="top">
              <div  className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comment}</p>
          <small>Visité le {new Date(entry.visitDate).toLocaleDateString()}</small><br></br>
                {entry.image ? <img className="picture" src={entry.image} alt={entry.title}/> : null}
              </div>
    
          </Popup>
          )  : null
        }
           </Fragment> 
        ))
      }
      {
        addEntryLocation ? (
          <>
           <Marker 
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}>

         <div>
           <img className="marker"src="https://i.imgur.com/y0G5YTX.png" alt="marker"/>
         </div>
        </Marker>
             <Popup
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              dynamicPosition={true}
              anchor="top">
              <div  className="popup">
               <AddEntryForm
                  onClose= {() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}/>
              </div>
    
          </Popup>
          </>
        ) : null
      }
    
    </ReactMapGL>
  );
}

export default App;