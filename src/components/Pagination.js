import React, {useState} from 'react';
import { Pagination } from "react-bootstrap";

function PagiNation ({paginate, searchedFlights, flightsPerPage, currentPage}) {
 
  const pageNumbersConst = []

  for(let i = 1 ; i <= Math.ceil(searchedFlights.length / flightsPerPage); i++){
    pageNumbersConst.push(i);
  }

  //Retour en page 1 après une saisie en barre de recherche
  if(currentPage>pageNumbersConst.length){paginate(1)}

    return (
   
      <div className="pagi">
          {pageNumbersConst.map(number => (
            <Pagination key={number} size="lg" className="page_item">
              <Pagination.Item key={number} active={number === currentPage} className="paginationButton" onClick={() => paginate(number)} href='!#' className='page_link'>
                {number}
              </Pagination.Item>
            </Pagination>
          ))}
      </div>

    )
}

export default PagiNation
