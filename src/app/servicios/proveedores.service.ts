import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from '../modelos/proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  ruta: string;
  private myDB: AngularFireList<unknown>;
  public proveedoress: Array<Proveedor> = [];

  constructor(private proveedoresDB: AngularFireDatabase) {
    this.ruta = 'proveedores';
    this.myDB = this.proveedoresDB.list(this.ruta);
  }

  public addProveedor(proveedor: Proveedor): firebase.database.ThenableReference {
    return this.myDB.push(proveedor);
  }

  getProveedores(): Observable<SnapshotAction<unknown>[]> {
    return this.myDB.snapshotChanges().pipe(
      map(cambios =>
        cambios.map((valor: any) =>
          ({ key: valor.payload.key, ...valor.payload.val() })
        )));
  }

  getProveedor(clave: string): Observable<unknown> {
    return this.proveedoresDB.object(`${this.ruta}/${clave}`).valueChanges();
  }

  public removeProvedor(clave: string): Promise<void> {
    return this.myDB.remove(clave);
  }

  public updateProvedor(clave: string, valor: any): Promise<void> {
    return this.myDB.update(clave, valor);
  }

}
