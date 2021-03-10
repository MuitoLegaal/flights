const API_KEY = '764e4c67d471a17f5c84725463c3ccd8';

const requests = {
  fetchToday: `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=100&offset=10&flight_status=landed&flight_status=landed`
}

export default requests;