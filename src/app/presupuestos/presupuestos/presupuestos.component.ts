import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  presupuestos: any[] = [];
  presupuestoss: Observable<SnapshotAction<unknown>[]>;
  constructor(private presupuestosService: PresupuestosService) {
   
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

  eliminarPresupuesto(id$): void{
    this.presupuestosService.removePresupuesto(id$);
  }

  ngOnInit(): void {
    this.presupuestoss = this.presupuestosService.getPresupuestos_();
  }

}
