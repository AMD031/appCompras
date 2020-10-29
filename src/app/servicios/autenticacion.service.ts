import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(public FAuth: AngularFireAuth) {

  }

  registroUsuario(userdata): void {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(
        err => {
          console.log(err);
        });
  }

}
