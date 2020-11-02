import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})


export class AddproveeComponent implements OnInit {
  // @ViewChild('formpro') formpro: NgForm;
  proveedor: any = {};
  proveedorForm: FormGroup;
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
  valido: boolean;
  constructor(private pf: FormBuilder) {
  }

  ngOnInit(): void {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required]],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      contacto: ['', Validators.required],
    });


  }



  onSubmit(): void {

    this.proveedor = this.savePresupuesto();
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

}
