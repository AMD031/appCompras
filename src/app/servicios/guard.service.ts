import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private autenticacionService: AutenticacionService) { }
  // tslint:disable-next-line: typedef
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.autenticacionService.isAuthenticated();
  }
}
