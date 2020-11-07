import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Proveedor } from 'src/app/modelos/proveedor';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {
  proveedorForm: FormGroup;
  proveedor: any = {};
  id: string;
  constructor(
    private pf: FormBuilder,
    private proveedoresService: ProveedoresService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
  ) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      // tslint:disable-next-line: no-unused-expression
      this.id && this.proveedoresService.getProveedor(this.id).subscribe(
        proveedor => proveedor && this.proveedorForm.setValue(proveedor)
      );

    });

  }

  provincias: any[] = [
    { provincia: 'Álava' },
    { provincia: 'Alicante' },
    { provincia: 'Almería' },
    { provincia: 'Asturias' },
    { provincia: 'Ávila' },
    { provincia: 'Badajoz' },
    { provincia: 'Barcelona' },
    { provincia: 'Burgos' },
    { provincia: 'Cáceres' },
    { provincia: 'Cádiz' },
    { provincia: 'Cantabria' },
    { provincia: 'Castellón' },
    { provincia: 'Ciudad Real' },
    { provincia: 'Córdoba' },
    { provincia: 'La Coruña' },
    { provincia: 'Cuenca' },
    { provincia: 'Gerona' },
    { provincia: 'Granada' },
    { provincia: 'Guadalajara' },
    { provincia: 'Guipúzcoa' },
    { provincia: 'Huelva' },
    { provincia: 'Huesca' },
    { provincia: 'IslasBaleares' },
    { provincia: 'Jaén' },
    { provincia: 'León' },
    { provincia: 'Lérida' },
    { provincia: 'Lugo' },
    { provincia: 'Madrid' },
    { provincia: 'Málaga' },
    { provincia: 'Murcia' },
    { provincia: 'Navarra' },
    { provincia: 'Orense' },
    { provincia: 'Palencia' },
    { provincia: 'Las Palmas' },
    { provincia: 'Pontevedra' },
    { provincia: 'La Rioja' },
    { provincia: 'Salamanca' },
    { provincia: 'Segovia' },
    { provincia: 'Sevilla' },
    { provincia: 'Tarragona' },
    { provincia: 'ÁvSanta Cruz de Tenerifeila' },
    { provincia: 'Teruel' },
    { provincia: 'Toledo' },
    { provincia: 'Valencia' },
    { provincia: 'Valladolid' },
    { provincia: 'Vizcaya' },
    { provincia: 'Zamora' },
    { provincia: 'Zaragoza' },
    { provincia: 'Ávila' },
    { provincia: 'Ávila' },
  ];


  onSubmit(): void {
    this.proveedor = this.savePresupuesto();
    if (this.proveedor && this.id) {
      this.proveedoresService.updateProvedor(this.id, this.proveedor).then(
        () => {
          this.alertas.notificacion('Cambio realizado', 'success');
          this.router.navigate(['/proveedores']);
        });
    } else if (this.proveedor) {
      this.proveedoresService.addProveedor(this.proveedor).then(
        () => {
          this.alertas.notificacion('Cambio realizado', 'success');
          this.router.navigate(['/proveedores']);
        });
    }
    this.proveedorForm.reset();
  }


  savePresupuesto(): object {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

  ngOnInit(): void {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required]],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]],
      email: ['', [Validators.required, Validators.email]],
      contacto: ['', Validators.required],

    });
  }

}
