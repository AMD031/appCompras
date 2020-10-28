import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presURL = 'https://appcompras-ed180.firebaseio.com/presupuestos.json';
  constructor(private http: HttpClient) { }

  postPresupuesto(presupuesto: any): Observable<any> {
    const newpres = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.presURL, newpres, { headers }).pipe(
      map(
        (res) => {
          console.log(res);
        }));
  }


  getPresupuestos(): Observable<JSON> {
    return this.http.get(this.presURL).pipe(
      map((res: JSON) => (res))
    );

  }


}
