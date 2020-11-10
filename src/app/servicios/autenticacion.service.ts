import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // iniciado: boolean;
  public token: string;
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
    provider.addScope('profile');
    provider.addScope('email');
    return this.FAuth.signInWithPopup(provider);
  }

  // setIniciado(valor: boolean): void {
  //   this.iniciado = valor;
  // }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') === this.token /* || localStorage.getItem('uid')*/){
    //if ( true ) {
      return true;
    } else {
      return false;
    }


  }

  logout(): Promise<void> {
     return firebase.auth().signOut();
  }


}
