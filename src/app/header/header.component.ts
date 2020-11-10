import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from '../servicios/alertas.service';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alerta: AlertasService
  ) {
    // this.obtenerUsuarioActual();
    this.obtenerToken();
    // this.redirecionar();
  }


  isAuth(): boolean {
    return this.autService.isAuthenticated();
  }

  onLogout(): void {
    //this.autService.setIniciado(true);
    this.autService.logout().then(
      () => {
        //this.autService.setIniciado(false);
        // if (localStorage.getItem('uid')) {
        //   localStorage.removeItem('uid');
        // }
        // if (localStorage.getItem('user')) {
        //   localStorage.removeItem('user');
        // }

        if (localStorage.getItem('token')){
           localStorage.removeItem('token');
        }
        this.router.navigate(['/iniciosesion']);
      });
  }

  obtenerToken(): void {
    try {
      this.autService.FAuth.authState.subscribe(
        (user) => {
          // tslint:disable-next-line: no-unused-expression
          user && user.getIdToken().then(
            (res: string) => {
              //console.log('token:', res);
              this.autService.token = res;
              this.redirecionar();
            }
          );
        });
    } catch (error) {
      this.alerta.notificacion(error, 'error');
    }


  }

  redirecionar(): void {
    console.log(this.isAuth());
    if (this.isAuth()) {
      this.router.navigate(['/inicio']);
    }


  }

  // obtenerUsuarioActual(): void {
  //   this.autService.FAuth.onAuthStateChanged(
  //     (user) => {
  //       if (user) {
  //         this.autService.isAuthenticated(user.uid);
  //       }
  //     }, (error) => {
  //       this.alerta.notificacion(error.message, 'error');
  //     });
  // }



  ngOnInit(): void {
  }

}
