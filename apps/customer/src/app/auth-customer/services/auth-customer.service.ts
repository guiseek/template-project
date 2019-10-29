import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '@guiseek/core/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomerService {
  constructor(private _http: HttpClient) {}

  get me$() {
    return this._http.get<UserAccount>('/api/auth/me');
  }
}
