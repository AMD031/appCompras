import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { observable, Observable } from 'rxjs';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor(
    public proveedoresService: ProveedoresService,
    private alertas: AlertasService) {
  }

  ngOnInit(): void {
    if (this.proveedoresService.proveedoress.length <= 0) {
      this.cargarDatos();
    }
  }

  cargarDatos(): void {
    this.alertas.mostrarCarga('Cargando', 'Recuperando datos');
    /*this.proveedores$ = */
    this.proveedoresService.getProveedores().subscribe(
      (valores: any) => {
        this.proveedoresService.proveedoress = valores;
        this.alertas.ocultar();
      },
      (err: any) => {
        this.alertas.ocultar();
        this.alertas.notificacion(err, 'error');
      });
  }

  removeProvedor(clave: string): void{
    this.alertas.alertaBorrar('Proveedor').then(
      (result) => {
        if (result.isConfirmed) {
          // tslint:disable-next-line: no-unused-expression
          clave && this.proveedoresService.removeProvedor(clave).then(
            () => {
              this.alertas.notificacion('Borrando', 'info');
            });
        }
      });
  }

}
