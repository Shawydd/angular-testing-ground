import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  private key: string = 'aBc';

  constructor() { }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();
  }

  decrypt(data: string): string {
    return CryptoJS.AES.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
  }
}
