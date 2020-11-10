// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

// componentes
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { EditproveeComponent } from './proveedores/editprovee/editprovee.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// servicios
import { ProveedoresService } from './servicios/proveedores.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { AutenticacionService } from './servicios/autenticacion.service';

// entorno
import { environment } from 'src/environments/environment';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    EditproveeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
  ],
  providers: [ProveedoresService, PresupuestosService, AutenticacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
