import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    private _http: HttpClient
  ) { }

  findOne(id: number) {
    return this._http.get<UserAccount>(`/api/user-account/${id}`);
  }

  updateUserAccount(user: UserAccount) {
    console.log('user: ', user)
    return this._http.put('/api/user-account/me/update', user);
  }
}
