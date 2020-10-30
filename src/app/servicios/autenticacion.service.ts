import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    public FAuth: AngularFireAuth,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
  }

  registroUsuario(userdata): void {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(
        err => {
          console.log(err);
        });
  }


  inicioSesion(userdata): void {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password).then(
      response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      }).catch(error => { console.log(error); });
  }

  isAuthenticated(): boolean {
   const user = firebase.auth().currentUser;
   console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    firebase.auth().signOut();
  }


}
