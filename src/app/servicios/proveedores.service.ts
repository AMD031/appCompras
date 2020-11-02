import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  constructor(private proveedoresDB: AngularFireDatabase,) {
    this.myDB = this.proveedoresDB.list('proveedores');
  }
  private myDB: AngularFireList<unknown>;

  proveedores: any = [
    {
      nombre: 'Telefónica',
      cif: 'B12345678',
      direccion: 'Paseo de la Castellana, 100',
      cp: '28.010', localidad: 'Madrid',
      provincia: 'Madrid', telefono: 911111111,
      email: 'info@telefonica.com',
      contacto: 'Juan Pérez'
    },
    {
      nombre: 'Iberdrola',
      cif: 'B87654321',
      direccion: 'Príncipe de Vergara, 200',
      cp: '28.015',
      localidad: 'Madrid',
      provincia: 'Madrid',
      telefono: 922222222,
      email: 'info@iberdrola.com',
      contacto: 'Laura Martínez'
    }
  ];

  public addProveedor(): void {
    this.myDB.push( this.proveedores[1]);
  }

  getProveedores():  Observable<SnapshotAction<unknown>[]> {
    // return this.proveedores;
   return this.myDB.snapshotChanges();
  }


  
}
