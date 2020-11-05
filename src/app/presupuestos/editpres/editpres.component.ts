import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas.service';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {
  presupuestoForm: FormGroup;
  presupuesto: any = {};
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  id: string;

  constructor(
    private pf: FormBuilder,
    private presupuestoService: PresupuestosService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alertas: AlertasService
    ) {
      
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.presupuestoService.getPresupuesto(this.id).subscribe(
       presupuesto => presupuesto && this.presupuestoForm.setValue(presupuesto));
    });
  }

  ngOnInit(): void {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: this.iva,
      total: this.total
    });

    this.onChanges();
  }
  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe(
      valor => {
        this.base = valor.base;
        this.tipo = valor.tipo;
        this.presupuestoForm.value.iva = this.base * this.tipo;
        this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
      });
  }

  onSubmit(): void {
    this.presupuesto = this.savePresupuesto();
    if (this.presupuesto && this.id) {
      this.presupuestoService.updatePresupuesto(this.id, this.presupuesto).then(
        () => {
          this.alertas.notificacion('Cambio realizado', 'success')
          this.router.navigate(['/presupuestos']);
        });
    } else if (this.presupuesto) {
      this.presupuestoService.addPresupuestos(this.presupuesto).then(
      );
    }



    // this.presupuestoService.putPresupuesto(this.presupuesto, this.id).subscribe(
    //   newpre => {
    //     this.router.navigate(['/presupuestos']);
    //   });

  }
  savePresupuesto(): object {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value

    };
    return savePresupuesto;
  }

}
