import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  get token() {
    return window.localStorage.getItem('token');
  }
  set token(token: string) {
    window.localStorage.setItem('token', token);
  }
  reset() {
    window.localStorage.removeItem('token');
  }
  get headers() {
    return {
      Authorization: `Bearer ${this.token}`
    };
  }
}
