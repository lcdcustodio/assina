import axios from 'axios';
import appJson from '../../app.json';

class Api {

  constructor() {
    axios.defaults.baseURL = appJson.apiBaseUrl;
  }

  getUnits = async () => {
    return (await this._get('/units')).data;
  }

  login = async (username, password, unitId) => {
    const response = await this._post('/login', {
      'username': username,
      'password': password,
      'unit': { 'id': unitId },
    });
    axios.defaults.headers.common['Authorization'] = response.headers.authorization;
  }

  getAttendance = async (attendanceRef) => {
    return (await this._get(`/attendances/${attendanceRef}`)).data;
  }

  getUnsignedDocument = async (documentRef) => {
    return (await this._get(`/documents/${documentRef}/unsigned`)).data;
  }

  _get = async (url, data) => {
    let response;
    try {
      response = await axios.get(url, data);
    } catch (error) {
      throw ApiException.fromAxiosError(error);
    }
    if (response.status !== 200) {
      throw ApiException.fromResponse(response);
    }
    return response;
  }

  _post = async (url, data) => {
    let response;
    try {
      response = await axios.post(url, data);
    } catch (error) {
      throw ApiException.fromAxiosError(error);
    }
    if (response.status !== 200) {
      throw ApiException.fromResponse(response);
    }
    return response;
  }
}

const api = new Api();
export default api;

export class ApiException extends Error {

  constructor(message, httpStatus) {
    super(message);
    this.message = message;
    this.httpStatus = httpStatus;
  }

  toString() {
    return this.httpStatus
      ? `httpStatus: ${this.httpStatus}, ${this.message}`
      : this.message;
  }

  static fromAxiosError(error) {
    const statusFound = /\b\d{3}\b/.exec(error.message);
    return new ApiException(error.message, statusFound && parseInt(statusFound[0]))
  }

  static fromResponse(response) {
    return new ApiException(response.data, response.status);
  }
}
