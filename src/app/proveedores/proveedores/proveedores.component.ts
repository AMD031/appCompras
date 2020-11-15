import { Component, NgZone, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { timeout } from 'rxjs/operators';
import { Proveedor } from 'src/app/modelos/proveedor';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  terminoBusqueda: string = '';
  paginaActual = 1;
  cantidadItem = 0;
  cantidadItemPagina = 5;
  // ordenar
  key: string = 'nombre';
  reverse: boolean = false;

  constructor(
    public proveedoresService: ProveedoresService,
    private alertas: AlertasService,
  ) {

  }

  ngOnInit(): void {
    if (this.proveedoresService.proveedoress.length <= 0) {
      this.cargarDatos();
    }
  }

  async cargarDatos() {
    this.alertas.mostrarCarga('Cargando', 'Recuperando datos');
    /*this.proveedores$ = */

    try {
      this.proveedoresService.getProveedores().subscribe(
        (valores: any) => {
          this.proveedoresService.proveedoress = valores;
          this.cantidadItem = this.proveedoresService.proveedoress.length;
          this.alertas.ocultar();
        },
        (err: any) => {
          this.alertas.ocultar();
          this.alertas.notificacion(err, 'error');
        });

    } catch (err) {
      this.alertas.ocultar();
      this.alertas.notificacion(err, 'error');
    }
    //this.siguiente();
  }

  removeProvedor(clave: string): void {
    this.alertas.alertaBorrar('Proveedor').then(
      (result) => {
        if (result.isConfirmed) {
          // tslint:disable-next-line: no-unused-expression
          clave && this.proveedoresService.removeProvedor(clave).then(
            () => {
              this.alertas.notificacion('Borrando.', 'info');
            }).catch(
              (err) => {
                this.alertas.notificacion(err, 'error');
            });
        }
      });
  }
  cambiarPagina(event): void {
    this.paginaActual = event;
  }

  // async siguiente(): Promise<void> {
  //   try {
  //     //this.alertas.mostrarCarga('Cargando', 'Recuperando datos');

  //     this.proveedoresService.getProvedoresPaginado().then(
  //       (res) => {
  //         console.log('res ', res);
  //         this.proveedoresService.proveedoress = [...res];
  //         // this.alertas.ocultar();
  //       });


  //   } catch (err) {
  //     this.alertas.ocultar();
  //     this.alertas.notificacion(err, 'error');
  //   }
  // }

  // async atras(): Promise<void> {
  //   try {
  //     //this.alertas.mostrarCarga('Cargando', 'Recuperando datos');
  //     this.proveedoresService.getProvedoresPaginadoAtras().then(
  //       (res) => {
  //         //console.log('res ', res);
  //         //this.proveedoresService.proveedoress = [...res];
  //         // this.alertas.ocultar();
  //       });
  //   } catch (err) {
  //     this.alertas.ocultar();
  //     this.alertas.notificacion(err, 'error');
  //   }
  // }

  buscar(e): void {
    this.terminoBusqueda = e;
    if (this.terminoBusqueda) {
      this.paginaActual = 1;
      this.cantidadItemPagina = 10000;
      //console.log(this.terminoBusqueda);
    } else {
      this.paginaActual = 1;
      this.cantidadItemPagina = 5;
    }
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
