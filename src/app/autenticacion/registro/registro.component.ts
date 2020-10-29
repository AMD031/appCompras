import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }
  registroForm: FormGroup;
  userdata: any;

  erroresForm = {
    email: '',
    password: ''
  };

  mensajesValidacion = {
    email: {
      required: 'Email obligatorio',
      email: 'Introduzca una dirección email correcta'
    },
    password: {
      required: 'Contraseña obligatoria',
      pattern: 'La contraseña debe tener al menos una letra un número ',
      minlength: 'y más de 6 caracteres'
    }
  };

  ngOnInit(): void {

    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });

    this.registroForm.valueChanges.subscribe(
      data => this.onValueChanged(data));
    this.onValueChanged();

  }

  onValueChanged(data?: any): void {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
    // tslint:disable-next-line: forin
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        // tslint:disable-next-line: forin
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    this.userdata = this.saveUserdata();
    console.log(this.userdata);
    this.autService.registroUsuario(this.userdata);
    this.router.navigate(['/inicio']);
  }

  saveUserdata(): object {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
    };
    return saveUserdata;
  }

}
