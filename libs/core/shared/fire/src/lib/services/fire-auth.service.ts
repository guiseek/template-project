import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '@guiseek/core/shared/security';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { tap, filter } from 'rxjs/operators';
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
        tap((user) => this.saveUser(user))
      );
  }
  checkUser(user?) {
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
      this.snack.open(
        `Logado com ${email}`, 'Fechar', {
        duration: 5000
      }
      )
      return login;
    } catch (err) {
      console.log('err: ', err)
      this.snack.open(
        err && err.message, 'Fechar', {
        duration: 5000
      });
    }

  }
  googleLogin() {
    return this.oAuthLogin(
      new auth.GoogleAuthProvider()
    )
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((u) => {
        this.snack.open(
          `Logado com ${u.user.email} usando ${u.additionalUserInfo.providerId}`, 'Fechar', {
          duration: 5000
        })
      })
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  saveUser(user: User) {
    if (!!user) {
      this.afs.collection('users')
        .doc(user.uid).set(user.toJSON())
    }
  }
}
