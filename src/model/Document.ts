import RNHTMLtoPDF from 'react-native-html-to-pdf';

import api, { DocumentMessage } from '../services/api';

export default class Document {

  public readonly ref: string;
  public readonly title: string;
  public readonly signed: boolean;
  private _unsignedHtml: string;

  public constructor(message: DocumentMessage) {
    this.ref = message.ref;
    this.title = message.title;
    this.signed = message.signed;
    this._unsignedHtml = null;
  }

  public get unsignedHtml(): string { return this._unsignedHtml }

  public async downloadUnsignedHtml(): Promise<void> {
    this._unsignedHtml = await api.getUnsignedDocument(this.ref);
  }

  public async uploadSignedHtml(signedHtml: string): Promise<void> {
    const pdf = await RNHTMLtoPDF.convert({ ...defaultRnHtmlToPdf, html: signedHtml });
    const base64 = pdf.base64.split('\n').join('');
    await api.putSignedDocument(this.ref, base64, this.ref + '.pdf');
  }

  public async sendEmail(email: string): Promise<void> {
    await api.postDocumentEmail(this.ref, email);
  }
}

const defaultRnHtmlToPdf = {
  fileName: 'signed',
  base64: true,

  // iOS-only
  paddingLeft: 70, // BUG: afeta topo e direita
  paddingRight: -70, // OK
  paddingTop: 0, // BUG: afeta esquerda e baixo
  paddingBottom: 140, // BUG: afeta baixo, mas não como esperado (colocar o dobro...?!?!?)
  bgColor: '#FFFFFF',
};
