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
}

const defaultRnHtmlToPdf = {
  fileName: 'signed',
  base64: true,
  padding: 0, // iOS
  bgColor: '#FFFFFF', // iOS
};
