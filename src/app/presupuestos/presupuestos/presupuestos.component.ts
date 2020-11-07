import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Presupuesto } from 'src/app/modelos/presupuesto';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  paginaActual = 1;
  cantidadItem = 0;
  cantidadItemPagina = 5;

  constructor(
    public presupuestosService: PresupuestosService,
    private alertas: AlertasService) {
    // this.presupuestosService.getPresupuestos().subscribe(
    //   presupuestos => {
    //     console.log(presupuestos);
    //     // tslint:disable-next-line: forin
    //     for (const id$ in presupuestos) {
    //       const p = presupuestos[id$];
    //       p.id$ = id$;
    //       this.presupuestos.push(presupuestos[id$]);
    //     }
    //   });


  }

  // eliminarPresupuesto(id$): void {

  //   this.presupuestosService.delPresupuesto(id$).subscribe(res => {
  //     this.presupuestos = [];
  //     this.presupuestosService.getPresupuestos().subscribe(
  //       presupuestos => {
  //         // tslint:disable-next-line: forin
  //         for (const id$ in presupuestos) {
  //           const p = presupuestos[id$];
  //           p.id$ = id$;
  //           this.presupuestos.push(presupuestos[id$]);
  //         }
  //       });
  //   });
  // }

  eliminarPresupuesto(clave): void {
    this.alertas.alertaBorrar('Proveedor').then(
      (result) => {
        if (result.isConfirmed) {
          // tslint:disable-next-line: no-unused-expression
          clave && this.presupuestosService.removePresupuesto(clave).then(
            () => {
              this.alertas.notificacion('Borrando', 'info');
            });
        }
      });


  }

  ngOnInit(): void {
    if (this.presupuestosService.presupuestoss.length <= 0) {
      this.cargarDatos();
    }
  }

  cargarDatos(): void {
    this.alertas.mostrarCarga('Cargando', 'Recuperando datos');
    this.presupuestosService.getPresupuestos().subscribe(
      (valores: any) => {
        this.presupuestosService.presupuestoss = valores;
        this.cantidadItem = this.presupuestosService.presupuestoss.length;
        this.alertas.ocultar();
      },
      (err: any) => {
        this.alertas.ocultar();
        this.alertas.notificacion(err, 'error');
      });
  }


  cambiarPagina(event): void {
    this.paginaActual = event;
  }  


}
