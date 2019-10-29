import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { app_json } from '../components/assets';

export type UnitMessageItem = {
  id: number;
  name: string;
}
export type PatientMessage = {
  name: string;
  birthdate: Date;
}
export type DocumentMessage = {
  ref: string;
  title: string;
  signed: boolean;
}
export type AttendanceMessage = {
  patient: PatientMessage;
  documents: DocumentMessage[];
}

class Api {

  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: app_json.apiBaseUrl,
      timeout: 5000,
    });
  }

  async getUnits(): Promise<UnitMessageItem[]> {
    return (await this.call<UnitMessageItem[]>({ method: 'GET', url: '/units' })).data;
  }

  async login(username: string, password: string, unitId: number): Promise<void> {
    this.axios.defaults.headers.common['Authorization'] = (await this.call<void>({
      method: 'POST',
      url: '/login',
      data: {
        'username': username,
        'password': password,
        'unit': { 'id': unitId },
      },
    })).headers.authorization;
  }

  async getAttendance(attendanceRef: string): Promise<AttendanceMessage> {
    return (await this.call<AttendanceMessage>({ method: 'GET', url: `/attendances/${attendanceRef}` })).data;
  }

  async getUnsignedDocument(documentRef: string): Promise<string> {
    return (await this.call<string>({ method: 'GET', url: `/documents/${documentRef}/unsigned` })).data;
  }

  async putSignedDocument(documentRef: string, base64: String, fileName: string): Promise<void> {
    await this.call<void>({
      method: 'PUT',
      url: `/documents/${documentRef}/signed`,
      data: {
        fileName: fileName,
        base64: base64,
      },
    });
  }

  async call<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T>;
    try {
      response = await this.axios(config);
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
    if (response.status < 200 || response.status >= 300) {
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
