import { PatientMessage } from '../services/api';

export default class Patient {
  name: string;
  birthdate: Date;

  constructor(message: PatientMessage) {
    this.name = message.name;
    this.birthdate = message.birthdate;
  }
}
