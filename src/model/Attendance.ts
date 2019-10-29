import Patient from './Patient';
import Document from './Document';
import { AttendanceMessage } from '../services/api';

export default class Attendance {

  private readonly _ref: string;
  private readonly _patient: Patient;
  private readonly _documents: Document[];
  private _dirty: boolean;

  constructor(ref: string, message: AttendanceMessage) {
    this._ref = ref;
    this._patient = new Patient(message.patient);
    this._documents = message.documents.map(dm => new Document(dm));
    this._dirty = false;
  }

  get ref(): string { return this._ref }
  get patient(): Patient { return this._patient }
  get documents(): Document[] { return this._documents }
  get dirty(): boolean { return this._dirty }

  set dirty(value: boolean) { this._dirty = value }

  get isEmpty(): boolean {
    return !this._documents.length;
  }
}
