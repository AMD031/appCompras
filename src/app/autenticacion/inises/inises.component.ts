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
    this.redirecionar();
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

  redirecionar(): void{
    console.log(this.isAuth());
    if (this.isAuth()){
      this.router.navigate(['/inicio']);
    }
  }

  onSubmit(): void {
    this.userdata = this.saveUserdata();
    this.alerta.mostrarCarga('Iniciando seccion', '');
    this.autService.inicioSesion(this.userdata).then(
      () => {
        this.alerta.ocultar();
        this.autService.setIniciado(true);
        this.router.navigate(['/inicio']);
      }).catch(error => {
        // console.log(error);
        this.alerta.notificacion(`${error}`, 'error');
      });

    // setTimeout(() => {
    //   if (this.isAuth() === false) {
    //     this.mensaje = true;
    //   }
    // }, 2000);
  }

  saveUserdata(): object {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

  loginGoogle(): void{
    this.autService.inicioSesionGoogle().then(
      (UserCredential) => {
        localStorage.setItem('uid', UserCredential.user.uid);
        this.router.navigate(['/inicio']);
      });
  }



  isAuth(): boolean {
    return this.autService.isAuthenticated();
  }


}
