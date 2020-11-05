import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  iniciado: boolean;

  constructor(
    public FAuth: AngularFireAuth,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.iniciado = false;
  }

  registroUsuario(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password);
  }


  inicioSesion(userdata): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password);
  }

  setIniciado(valor: boolean): void {
    this.iniciado = valor;
  }
  isAuthenticated(): boolean {

    if (this.iniciado) {
      const user = firebase.auth().currentUser;
      //console.log(user);
      if (user) {
        return true;
      } else {
        return false;
      }
    }
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }


}
