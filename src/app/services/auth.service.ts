import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private _isLogged: boolean = false; // TODO auth for browser

  constructor() {}

  get isLogged() { return this._isLogged; }

  browserAuth() {}

}
