import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }


  isAuth(): boolean {
    return this.autService.isAuthenticated();
  }

  onLogout(): void {
    this.autService.logout().then(
      () => {
        this.autService.setIniciado(false);
      }
    );
    this.router.navigate(['/inicio']);
  }
  


    ngOnInit(): void {
    }

  }
