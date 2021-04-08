import axios from "axios";

const API_URL =
  "https://patients-backend.herokuapp.com/api/patients";

class PatientService {
  getAllPatients() {
    return axios.get(API_URL);
  }

  getPatientById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createPatient(patient) {
    return axios.post(API_URL, patient);
  }

  updatePatient(id, patient) {
    return axios.put(`${API_URL}/${id}`, patient);
  }

  deletePatient(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new PatientService();
