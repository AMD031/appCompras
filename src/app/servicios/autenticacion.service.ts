import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // iniciado: boolean;

  constructor(
    public FAuth: AngularFireAuth,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    //this.iniciado = false;
  }

  registroUsuario(userdata): Promise<firebase.auth.UserCredential> {
    return this.FAuth.createUserWithEmailAndPassword(userdata.email, userdata.password);
  }


  inicioSesion(userdata): Promise<firebase.auth.UserCredential> {
    return this.FAuth.signInWithEmailAndPassword(userdata.email, userdata.password);
  }

  inicioSesionGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    return this.FAuth.signInWithPopup(provider);
  }

  // setIniciado(valor: boolean): void {
  //   this.iniciado = valor;
  // }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user') || localStorage.getItem('uid')) {
      return true;
    } else {
      return false;
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
