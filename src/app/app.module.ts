import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { LateralComponent } from './lateral/lateral.component';
import { MainComponent } from './main/main.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CineComponent } from './cine/cine.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { BusquedasComponent } from './busquedas/busquedas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    LateralComponent,
    MainComponent,
    UsuarioComponent,
    CineComponent,
    PeliculaComponent,
    FormularioComponent,
    LoginComponent,
    BusquedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
