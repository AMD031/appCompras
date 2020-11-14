import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/servicios/alertas.service';
@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  // mensaje = false;
  loginForm: FormGroup;
  userdata: any;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alerta: AlertasService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [Validators.required, Validators.email]],
      password: ['', [Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.userdata = this.saveUserdata();
    this.alerta.mostrarCarga('Iniciando seccion', '');

    // tslint:disable-next-line: no-unused-expression
   
    this.autService.inicioSesion(this.userdata).then(
      (UserCredential) => {
        this.obtenerToken();
        this.alerta.ocultar();
      }).catch(error => {
        // console.log(error);
        this.alerta.ocultar();
        this.alerta.notificacion(`${error}`, 'error');
      });

  }

  saveUserdata(): object {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

  loginGoogle(): void {
    this.alerta.mostrarCarga('Iniciando seccion', '');
    this.autService.inicioSesionGoogle().then(
      (UserCredential) => {
        this.obtenerToken();
        this.alerta.ocultar();
      }).catch( (err) => {
        this.alerta.ocultar();
        this.alerta.notificacion( err , 'error');
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
              localStorage.setItem('token', res);
              this.router.navigate(['/inicio']);
            }
          );
        });
    } catch (error) {
      this.alerta.notificacion(error, 'error');
    }

  }


  async isAuth(): Promise<boolean> {
    return this.autService.isAuthenticated();
  }


}
