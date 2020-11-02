import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { observable, Observable } from 'rxjs';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  //proveedores: any;
  proveedor: any;
  proveedores$: Observable<SnapshotAction<unknown>[]>;

  constructor(private proveedoresService: ProveedoresService) {

    // this.proveedor = {
    //   nombre: '',
    //   cif: '',
    //   direccion: '',
    //   cp: '',
    //   localidad: '',
    //   provincia: '',
    //   telefono: null,
    //   email: '',
    //   contacto: ''
    // };
  }

  ngOnInit(): void {
    this.proveedores$ = this.proveedoresService.getProveedores();
  }

}
