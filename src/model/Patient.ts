import moment from 'moment';

import { PatientMessage } from '../services/api';

export default class Patient {

  public readonly name: string;
  public readonly birthdate: Date;

  constructor(message: PatientMessage) {
    this.name = message.name;
    this.birthdate = message.birthdate;
  }

  public get birthdateAsString(): string {
    return this.birthdate ? moment(this.birthdate).format('DD/MM/YYYY') : '';
  }

  public get ageAsString(): string {
    return this.birthdate ? moment().diff(this.birthdate, 'years') + ' anos' : '';
  }
}
