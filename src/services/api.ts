import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { assets } from '../components/assina-base';

export type UnitMessageItem = {
  id: number;
  name: string;
}
export type PatientMessage = {
  name: string;
  email?: string;
  birthdate?: Date;
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

  private axios: AxiosInstance;

  public constructor() {
    const { baseUrl: baseURL, timeoutMillis: timeout } = assets.appJson.api;
    this.axios = Axios.create({ baseURL, timeout });
  }

  public async getUnits(): Promise<UnitMessageItem[]> {
    return (await this.call<UnitMessageItem[]>({ method: 'GET', url: '/units' })).data;
  }

  public async login(username: string, password: string, unitId: number): Promise<void> {
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

  public async getAttendance(attendanceRef: string): Promise<AttendanceMessage> {
    return (await this.call<AttendanceMessage>({ method: 'GET', url: `/attendances/${attendanceRef}` })).data;
  }

  public async getUnsignedDocument(documentRef: string): Promise<string> {
    return (await this.call<string>({ method: 'GET', url: `/documents/${documentRef}/unsigned` })).data;
  }

  public async putSignedDocument(documentRef: string, base64: String, fileName: string): Promise<void> {
    await this.call<void>({
      method: 'PUT',
      url: `/documents/${documentRef}/signed`,
      data: {
        fileName: fileName,
        base64: base64,
      },
    });
  }

  public async postDocumentEmail(documentRef: string, email: string): Promise<void> {
    await this.call<void>({
      method: 'POST',
      url: `/documents/${documentRef}/email`,
      data: { to: [email] },
    });
  }

  public async postAttendanceEmail(attendanceRef: string, email: string): Promise<void> {
    await this.call<void>({
      method: 'POST',
      url: `/attendances/${attendanceRef}/email`,
      data: { to: [email] },
    });
  }

  private async call<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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
