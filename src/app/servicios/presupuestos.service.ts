import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Presupuesto } from '../modelos/presupuesto';
// import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  // presURL = 'https://appcompras-ed180.firebaseio.com/presupuestos.json';
  // presURLnoJSON = 'https://appcompras-ed180.firebaseio.com/presupuestos';
  public presupuestoss: Array<Presupuesto> = [];
  ruta: string;
  private myDB: AngularFireList<unknown>;

  constructor(private http: HttpClient, private presupuestosDB: AngularFireDatabase) {
    this.ruta = 'presupuestos';
    this.myDB = this.presupuestosDB.list(this.ruta);
  }

  // postPresupuesto(presupuesto: any): Observable<any> {
  //   const newpres = JSON.stringify(presupuesto);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(this.presURL, newpres, { headers }).pipe(
  //     map(
  //       (res) => {
  //         console.log(res);
  //       }));
  // }

  public addPresupuestos(proveedor: Presupuesto): firebase.database.ThenableReference {
    return this.myDB.push(proveedor);
  }

  // getPresupuestos(): Observable<JSON> {
  //   return this.http.get(this.presURL).pipe(
  //     map((res: JSON) => (res))
  //   );
  // }

  getPresupuestos(): Observable<SnapshotAction<unknown>[]> {
    return this.myDB.snapshotChanges().pipe(
      map(cambios =>
        cambios.map((valor: any) =>
          ({ key: valor.payload.key, ...valor.payload.val() })
        )));
  }


  // getPresupuesto(id$: string): Observable<JSON> {
  //   const url = `${this.presURLnoJSON}/${id$}.json`;
  //   return this.http.get(url).pipe(
  //     map((res: JSON) => (res))
  //   );
  // }

  getPresupuesto(clave: string): Observable<unknown> {
    return this.presupuestosDB.object(`${this.ruta}/${clave}`).valueChanges();
  }



  // putPresupuesto(presupuesto: any, id$: string): Observable<any> {
  //   const newpre = JSON.stringify(presupuesto);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   const url = `${this.presURLnoJSON}/${id$}.json`;
  //   return this.http.put(url, newpre, { headers }).pipe(
  //     map((res: any) => {
  //       return res;
  //     }));
  // }

  public updatePresupuesto(clave: string, valor: any): Promise<void> {
    return this.myDB.update(clave, valor);
  }



  // delPresupuesto(id$: string): Observable<any> {
  //   const url = `${this.presURLnoJSON}/${id$}.json`;
  //   return this.http.delete(url).pipe(
  //     map((res) => res));
  // }

  public removePresupuesto(clave: string): Promise<void> {
    return this.myDB.remove(clave);
  }









}
