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


  public ele: string;


  constructor(
    private proveedoresDB: AngularFireDatabase,
    // private ngZone: NgZone
  ) {
    this.ruta = 'proveedores';
    this.myDB = this.proveedoresDB.list(this.ruta);
    this.ele = '';
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

  getProvedoresPaginado(): Promise<Proveedor[]> {
    // const tmp = this.ele;
    //onsole.log('tmp', tmp);
    return new Promise((resolve, rejects) => {
      console.log('inicio ', this.ele);
      if (this.ele !== undefined) {
        return this.proveedoresDB.database.ref(this.ruta)
          .orderByKey()
          .startAt(this.ele)
          .limitToFirst(5)
          .once('value', (snapshot) => {
            // let key = snapshot.key;
            const resultado: Array<Proveedor> = [];
            const data = snapshot.val();
            
            if (Object.keys(data)[4] !== undefined) {
              this.ele = Object.keys(data)[4];
              console.log('ele2', this.ele);
              delete data[this.ele];
            }


            // tslint:disable-next-line: forin
            for (const key in data) {
              resultado.push({ key, ...data[key] });
            }
            // console.log(resultado);

            resolve(resultado);
            console.log(/*'key: ', key + ': ' +*/ JSON.stringify(data));
          });
      }
    });
  }

  // getProvedoresPaginadoAtras(): Promise<Proveedor[]> {
  //   // const tmp = this.ele;
  //   //onsole.log('tmp', tmp);
  //   return new Promise((resolve, rejects) => {
  //     console.log('inicio ', this.ele);
  //     if (this.ele !== undefined) {
  //       return this.proveedoresDB.database.ref(this.ruta)
  //         .orderByKey()
  //         .endAt(this.ele)
  //         .limitToLast(5)
  //         .once('value', (snapshot) => {
  //           // let key = snapshot.key;
  //           const resultado: Array<Proveedor> = [];
  //           const data = snapshot.val();
  //           if (Object.keys(data)[4] !== undefined) {
  //             this.ele = Object.keys(data)[4];
  //             console.log('ele2', this.ele);
  //             delete data[this.ele];
  //           }
  //           // tslint:disable-next-line: forin
  //           for (const key in data) {
  //             resultado.push({ key, ...data[key] });
  //           }
  //           // console.log(resultado);
  //           resolve(resultado);
  //           console.log(/*'key: ', key + ': ' +*/ JSON.stringify(data));
  //         });
  //     }
  //   });
  // }





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
