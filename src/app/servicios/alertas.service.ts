import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  /**
   * 
   * @param mensaje mensaje que se ra inyectado en la alerta,
   * @param icono los valores que puede tormar son: success, 	error, 	warning,	info, question
   */
  notificacion(mensaje: string, icono: string): void {
    Swal.fire({ title: mensaje, icon: icono });
  }

  mostrarCarga(titulo: string, html: string): void {
    Swal.fire({
      title: titulo,
      html: html,// add html attribute if you want or remove
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  }


  ocultar(): void {
    Swal.close();
  }

  alertaBorrar( borrado: string): Promise<any>{

   // return new Promise((resolve, reject) => {
     return Swal.fire({
        title: '¿Estás seguro?',
        text: `${borrado} será borrada`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, hazlo'
      });
        /*.then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '... Borrado',
            `Intentado borrar:${borrado}`,
            'success'
          );
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });*/


  }

}
