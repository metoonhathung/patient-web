import axios from "axios";

// const URL = "http://localhost:8080/api";
const URL = "https://patients-backend.herokuapp.com/api/";

class PatientService {
  get(condition, range) {
    return axios.get(`${URL}/get?condition=${condition}&range=${range}`);
  }

  count(condition) {
    return axios.get(`${URL}/count?condition=${condition}`);
  }

  read(id) {
    return axios.get(`${URL}/read?id=${id}`);
  }

  create(patient) {
    return axios.post(`${URL}/create`, patient);
  }

  update(id, patient) {
    return axios.put(`${URL}/update?id=${id}`, patient);
  }

  delete(id) {
    return axios.delete(`${URL}/delete?id=${id}`);
  }
}

export default new PatientService();
