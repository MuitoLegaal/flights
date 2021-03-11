import React, { useEffect, useState } from 'react';
import './App.css';
import requests from './components/Requests';
import Flights from './components/Flights';
import PagiNation from "./components/Pagination";
import Checkbox from './components/Checkbox';


function App() {


  //Flights data
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(10);

  //Search
  const [search, setSearch] = useState('');

  //Checkbox
  const [landed, setLanded] = useState(true);

  //Fonction appel API AviationStack
  const findFlights = async () => {
    setLoading(true)
    setLanded(true)
    const data = await fetch(requests.fetchToday)
    const body = await data.json()
    //Tri des vols par ordre chronologique
    body.data.sort(function (a, b) { return (Date.parse(a.departure.scheduled)) - (Date.parse(b.departure.scheduled)) })

    setFlights(body.data)
    setLoading(false)
  }

  //Appel fonction API à l'initialisation du composant App
  useEffect(() => {

    findFlights()

  }, []);

  //Fonction barre de recherche
  function searching(flights) {
    return flights.filter((flight) =>
      (flight.airline.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (flight.departure.airport || '').toLowerCase().includes(search.toLowerCase()) ||
      (flight.arrival.airport || '').toLowerCase().includes(search.toLowerCase()) ||
      (flight.airline.iata || '').toLowerCase().includes(search.toLowerCase()) ||
      (flight.flight.number || '').includes(search)
    );
  }

  //Fonction checkbox landed on/off
  function landing(flights) {
    return flights.filter((flight) =>
      (flight.flights_status || '').includes('scheduled' || 'active' || "cancelled" || "diverted")
    );
  }

  //Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const searchedFlights = searching(flights)
  const currentFlight = searchedFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  //Checkbox filter function
  const handleLanded = () => {

    setLanded(!landed)

    if (landed === true) {
      setFlights(landing(searchedFlights))
      console.log('landed', flights)
    } else if (landed === false) {
      findFlights()
      console.log('scheduled', flights)
    }
  }


  return (
    <div className="App container col-auto col-lg-10">
      <h1 className="Title mb-2">
        <img className="logo" alt="logo-tarmac" src={"../logo-tarmac.png"} />Tarmac Technologies
      </h1>
      <div className="search-row mb-4">
        <h2 style={{ color: 'white' }}>Departures</h2>
        <div>
          <input style={{ width: 300, borderSize: '1px', color: '#1F2673', fontWeight: 'bold', marginBottom: '4px' }}
            rules={{ 'input:: -webkit-input-placeholder': { color: 'red' } }} type='text' placeholder="Search Airport, Carrier or Flight number"
            className="text" onChange={(e) => setSearch(e.target.value)} />
          <Checkbox handleLanded={handleLanded} landed={landed} />
        </div>
      </div>
      <Flights className='row' title="Departures" flights={currentFlight} loading={loading} />
      <PagiNation paginate={paginate} searchedFlights={searchedFlights} flightsPerPage={flightsPerPage} currentPage={currentPage} />
    </div>
  );
}

export default App;
