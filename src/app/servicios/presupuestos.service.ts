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
  presURLnoJSON = 'https://appcompras-ed180.firebaseio.com/presupuestos';

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

  getPresupuesto(id$: string): Observable<JSON> {
    const url = `${this.presURLnoJSON}/${id$}.json`;
    return this.http.get(url).pipe(
      map((res: JSON) => (res))
    );
  }
  
 


  putPresupuesto(presupuesto: any, id$: string): Observable<any> {
    const newpre = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.presURLnoJSON}/${id$}.json`;

    return this.http.put(url, newpre, { headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }



}
