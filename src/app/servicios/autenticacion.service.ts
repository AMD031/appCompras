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

  inicioSesionGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    return this.FAuth.signInWithPopup(provider);
  }

  setIniciado(valor: boolean): void {
    this.iniciado = valor;
  }

  isAuthenticated(): boolean {
    if (this.iniciado || localStorage.getItem('uid')) {
      let user = null;

      if (!localStorage.getItem('uid') && !localStorage.getItem('user')) {
        user = firebase.auth().currentUser;
        localStorage.setItem('user', 'activo');
      }
      //console.log(user);
      if (localStorage.getItem('user') || localStorage.getItem('uid')) {
        return true;
      } else {
        return false;
      }
    }
  }

  logout(): Promise<void> {
    if (localStorage.getItem('uid')) {
      localStorage.removeItem('uid');
    }

    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }


    return firebase.auth().signOut();
  }


}
