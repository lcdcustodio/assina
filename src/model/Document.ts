import { DocumentMessage } from '../services/api';

export default class Document {
  ref: string;
  title: string;
  signed: boolean;

  constructor(message: DocumentMessage) {
    this.ref = message.ref;
    this.title = message.title;
    this.signed = message.signed;
  }
}
