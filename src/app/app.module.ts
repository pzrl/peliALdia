import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MainComponent } from './main/main.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CineComponent } from './cine/cine.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { SocialComponent } from './social/social.component';
import { CategoriasPerfilComponent } from './categorias-perfil/categorias-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ChatComponent } from './chat/chat.component';
import { MisPeliculasComponent } from './mis-peliculas/mis-peliculas.component';
import { MisCinesComponent } from './mis-cines/mis-cines.component';
import { MisAmigosComponent } from './mis-amigos/mis-amigos.component';
import { InComponent } from './in/in.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    PerfilComponent,
    MainComponent,
    UsuarioComponent,
    CineComponent,
    PeliculaComponent,
    RegistroComponent,
    LoginComponent,
    BusquedasComponent,
    SocialComponent,
    CategoriasPerfilComponent,
    EditarPerfilComponent,
    ChatComponent,
    MisPeliculasComponent,
    MisCinesComponent,
    MisAmigosComponent,
    InComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
