import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// componentes
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

// servicios
import { ProveedoresService } from './servicios/proveedores.service';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
