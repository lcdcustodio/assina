import axios, { AxiosResponse, AxiosError } from 'axios';

class Api {

  constructor() {
    axios.defaults.baseURL = require('../../app.json').apiBaseUrl;
  }

  /**
   * TODO: Tipar retorno.
   */
  async getUnits(): Promise<any> {
    return (await this._get('/units')).data;
  }

  /**
   * TODO: Tipar requisição.
   */
  async login(username: string, password: string, unitId: number): Promise<void> {
    const response: AxiosResponse<void> = await this._post('/login', {
      'username': username,
      'password': password,
      'unit': { 'id': unitId },
    });
    axios.defaults.headers.common['Authorization'] = response.headers.authorization;
  }

  /**
   * TODO: Tipar retorno.
   */
  async getAttendance(attendanceRef: string): Promise<any> {
    return (await this._get(`/attendances/${attendanceRef}`)).data;
  }

  /**
   * TODO: Tipar retorno.
   */
  async getUnsignedDocument(documentRef: string): Promise<any> {
    return (await this._get(`/documents/${documentRef}/unsigned`)).data;
  }

  async _get<T>(url: string): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T>;
    try {
      response = await axios.get(url);
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
    if (response.status !== 200) {
      throw ApiError.fromResponse(response);
    }
    return response;
  }

  async _post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T>;
    try {
      response = await axios.post(url, data);
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
    if (response.status !== 200) {
      throw ApiError.fromResponse(response);
    }
    return response;
  }
}

export class ApiError extends Error {

  httpStatus?: number;

  constructor(message?: string, httpStatus?: number) {
    super(message);
    this.httpStatus = httpStatus;
  }

  toString(): string {
    return this.httpStatus
      ? `httpStatus: ${this.httpStatus}, ${this.message}`
      : this.message;
  }

  static fromAxiosError(error: AxiosError<any>): ApiError {
    const statusFound = /\b\d{3}\b/.exec(error.message);
    return new ApiError(error.message, statusFound && parseInt(statusFound[0]))
  }

  static fromResponse(response: AxiosResponse<any>): ApiError {
    return new ApiError(response.data.toString(), response.status);
  }
}

const api: Api = new Api();
export default api;
