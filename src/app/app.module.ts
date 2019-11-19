import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { LateralComponent } from './lateral/lateral.component';
import { MainComponent } from './main/main.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CineComponent } from './cine/cine.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    LateralComponent,
    MainComponent,
    UsuarioComponent,
    CineComponent,
    PeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
