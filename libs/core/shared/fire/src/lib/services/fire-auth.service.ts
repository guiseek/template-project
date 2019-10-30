import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '@guiseek/core/shared/security';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private snack: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState
    .pipe(
      // switchMap((user) => this.checkUser(user)),
      tap((user) => {
        console.log('user 2: ', user)
        this.saveUser(user)
      })
    )
  }
  checkUser(user?) {
    console.log('user: ', user)
    return !!user ? this.afs.doc(`users/${user.uid}`).valueChanges() : of(null)
  }
  get currentUser() {
    return this.afAuth.auth.currentUser;
  }
  async emailLogin({ email, password }: Credentials) {
    try {
      const login = await this.afAuth.auth.signInWithEmailAndPassword(
        email, password
      );
      return login;
    } catch (err) {
      console.log('err: ', err)
      this.snack.open(
        err && err.message
      )
      // throw err;
    }

  }
  googleLogin() {
    return this.oAuthLogin(
      new auth.GoogleAuthProvider()
    )
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  saveUser(user: User) {
    // const { displayName, email, emailVerified, phoneNumber, photoURL, uid, tenantId } = user;
    // console.table({ displayName, email, emailVerified, phoneNumber, photoURL, uid, tenantId })
    console.log(user.toJSON())
    this.afs.collection('users')
      .doc(user.uid).set(user.toJSON())
  }
}
