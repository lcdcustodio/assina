import Patient from './Patient';
import Document from './Document';
import { AttendanceMessage } from '../services/api';

export default class Attendance {

  public readonly ref: string;
  public readonly patient: Patient;
  public readonly documents: Document[];
  public isDirty: boolean;

  public constructor(ref: string, message: AttendanceMessage) {
    this.ref = ref;
    this.patient = new Patient(message.patient);
    this.documents = message.documents.map(dm => new Document(dm));
    this.isDirty = false;
  }

  public get isEmpty(): boolean {
    return !this.documents.length;
  }
}
