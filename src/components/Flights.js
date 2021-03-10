import React from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';


function Flights({ loading, flights }) {


  if (loading) {
    return <h2>Loading...</h2>
  }

  return (

    <Table className='Flights' striped responsive bordered>
      <thead style={{ fontSize: 21 }}>
        <tr>
          <th className='align-middle'>Date</th>
          <th className='align-middle'>Departure Airport</th>
          <th className='align-middle'>Arrival Airport</th>
          <th className='align-middle'>Departure time (Delay)</th>
          <th className='align-middle'>Carrier</th>
          <th className='align-middle'>Flight number</th>
          <th className='align-middle'>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map(flight =>
          <tr>
            <td className='align-middle'>
              {new Intl.DateTimeFormat("fr-FR",
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }
              ).format(new Date(flight.flight_date))
              }
            </td>
            <td className='align-middle'>{flight.departure.airport}</td>
            <td className='align-middle'>{flight.arrival.airport}</td>
            <td className='align-middle'>
              {new Intl.DateTimeFormat("fr-FR",
                {
                  hour: 'numeric',
                  minute: 'numeric'
                }
              ).format(new Date(flight.departure.scheduled)) + 
              
              // ajout du retard prévu en minutes à droite de l'heure de départ
             ` (+${new Intl.DateTimeFormat("fr-FR",
                    { 
                      minute: 'numeric'
                    }
                ).format(new Date(Date.parse(flight.departure.estimated)- Date.parse(flight.departure.scheduled)))} min)`}

            </td>
            <td className="">
              <span className="d-flex column justify-content-center align-items-center">
                {flight.airline.name}
                  <img className="ml-2 mr-2 align-middle" alt={flight.airline.name}
                    src={`https://content.airhex.com/content/logos/airlines_${flight.airline.iata}_75_100_r.png?md5apikey=VDjfGgv8mxiTvvLLwGicD6V2eq&proportions=keep`} />
              </span>
            </td>
            <td className='align-middle'>{flight.flight.iata}</td>
            <td className='align-middle'>{flight.flight_status.charAt(0).toUpperCase() + flight.flight_status.slice(1)}</td>
          </tr>
        )}
      </tbody>
    </Table>

  )
}

export default Flights;